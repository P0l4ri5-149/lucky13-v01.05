function createCard (x,soot,value, color, left, top) {
    // create the card div

    var card = $('<div>').attr({
        "onclick": "rotateThisCard(this)",
        "class": "card ace" + x,
        "id": "card" + x
    }).css({
        "left": left,
        "top": top
    })
    // create the face div
    .append($('<div>').attr({
        "class": "card-face"
    }).css({
        "color": color
    }))
    // create upper left div
    .append($('<div>')
        .attr({
            "class": "card-face-ul"
        })
        .html(value)
        .css({
            "color": color
        }))
    // create lower right div
    .append($('<div>')
        .attr({
            "class": "card-face-lr"
        })
        .html(value)
        .css({
            "color": color
        }))
    // add center to card face
    .append($('<div>')
        .attr({
            "class": "card-center"
        })
        .html(soot)
        .css({
            "color": color
        }))
    // create the back div
    .append( $('<div>').addClass("card-back") );


    // return the card
    return card[0];

}

function createCardIcon (x,soot,value, color, left, top) {
    // create the card div
    var card = document.createElement("div");
    // card.className="card ace" + x;
    card.setAttribute("class", "card icon");
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


