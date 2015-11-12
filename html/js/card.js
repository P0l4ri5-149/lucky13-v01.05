function createCard (x,soot,value, color, left, top) {
    // create the card div
    var card = document.createElement("div");

 // card.setAttribute("onclick", "rotateOneCard(this)");
    card.setAttribute("onclick", "rotateThisCard(this)");
    // card.className="card ace" + x;
    card.setAttribute("class", "card ace" + x);
    card.setAttribute("id", "card" + x);
    card.style.left = left;
    card.style.top = top;


    // create the face div
    var cardFace = document.createElement("div");
    cardFace.setAttribute("id", "cardface" + x);
    cardFace.className="card-face";
    cardFace.style.color = color;

    // create upper left div
    var cardFaceUL = document.createElement("div");
    cardFaceUL.className="card-face-ul";

 //   cardFaceUL.innerHTML = value;
 //   cardFaceUL.style.color= color;

    // create lower right div
    var cardFaceLR = document.createElement("div");
    cardFaceLR.className="card-face-lr";

 //   cardFaceLR.innerHTML= value;
 //   cardFaceLR.style.color=color;

    // add center to card face
    var cardCenter = document.createElement("div");
    cardCenter.className="card-center";

 //   cardCenter.innerHTML=soot;
 //   cardCenter.style.color=color;


    // create the back div
    var cardBack = document.createElement("div");
    cardBack.className="card-back";

    // add the back and face to the card
    card.appendChild(cardFace);
    card.appendChild(cardFaceUL); 
    card.appendChild(cardCenter); 
    card.appendChild(cardFaceLR);  
    card.appendChild(cardBack);
    // return the card
    return card;

}

function createCardIcon (x,soot,value, color, left, top) {
    // create the card div
    var card = document.createElement("div");
    // card.className="card ace" + x;
    card.setAttribute("class", "card icon" + x);
    card.setAttribute("id", "icon" + x);
    card.style.left = left;
    card.style.top = top;


    // create the face div
    var cardFace = document.createElement("div");
    cardFace.className="card-face";
    cardFace.style.color = color;


    // add center to card face
    var cardCenter = document.createElement("div");
    cardCenter.className="card-center";
    cardCenter.innerHTML=soot;
    cardCenter.style.color=color;


     // add the back and face to the card
    card.appendChild(cardFace);
    card.appendChild(cardCenter); 

    // return the card
    return card;

}



