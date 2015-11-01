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
var advancedPlayIndex = 0;
var advancedPlayMultiplier = 1;
var playerClicks = 0;
var gameOver = 0;

function initGame() {
    playerPoints = 0;
    playerFirstTry = 0;
    playerFinalTry = 0;
    suiteMatches = 0;
    playerBonus = 0;
    aceKingMatches =  0;
    advancedPlayIndex = 1;          // for testing 
    advancedPlayMultiplier = 1;
    playerClicks = 0;
    gameOver = 0;
    for(var i = 0; i<13; i++) {
        columnHits[i] = 0;
    }
    rotation = 180;
    cardnum = 1;
    var ppoints = document.getElementById("playerPoints");
    ppoints.innerHTML = "";
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
    var totalpoints=0;
    playerClicks = playerClicks + 1;
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


    }  

        switch(advancedPlayIndex) {
            case 0: 
                if(playerClicks == 52) {
                    totalpoints *= 1;
                    gameOver = 1;
                }
                break;
            case 1: 
                if(playerClicks == 39) {
                    totalpoints *= 2;
                    gameOver = 1;
                }
                break;
            case 2: 
                if(playerClicks == 26) {
                    totalpoints *= 3;
                    gameOver = 1;
                }
                break;
            case 3: 
                if(playerClicks == 13) {
                    totalpoints *= 4;
                    gameOver = 1;
                }
                break;
        }
        console.log("playerPoints: " + playerPoints);
        console.log("suiteMatches: " + suiteMatches);
        console.log("aceKingMatches: " + aceKingMatches);
        console.log("playerBonus: " + playerBonus);
        console.log("totalpoints " + totalpoints);
        console.log("PlayerClicks: " + playerClicks);
} 


                 
function rotateOneCard(idx) {

    showCard(idx)

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

function showCard(i) {
    var card,left,top,face,suite;
    var i,n,f,s,color,id;
    var id,node,NodeList;
    var row,column,idx;

    row = parseInt(i/13);
    column = i - (row*13);

    idx = deckOfCards[i];     // read the card in this position

        s= parseInt(idx/13);      // compute the suit
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
        f = (idx-(s*13))+1;       // card index of suite
        switch(f) {
            case 1:  face="A";    break;
            case 11: face="J";   break;
            case 12: face="Q";   break;
            case 13: face="K";   break;
            default: face= f;    break;
        } 
        left = (column * 60) + 33 + "px";
        switch(row) {
            case 0: top = "148px";    break;
            case 1: top = "246px";    break;
            case 2: top = "344px";    break;
            case 3: top = "442px";    break;
        }      

       id = "card" + (i+1);
       card = document.getElementById(id);
       card.style.color = color;

        card.style.left = left;
        card.style.top  = top;

       NodeList = card.childNodes;
       node = NodeList[1];          // upper left
       node.innerHTML = face;

       node = NodeList[2];          // center
       node.innerHTML = suite;

       node = NodeList[3];          // lower right
       node.innerHTML = face;

}

function populateCards() {
    for(var i=0;i<52;i++) { 
        showCard(i);  
    }
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





function getCards() {
    $.ajax({
        url: "api/deal"
    }).done( function( data) {
        console.log("We got ", data, "for our cards!");
     //   deckOfCards = data;
     //   console.dir(deckOfCards);
        for(var i=0; i<52; i++) {
            deckOfCards[i] = data.cards[i];
        }
        console.log("deckOfCards ");
        console.dir(deckOfCards);
    });
}