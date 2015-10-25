/**
 * Awesome sauce!
 * Author: Ron Logan
 * Copyright 2016 All rights reserved
 */


    var rotation = 180;
    var cardnum=1;

var defaultCards =  [00,01,02,03,04,05,06,07,08,09,10,11,12,     // spades
                    13,14,15,16,17,18,19,20,21,22,23,24,25,     // clubs
                    26,27,28,29,30,31,32,33,34,35,36,37,38,     // hearts
                    39,40,41,42,43,44,45,46,47,48,49,50,51,];   // diams

var deckOfCards = defaultCards; 
                    
var deckRotation =  [00,00,00,00,00,00,00,00,00,00,00,00,00,     // spades
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // clubs
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // hearts
                     00,00,00,00,00,00,00,00,00,00,00,00,00,];   // diams                      

 function rotateCard(id, rotation) {
    var card = $("#card" + id);
    card.css('transform', "translate(-50%, -50%) rotateY(" + rotation + "deg)");
 }

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

  function applyRotation(rotation) {
    $(".card:not(.icon)").css('transform', "translate(-50%, -50%) rotateY(" + rotation + "deg)");
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

    deckRotation = _.map( deckRotation, function(){ return r; });

    applyRotation(rotation);   
};

function resetGame() {
    rotation = 180;
    applyRotation(rotation);
    deckRotation = _.map( deckRotation, function(){ return 0; });
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

function reDisplayCards() {
    var i;
    var card;
    for(i = 1; i<53; i++)
    {
       card = document.getElementById("card"+i);
       console.log(card);

    }
}

function shuffleCards() {
    DeckOfCards = shuffle(deckOfCards);
    makeCards();
    console.log(deckOfCards);
}