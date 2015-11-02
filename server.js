var port = process.env.PORT || 8083;  // set our port

var express = require('express');
var bodyParser = require('body-parser');
var lucky13 = require('./lucky13.js');
lucky13.init();
var app = express();

// ROUTES FOR OUR API
// ========================================================
var router = express.Router();

// rest api methods: get, put, post, delete

// test route to make sure everything is working (accessed at GET http://localhost:8083/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});

router.get('/suit', function ( req, res ) {
    res.json( lucky13.getSuit() );
});

router.put('/suit', function ( req, res ) {
    var suit = req.body.suit;
    console.log("Attempting to set suit to: ", suit);
    console.log("Params: ", req.params);
    console.log("Body: ", req.body);
    lucky13.setSuit( suit );
    res.json( { success: true } );
});

router.get('/cards', function ( req, res ) {
	var cards = lucky13.getCards();

	res.json({ cards: cards });
});

router.get('/deal', function (req,res){
	var cards = lucky13.deal();

	res.json({ cards: cards });
});

router.get('/card/:column/:row', function(req,res) {
	console.log("Card request for column: ", req.params.column, " row: ", req.params.row);
	var card = lucky13.getCard( req.params.row, req.params.column );
	res.json({ card: card });
});

router.get('/play/:column/:row', function( req, res ) {
    console.log("Playing card at row: ", req.params.row, " column: ", req.params.column );
    var result = lucky13.playCard( req.params.row, req.params.column );
    res.json(result);
});

// REGISTER OUR HTML --------------------------
// ALL OF OUR HTML FILES WILL BE DSERVED FROM THE HTML FOLDER
app.use(express.static(__dirname + '/html'));

// REGISTER BODY PARSER -----------------------
// This will give us req.body for put and post methods.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// REGISTER OUR ROUTES ------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================
app.listen(port);
console.log("Go to http://localhost:" + port);