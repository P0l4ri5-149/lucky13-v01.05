/**
 * Awesome sauce!
 * Author: Ron Logan
 * Copyright 2016 All rights reserved
 * 
 */


    var rotation = 180;
    var cardnum=1;
/*                   A   2  3  4  5  6  7  8  9 10 J  Q  K */
var defaultCards =  [00,01,02,03,04,05,06,07,08,09,10,11,12,     // spades
                     13,14,15,16,17,18,19,20,21,22,23,24,25,     // clubs
                     26,27,28,29,30,31,32,33,34,35,36,37,38,     // hearts
                     39,40,41,42,43,44,45,46,47,48,49,50,51,];   // diams

var deckOfCards = defaultCards; 
                    
var deckRotation =  [00,00,00,00,00,00,00,00,00,00,00,00,00,     // spades
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // clubs
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // hearts
                     00,00,00,00,00,00,00,00,00,00,00,00,00,];   // diams 


var columnHits = [00,00,00,00,00,00,00,00,00,00,00,00,00];
var selectedSuite = 0;
var suiteMatches = 0;
var aceKingMatches =  0;
var playerBonus = 0;

var playerPoints = 0;
var playerFirstTry = 0;
var playerFinalTry = 0;

function initGame() {
    playerPoints = 0;
    playerFirstTry = 0;
    playerFinalTry = 0;
    suiteMatches = 0;
    playerBonus = 0;
    aceKingMatches =  0;
    for(var i = 0; i<13; i++) {
        columnHits[i] = 0;
    }
    rotation = 180;
    cardnum = 1;
    var ppoints = document.getElementById("playerPoints");
    ppoints.innerHTML = "";
}


 function rotateCard(id, rotation) {
    var card = $("#card" + id);
    card.css('transform',"translate(-50%, -50%) rotateY(" + rotation + "deg)");
 }


function tallyPlayerPoints(p) {
    console.log("PlayerPoints before tally " + playerPoints);
    switch(p) {
        case 1: playerPoints += 10; 
                playerFirstTry += 1;
                break;
        case 2: playerPoints += 5;  break;
        case 3: playerPoints += 2;  break;
        case 4: playerPoints += 1;  
                playerFinalTry += 1;
                break;
    }



}

function tallyPoints(idx) {
    /* calculate column hit and tally points */
   
    var clickCol = idx- (parseInt(idx/13)*13);
    var cardIs = deckOfCards[idx];
    var cardSuite = parseInt(cardIs/13);

    var cardFaceIx = cardIs- (parseInt(cardIs/13)*13);
    var faceId = "cardface" + (idx+1);
    var cardFace = document.getElementById(faceId);

    var chit = columnHits[clickCol];
    chit += 1;
    columnHits[clickCol] = chit; 

    
    if( cardFaceIx == clickCol) {
        aceKingMatches += 1;
        tallyPlayerPoints(chit);
        if(cardSuite === selectedSuite) {
            suiteMatches += 1; 
            playerBonus = aceKingMatches * suiteMatches;
        }

        var ppoints = document.getElementById("playerPoints");
        if( (playerFinalTry === 13) || (playerFirstTry === 13) ) {
            ppoints.innerHTML = "Lucky13 Win";
        }
        else {
            var totalpoints = playerBonus + playerPoints;
            ppoints.innerHTML = "Points: " + totalpoints;  
        }
 
        cardFace.style.background = "yellow";

        console.log("playerPoints: " + playerPoints);
        console.log("suiteMatches: " + suiteMatches);
        console.log("aceKingMatches: " + aceKingMatches);
        console.log("playerBonus: " + playerBonus);
        console.log("totalpoints " + totalpoints);
    }    
} 
                 

function randomizeCards(array) {

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
}

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
function compareCard( cardIs, cardArg) {
    var c=cardArg;
    var result = 0;     // assume not
    if( c < 52 ) 
    {   // card not undefined
        while( c > 12) {
            c = c - 13;
        }
        if( c == cardIs) {
            result = 1;
        }
        else {
            result = 0;
        }       
    }

    return result;
} 

/* findCardInColumn
 *  returns index into array for a matching card in the column
 *  returns -1 if card not found in column
 */
function findCardInColumn( cardIs, column, array) {
    var i,ix,c,match;
    for( i=0; i<4; i++ ) {
        ix = (i * 13) + column;
        c = array[ix];

        match = compareCard(cardIs, c);
        if(match == 1) {
            return ix;
        }
    }
    return -1;
} 

/* findCardsInColumn
 * returns the number of cards of a paticular face in a column
 */

function findFacesInColumn( cardIs, column, array) {
    var i,ix,c,match;
    var num_matches=0;
    for( i=0; i<4; i++ ) {
        ix = (i * 13) + column;
        c = array[ix];

        match = compareCard(column, c);
        if(match == 1) {
            num_matches = num_matches + 1;
        }
    }
    return num_matches;
}

/*
 * FindCardInAnyColumn
 * starting at column until the end of the dec
 * see if cardIs is present
 * return index if found
 * return -1 if not found
 */

function findCardInAnyColumn( cardIs, array) {
    var i;
    var found;
    for(i=0; i<13; i++) {
        found= findCardInColumn( cardIs, i, array);
        if(found != -1) {
           return found; // here is one
        }
    }
    return -1;
}


/* cardsAreSwapable( f1, f2, array)
 * f1, f2 are indexes to two separate cards
 * the card in f1 must go into the column of f2
 * AND
 * the card in f2 must go into the column of f1
 */

function cardsAreSwapable( f1, f2, array) {
    var f;
    var isSwap = 1;
    var f1Column = f1 - (parseInt(f1/13)*13);
    var f2Column = f2 - (parseInt(f2/13)*13);
    var v1 = array[f1];
    var v2 = array[f2];
    f = compareCard(f1Column, v1);
    if( f == 1) {   // v1 fits into f1 column
        f = findFacesInColumn( v1, f1Column, array) // how many faces in that column? 
        if( f < 2) {
            return 0;   // there must be at least two of them 
        }    
    }
    f = compareCard(f2Column, v2);
    if( f == 1) {   // v2 fits into f2 column
        f = findFacesInColumn( v2, f2Column, array) // how many faces in that column? 
        if( f < 2) {
            return 0;   // there must be at least two of them 
        }  
    }
    f = compareCard(f1Column, v2);
    if( f == 1)  {  // f2 fits into f1 column
        f = findFacesInColumn( v2, f1Column, array) // how many faces in that column? 
        if( f > 0) {
            return 0;   // there is already at least one in that column
        }         
    }
    f = compareCard(f2Column, v1);
    if( f == 1)  {  // f2 fits into f1 column
        f = findFacesInColumn( v1, f2Column, array) // how many faces in that column? 
        if( f > 0) {
            return 0;   // there is already at least one in that column
        }         
    }  
    return 1; 
}

function swapCardWithAnyOtherColumn(col,found,array) {
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
        f = cardsAreSwapable( ix, found, array);
    }
    array[ix] = v2;                             // now swap them
    array[found] = v1;
}

function shuffleDeck(array) {
    /* first randomize the cards */
    randomizeCards(array);

    /* then sort to re-order according to alignments with columns */
    var i,randomRow,ix,v1,v2,found,f;
    i=0;
    f=0;
    while(i<13) {
        f = findFacesInColumn( i, i, array);
        if( f !== 0) {
            while( f > 1) {
                found = findCardInColumn( i, i, array);
                swapCardWithAnyOtherColumn(i,found,array);
                f = findFacesInColumn( i, i, array);
            }
            f = 0;
        }
        else {     // we need to find the card an a different column and exchange it
            while( f===0 ) {
                found = findCardInAnyColumn( i,  array );
                randomRow = Math.floor(Math.random() * 4);
                ix = randomRow*13 + i;
                f = cardsAreSwapable( ix, found, array);
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
    return array;
}



 function rotateOneCard(idx) {
    console.log("card ix: " + idx);

    var id = "card" + (idx+1);
    console.log(id);
    var rot;
    var r = deckRotation[idx];
    if( r==0 ) {
        rot = 0;
        r=1;        // face up
    }
    else {
        rot = 180
        r=0;        // face down
    }

    deckRotation[idx] = r;

    var card = document.getElementById(id);

    card.style.transform = "translate(-50%, -50%) rotateY(" + rot + "deg)";

    tallyPoints(idx);
 }

 function rotateThisCard(t) {
    var rot;
    var id = t.id;
    var idnum = id.slice(4,id.length);
    var idx = idnum-1;
    rotateOneCard(idx);
 }

  function rotateCard(id, rotation) {
    var card = document.getElementById("card" + id);
    card.style.transform = "translate(-50%, -50%) rotateY(" + rotation + "deg)";
 }

  function applyRotation(rotation) {

  $(".card:not(.icon)").css('transform',"translate(-50%, -50%) rotateY(" + rotation + "deg)");

 }

 function turnLeft() {
    console.log("Turn left clicked.");
    var card = document.getElementById("card1");
    rotation = rotation - 30;
    applyRotation(rotation); 
 };

 function turnRight() {
    console.log("Turn right clicked.");
    var card = document.getElementById("card1");
    rotation = rotation + 30;
    applyRotation(rotation); 
 };

 function flip() {
    console.log("Flip clicked.");
    var r = rotation === 0 ? 0 : 1;
    rotation = rotation === 0 ? 180 : 0;

    deckRotation = _.map( deckRotation, r);

    applyRotation(rotation);   
};

function resetGame() {
    rotation = 180;
    applyRotation(rotation);
    deckRotation = _.map(deckRotation, function(){ return 0; });

}

/* new stuff for many cards */


//console.log(deckOfCards);

function makeCardRows() {
    var leftstr;
    var facestr;
    var cardx;
    var suite;
    var i,n,f,s,color;
    var column = 0;
    var row = 0;
    var top;


    var main = document.getElementById("board");
 //   console.log(main);   
    cardnum=1;
    for(i=0;i<52;i++)
    {   
        n = deckOfCards[i];     // read the card in this position
        s= parseInt(n/13);      // compute the suit
            switch(s) {         // determine color and shape
                case 0: suite="&spades;"; 
                        color="black";      break;
                case 1: suite="&clubs;";  
                        color="black";      break;
                case 2: suite="&hearts;"; 
                        color="red";        break;
                case 3: suite="&diams;";  
                        color="red";        break;
            }
        f = (n-(s*13))+1;       // card index of suite
         switch(f) {
            case 1: facestr="A";    break;
            case 11: facestr="J";   break;
            case 12: facestr="Q";   break;
            case 13: facestr="K";   break;
            default: facestr= f;    break;
        }       
        leftstr = (column * 60) + 33 + "px";
        switch(row) {
            case 0: top = "148px";    break;
            case 1: top = "246px";    break;
            case 2: top = "344px";    break;
            case 3: top = "442px";    break;
        }
        cardx= createCard( cardnum, suite, facestr, color, leftstr, top);
        main.appendChild(cardx);

     //   cardx.style.transform = "translate(-50%, -50%) rotateY(180deg)";
        deckRotation[cardnum-1]=0;
        cardnum=cardnum+1;  
        column = column+1;
        if(column > 12)  {
            column=0;
            row = row+1;
        }    
    }

    console.log(deckRotation);
    console.log(deckRotation.length)
 
}


function makeHeadRow() {
    var leftstr;
    var facestr;

    var cardx;
    var i;

    var main = document.getElementById("board");

    cardnum = 1;
    for(  i = 1; i<14; i++) {
 
        switch(i) {
            case 1: facestr="A";    break;
            case 11: facestr="J";   break;
            case 12: facestr="Q";   break;
            case 13: facestr="K";   break;
            default: facestr= i;    break;
        }

        leftstr = (i-1) * 60 + 33 + "px";
        cardx= createCardIcon( cardnum, facestr, "",  "grey", leftstr, "50px");
        main.appendChild(cardx);
        var yRotation = 0;
        cardx.style.transform = "translate(-50%, -50%) rotateY(" + yRotation + "deg)";
    }
  
}

function makeCards() {

    deckOfCards = defaultCards;
    clearCards();
    cardnum = 1;
    makeHeadRow();
    makeCardRows();
    rotation = 180;
}

function clearCards() {
    var main = document.getElementById("board");
    main.innerHTML = null;
}

/*
function shuffle(array) {

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
}
*/


function shuffleCards() {
    initGame();
    selectSuite(selectedSuite);
    DeckOfCards = shuffleDeck(deckOfCards);
    makeCards();
}

function selectSuite(s) {
    selectedSuite = s;
    switch(s)
    {
        case 0:
            var bx = document.getElementById("soot1");
            bx.style.background = "yellow";
            var bx = document.getElementById("soot2");
            bx.style.background = "grey";
            var bx = document.getElementById("soot3");
            bx.style.background = "grey";
            var bx = document.getElementById("soot4");
            bx.style.background = "grey";                       
        break;

        case 1:
            var bx = document.getElementById("soot1");
            bx.style.background = "grey";
            var bx = document.getElementById("soot2");
            bx.style.background = "yellow";
            var bx = document.getElementById("soot3");
            bx.style.background = "grey";
            var bx = document.getElementById("soot4");
            bx.style.background = "grey";         
        break;
        case 2:
            var bx = document.getElementById("soot1");
            bx.style.background = "grey";
            var bx = document.getElementById("soot2");
            bx.style.background = "grey"; 
            var bx = document.getElementById("soot3");
            bx.style.background = "yellow";
            var bx = document.getElementById("soot4");
            bx.style.background = "grey";         
        break;
        case 3:
            var bx = document.getElementById("soot1");
            bx.style.background = "grey";
            var bx = document.getElementById("soot2");
            bx.style.background = "grey"; 
            var bx = document.getElementById("soot3");
            bx.style.background = "grey"; 
            var bx = document.getElementById("soot4");
            bx.style.background = "yellow";         
        break;
    }
}

function isSpades() {
    selectSuite(0);
}
function isClubs() {
    selectSuite(1);
}
function isHearts() {
    selectSuite(2);
}
function isDiams() {
    selectSuite(3);
}
