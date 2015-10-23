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



                 

/* testCards version 1 -- should find all cards after makecards 
 * will flip all cards that are aligned in their respective column
*/

function testCard() {
    var i,j,ix,c;
    for(i=0;i<13;i++) {
        for(j=0;j<4;j++) {
            ix = j * 13 + i;
            c = deckOfCards[ix];
            if( compareCard(c,i) )
            {
                rotateOneCard(ix);
            }
        }
    }
}


/* shuffle(array) 
 *  shuffle cards such that at least one card face value aligns in each column
 */

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
 */
function compareCard( cardIs, cardArg) {
    var c=cardArg;
    var result = 0;     // assume not
    while( c > 12) {
        c = c - 13;
    }
    if( c == cardIs) {
        result = 1;
    }
    else {
        result = 0;
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

/*
 * FindCardInAnyColumn
 * starting at column until the end of the dec
 * see if cardIs is present
 * return index if found
 * return -1 if not found
 */

function findCardInAnyColumn( cardIs, column, array) {
    var i;
    var found;
    for(i=column; i<13; i++) {
        found= findCardInColumn( cardIs, i, array);
        if(found != -1) {
           return found; // here is one
        }
    }
    return -1;
}

function shuffleDeck(array) {
    /* first randomize the cards */
 //   randomizeCards(array);
 //   var array = deckOfCards;
    var randomRow,ix,v1,v2;
    /* then sort to re-order according to alignments with columns */
    var i,j,found;
    i=0;
    while(i<13) {
        found = findCardInColumn( i, i, array);

        if( found != -1 ) {
            i++;   // we already have a card in this column, go to the next column
        }
        else {     // we need to find the card an a different column and exchange it
            found = findCardInAnyColumn( i, i, array );
            if( found == -1) {
                i=13; // this is an error condition TODO: HANDLE this differently
            }
            else {  // we have the index for the card found
                randomRow = Math.floor(Math.random() * 4);
                ix = randomRow * 13 + i;    // compute the cell addres
                v1 = array[ix];             // swap them
                v2 = array[found];
                array[ix] = v1;
                array[found] = v2;
            }
        }

        i++;
    }
    return array;
}

/*
 function rotateOneCard(t) {
 //   console.log(t);
    console.log(" before rotation: ");
    console.log(deckRotation);
    var rot;
    var id = t.id;
    var idnum = id.slice(4,id.length);
    var idx = idnum-1;
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

    console.log(" after rotation: ");
    console.log("element rotation: " + card.style.transform);
 }
 */

 function rotateOneCard(idx) {
 //   console.log(t);
    console.log(" before rotation: ");
    console.log(deckRotation);
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

    console.log(" after rotation: ");
    console.log("element rotation: " + card.style.transform);
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
    for(var i=1; i< cardnum; i++)
    {
        rotateCard(i,rotation);
    }
 //   rotateCard(1,rotation); 
 //   rotateCard(2,rotation); 
 //   rotateCard(3,rotation); 
 //   rotateCard(4,rotation); 
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
    if(rotation === 0) {
        rotation = 180;
        for( var i = 0; i < 52; i++){
            deckRotation[i] = 0;
        }
    } else {
        rotation = 0;
        for( var i = 0; i < 52; i++){
            deckRotation[i] = 1;
        }
    }
    // rotation = rotation + 180;
    applyRotation(rotation);   
};

function resetGame() {
    rotation = 180;
    applyRotation(rotation);
    for( var i = 0; i < 52; i++){
        deckRotation[i] = 0;
    }
}

/* new stuff for many cards */


console.log(deckOfCards);

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
 //   initDeck();
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


/*
function shuffleCards() {
    DeckOfCards = shuffle(deckOfCards);
    makeCards();
    console.log(deckOfCards);
}
*/

function shuffleCards() {
 //   DeckOfCards = shuffleDeck(deckOfCards);
    DeckOfCards=randomizeCards(deckOfCards);
    makeCards();
 //   flip();
 //   DeckOfCards = shuffleDeck(deckOfCards);
 //   console.log(deckOfCards);
}

