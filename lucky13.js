
var lucky13 = {
/*                   A   2  3  4  5  6  7  8  9 10 J  Q  K */
	cards: [00,01,02,03,04,05,06,07,08,09,10,11,12,     // spades
            13,14,15,16,17,18,19,20,21,22,23,24,25,     // clubs
            26,27,28,29,30,31,32,33,34,35,36,37,38,     // hearts
            39,40,41,42,43,44,45,46,47,48,49,50,51],  // diams
    faces: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
   suits: ["&spades;","&clubs;","&hearts;","&diams"],

	init: function() {
		// make cards logic here
		console.log("Initializing the lucky13 game.");
	},

	getCard: function(row,col) {
	///	var ix = (row*13) + col;
	//	var v1 = this.cards[ix];
	//	var r= parseInt(v1/13);
	//	var c= v1 - (r*13);
	//	this.card[0]=this.faces[c];
	//	this.card[1]=this.suits[r];
	//	return this.card;
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
	findCardInColumn: function ( cardIs, column, array) {
		    var i,ix,c,match;
		    for( i=0; i<4; i++ ) {
		        ix = (i * 13) + column;
		        c = array[ix];

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

	findFacesInColumn: function ( cardIs, column, array) {
	    var i,ix,c,match;
	    var num_matches=0;
	    for( i=0; i<4; i++ ) {
	        ix = (i * 13) + column;
	        c = array[ix];

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

	findCardInAnyColumn: function( cardIs, array) {
	    var i;
	    var found;
	    for(i=0; i<13; i++) {
	        found= this.findCardInColumn( cardIs, i, array);
	        if(found != -1) {
	           return found; // here is one
	        }
	    }
	    return -1;
	},	


	/* cardsAreSwapable( f1, f2, array)
	 * f1, f2 are indexes to two separate cards
	 * the card in f1 must go into the column of f2
	 * AND
	 * the card in f2 must go into the column of f1
	 */

	cardsAreSwapable: function( f1, f2, array) {
	    var f;
	    var isSwap = 1;
	    var f1Column = f1 - (parseInt(f1/13)*13);
	    var f2Column = f2 - (parseInt(f2/13)*13);
	    var v1 = array[f1];
	    var v2 = array[f2];
	    f = this.compareCard(f1Column, v1);
	    if( f == 1) {   // v1 fits into f1 column
	        f = this.findFacesInColumn( v1, f1Column, array) // how many faces in that column? 
	        if( f < 2) {
	            return 0;   // there must be at least two of them 
	        }    
	    }
	    f = this.compareCard(f2Column, v2);
	    if( f == 1) {   // v2 fits into f2 column
	        f = this.findFacesInColumn( v2, f2Column, array) // how many faces in that column? 
	        if( f < 2) {
	            return 0;   // there must be at least two of them 
	        }  
	    }
	    f = this.compareCard(f1Column, v2);
	    if( f == 1)  {  // f2 fits into f1 column
	        f = this.findFacesInColumn( v2, f1Column, array) // how many faces in that column? 
	        if( f > 0) {
	            return 0;   // there is already at least one in that column
	        }         
	    }
	    f = this.compareCard(f2Column, v1);
	    if( f == 1)  {  // f2 fits into f1 column
	        f = this.findFacesInColumn( v1, f2Column, array) // how many faces in that column? 
	        if( f > 0) {
	            return 0;   // there is already at least one in that column
	        }         
	    }  
	    return 1; 
	},


	swapCardWithAnyOtherColumn: function(col,found,array) {
	    var v1,v2,ix,randomRow;
	    var f=0;
	    var randomColumn=col;
	    v2 = array[found];
	    while( f === 0) {
	        while( randomColumn === col) {                  // pick a random column that is not this column
	            randomColumn = Math.floor(Math.random() * 13);   // make a number between 0 and 12
	        }
	        randomRow = Math.floor(Math.random() * 4);      // pick a random row
	        ix = randomRow * 13 + randomColumn;             // compute the cell addres
	        v1 = array[ix];
	        f = this.cardsAreSwapable( ix, found, array);
	    }
	    array[ix] = v2;                             // now swap them
	    array[found] = v1;
	},	

	randomizeCards: function(array) {
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
		  return array;
	},

	shuffleDeck: function(array) {
	    /* first randomize the cards */
	    this.randomizeCards(array);
	    //console.log("RandomCards: ", array);

	    /* then sort to re-order according to alignments with columns */
	    var i,randomRow,ix,v1,v2,found,f;
	    i=0;
	    f=0;
	    while(i<13) {
	        f = this.findFacesInColumn( i, i, array);
	        if( f !== 0) {
	            while( f > 1) {
	                found = this.findCardInColumn( i, i, array);
	                this.swapCardWithAnyOtherColumn(i,found,array);
	                f = this.findFacesInColumn( i, i, array);
	            }
	            f = 0;
	        }
	        else {     // we need to find the card an a different column and exchange it
	            while( f===0 ) {
	                found = this.findCardInAnyColumn( i,  array );
	                randomRow = Math.floor(Math.random() * 4);
	                ix = randomRow*13 + i;
	                f = this.cardsAreSwapable( ix, found, array);
	                if( f==1 ) {
	                    v1 = array[ix];
	                    v2 = array[found];
	                    array[ix] = v2;
	                    array[found] = v1;
	                }
	            }
	            f=0;
	        }

	        i++;
	    }
	    //console.log("Ordered RandomCards: ", array);
	    return array;
	},

	deal: function() {
		// shuffle cards logic here
		 this.shuffleDeck(this.cards);
		 return this.cards;
	}

};

module.exports = lucky13;
