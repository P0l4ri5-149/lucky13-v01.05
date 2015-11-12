/**
 * Awesome sauce!
 * Author: Ron Logan
 * Copyright 2016 All rights reserved
 * 
 */



    var rotation = 180;
    var cardnum=1;
/*                   A   2  3  4  5  6  7  8  9 10 J  Q  K 
var defaultCards =  [00,01,02,03,04,05,06,07,08,09,10,11,12,     // spades
                     13,14,15,16,17,18,19,20,21,22,23,24,25,     // clubs
                     26,27,28,29,30,31,32,33,34,35,36,37,38,     // hearts
                     39,40,41,42,43,44,45,46,47,48,49,50,51,];   // diams

var deckOfCards = defaultCards; 
*/                  
var deckRotation =  [00,00,00,00,00,00,00,00,00,00,00,00,00,     // spades
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // clubs
                     00,00,00,00,00,00,00,00,00,00,00,00,00,     // hearts
                     00,00,00,00,00,00,00,00,00,00,00,00,00,];   // diams 

function initGame() {
    rotation = 180;
    cardnum = 1;
    var ppoints = document.getElementById("playerPoints");
    ppoints.innerHTML = "";
}

    var faces = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    var suits = ["&spades;","&clubs;","&hearts;","&diams;"]; 
  

function showCard(i,card) {
    var card,left,top,face,soot;
    var i,n,f,s,color,id;
    var id,node,NodeList;
    var row,column,idx;
    row = parseInt(i/13);
    column = i - (row*13);
    var cardSoot;
    var cardFace;
    var cardId;

    cardFace=card.face;
    cardSoot=card.suit;
    cardId=card.id;
    soot = suits[cardSoot];
    face = faces[cardFace];
    if( cardSoot < 2 ) {
        color="black"; 
    }
    else {
        color="red";
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
    node.innerHTML = soot;

    node = NodeList[3];          // lower right
    node.innerHTML = face;
    return cardId;
}


function rotateOneCard( idx, card ) {
    var cardIs = showCard(idx,card);

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
    var row = parseInt(idx/13);
    var column = idx - (row*13);
    getOneCard(row, column, function(card){
        rotateOneCard(idx,card);
    });
    document.getElementById( 'cardSound' + idnum ).play();

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
        leftstr = (column * 60) + 33 + "px";
        switch(row) {
            case 0: top = "148px";    break;
            case 1: top = "246px";    break;
            case 2: top = "344px";    break;
            case 3: top = "442px";    break;
        }
        cardx= createCard( cardnum, 0, 0, 0, leftstr, top);
        main.appendChild(cardx);

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
    clearCards();
    initGame();
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
    makeCards();
}

function selectSuite(s) {
    selectedSuite = s;
    var buttonId = "soot" + (s + 1);

    $("#"+buttonId).css("background", "yellow").siblings().css("background", "grey");
}

function isSpades() {
    setSuit(0);
    selectSuite(0);
}
function isClubs() {
    setSuit(1);
    selectSuite(1);
}
function isHearts() {
    setSuit(2);
    selectSuite(2);
}
function isDiams() {
    setSuit(3);
    selectSuite(3);
}

function getCardIndex( row, col ) {
    var ir = parseInt(row);
    var ic = parseInt(col);
    return (ir*13) + ic;
};

function getOneCard( row, column, callback ) {
    $.ajax({
        url: "/api/play/" + column + "/" + row
    }).done( function( data ) {
        console.log("We got our card: ", data.card);
        console.dir(data);
        console.log("score: ", data.score.points);
        console.log("playerPoints: " + data.score.playerPoints);
        console.log("suiteMatches: " + data.score.suiteMatches);
        console.log("aceKingMatches: " + data.score.aceKingMatches);
        console.log("playerBonus: " + data.score.playerBonus);
        console.log("totalpoints " + data.score.totalpoints);
        console.log("PlayerClicks: " + data.score.playerClicks);

        if( data.score.points ) {
            var ppoints = document.getElementById("playerPoints");
            ppoints.innerHTML = data.score.points;
        }

        if( data.isColCard == true ) {
            var UICardId = getCardIndex( row, column );
            var faceId = "cardface" + ( UICardId + 1 );
            var cardFace = document.getElementById(faceId); 
            cardFace.style.background = "yellow";
        }

        callback(data.card);
    });   

}

function getCards() {
    $.ajax({
        url: "api/deal"
    }).done( function( data) {
        console.log("We got ", data, "for our cards!");

    });
}

function deal() {

    scaleBoard();
    
    getSuit( function( suit ) {
        selectSuite(suit);
    });

    $.ajax({
        url: "api/deal"
    }).done( function( data ) {
        makeCards();
    });
}

function setSuit( suit ) {
    $.ajax({
        url: "api/suit",
        type: "PUT",
        data: { suit: suit }
    }).done( function( result ) {
        console.log("Results of set suit: ", result );
    });
}

function getSuit( callback ) {
    $.ajax({
        url: "api/suit"
    }).done( function( data ) {
        callback( data.suit );
    });
}

function scaleBoard() {
    var w = $(window).width();
    var h = $(window).height();
    // console.log( "Dimensions W: ", w, " H: ", h );
    h = h - 80; // subtract the header

    var dw = 786 - w; // difference of original to current width
    var dh = 492 - h; // difference of original to current height

    var scale = 1;
    if( dw > 0 || dh > 0 ) {

        if( dw > dh ) {
            scale = w / 786;
        } else {
            scale = h / 512;
        }
    }

    $("#board").css("transform", "translate( -50%, 0px ) scale(" + scale + ")");

}

$(window).resize( function(e) {
    //console.log( "Window resizing! ", e );
    scaleBoard();
});