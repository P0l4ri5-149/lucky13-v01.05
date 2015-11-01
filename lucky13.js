
var lucky13 = {
/*                   A   2  3  4  5  6  7  8  9 10 J  Q  K */

    cards: [],

    faces: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
   	suits: ["&spades;","&clubs;","&hearts;","&diams"],

	init: function() {
		// make cards logic here
		console.log("Initializing the lucky13 game.");

		var cardId = 0;
		this.cards = [];

		for( var soot = 0; soot < 4; soot++ ) {
			for( var value = 0; value < 13; value++ ) {
				var card = {
					id: cardId++,
					suit: soot,
					face: value
				};

				this.cards.push(card);

			}
		}

		console.log("New cards array: ", this.cards);

	},

	getCard: function( row, col ) {
		var ir = parseInt(row);
		var ic = parseInt(col);
		var ix = (ir*13) + ic;
		var card = this.cards[ix];
		var retCard = {
			id: card.id,
			suit: card.suit,
			face: card.face,
			row: ir,
			column: ic
		};
		return retCard;
	},

	getCards: function() {
		return this.cards;
	},


	/*
	 *  compareCard( cardIs, cardArg)
	 *  return true if cardIs is of the same value regardless of suite
	 *  I.E. if cardIs is 10 clubs, return true if card is a 10 of any suite
	 *  example:
	 *  we are looking for an Ace : cardIs = 0;
	 *  and the argument is  Ace of Hearts = 26
	 *  then we would return true
	 *  returns false if card is not defined
	 */

	compareCard: function( cardIs, cardArg) {
	    var f1 = cardIs - (parseInt(cardIs/13)*13);
	    var f2 = cardArg - (parseInt(cardArg/13)*13); 
	    if( f1 === f2) {
	        return 1;
	    } 
	    else {
	        return 0;
	    } 
	 },

	/* findCardInColumn
	 *  returns index into array for a matching card in the column
	 *  returns -1 if card not found in column
	 */
	findCardInColumn: function ( cardIs, column) {
		    var i,ix,c,match;
		    for( i=0; i<4; i++ ) {
		        ix = (i * 13) + column;
		        c = this.cards[ix].id;

		        match = this.compareCard(cardIs, c);
		        if(match == 1) {
		            return ix;
		        }
		    }
		    return -1;
	}, 

	/* findCardsInColumn
 	* returns the number of cards of a paticular face in a column
 	*/

	findFacesInColumn: function ( cardIs, column) {
	    var i,ix,c,match;
	    var num_matches=0;
	    for( i=0; i<4; i++ ) {
	        ix = (i * 13) + column;
	        c = this.cards[ix].id;

	        match = this.compareCard(column, c);
	        if(match == 1) {
	            num_matches = num_matches + 1;
	        }
	    }
	    return num_matches;
	},


	/*
	 * FindCardInAnyColumn
	 * starting at column until the end of the dec
	 * see if cardIs is present
	 * return index if found
	 * return -1 if not found
	 */

	findCardInAnyColumn: function( cardIs) {
	    var i;
	    var found;
	    for(i=0; i<13; i++) {
	        found= this.findCardInColumn( cardIs, i);
	        if(found != -1) {
	           return found; // here is one
	        }
	    }
	    return -1;
	},	


	/* cardsAreSwapable( f1, f2)
	 * f1, f2 are indexes to two separate cards
	 * the card in f1 must go into the column of f2
	 * AND
	 * the card in f2 must go into the column of f1
	 */

	cardsAreSwapable: function( f1, f2) {
	    var f;
	    var isSwap = 1;
	    var f1Column = f1 - (parseInt(f1/13)*13);
	    var f2Column = f2 - (parseInt(f2/13)*13);
	    var v1 = this.cards[f1].id;
	    var v2 = this.cards[f2].id;
	    f = this.compareCard(f1Column, v1);
	    if( f == 1) {   // v1 fits into f1 column
	        f = this.findFacesInColumn( v1, f1Column) // how many faces in that column? 
	        if( f < 2) {
	            return 0;   // there must be at least two of them 
	        }    
	    }
	    f = this.compareCard(f2Column, v2);
	    if( f == 1) {   // v2 fits into f2 column
	        f = this.findFacesInColumn( v2, f2Column) // how many faces in that column? 
	        if( f < 2) {
	            return 0;   // there must be at least two of them 
	        }  
	    }
	    f = this.compareCard(f1Column, v2);
	    if( f == 1)  {  // f2 fits into f1 column
	        f = this.findFacesInColumn( v2, f1Column) // how many faces in that column? 
	        if( f > 0) {
	            return 0;   // there is already at least one in that column
	        }         
	    }
	    f = this.compareCard(f2Column, v1);
	    if( f == 1)  {  // f2 fits into f1 column
	        f = this.findFacesInColumn( v1, f2Column) // how many faces in that column? 
	        if( f > 0) {
	            return 0;   // there is already at least one in that column
	        }         
	    }  
	    return 1; 
	},


	swapCardWithAnyOtherColumn: function(col, found) {
	    var v1,v2,ix,randomRow;
	    var f=0;
	    var randomColumn=col;
	    v2 = this.cards[found];
	    while( f === 0) {
	        while( randomColumn === col) {                  // pick a random column that is not this column
	            randomColumn = Math.floor(Math.random() * 13);   // make a number between 0 and 12
	        }
	        randomRow = Math.floor(Math.random() * 4);      // pick a random row
	        ix = randomRow * 13 + randomColumn;             // compute the cell addres
	        v1 = this.cards[ix];
	        f = this.cardsAreSwapable( ix, found);
	    }
	    this.cards[ix] = v2;                             // now swap them
	    this.cards[found] = v1;
	},	

	randomizeCards: function() {
		var array = this.cards;

		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		}

		return this;
	},

	shuffleDeck: function() {
	    /* first randomize the cards */
	    this.randomizeCards();
	    // console.log("RandomCards: ", this.cards);

	    /* then sort to re-order according to alignments with columns */
	    var i,randomRow,ix,v1,v2,found,f;
	    i=0;
	    f=0;
	    while(i<13) {
	        f = this.findFacesInColumn( i, i);
	        if( f !== 0) {
	            while( f > 1) {
	                found = this.findCardInColumn( i, i );
	                this.swapCardWithAnyOtherColumn(i, found );
	                f = this.findFacesInColumn( i, i );
	            }
	            f = 0;
	        }
	        else {     // we need to find the card an a different column and exchange it
	            while( f===0 ) {
	                found = this.findCardInAnyColumn( i );
	                randomRow = Math.floor(Math.random() * 4);
	                ix = randomRow*13 + i;
	                f = this.cardsAreSwapable( ix, found);
	                if( f==1 ) {
	                    v1 = this.cards[ix];
	                    v2 = this.cards[found];
	                    this.cards[ix] = v2;
	                    this.cards[found] = v1;
	                }
	            }
	            f=0;
	        }

	        i++;
	    }
	    //console.log("Ordered RandomCards: ", array);
	    return this;
	},

	deal: function() {
		// shuffle cards logic here
		this.init();
		this.shuffleDeck();
		return this.cards;
	}

};

module.exports = lucky13;
