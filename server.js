var port = process.env.PORT || 8083;  // set our port

var express = require('express');
var lucky13 = require('./lucky13.js');
lucky13.init();
var app = express();

// ROUTES FOR OUR API
// ========================================================
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8083/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});

router.get('/cards', function (req,res){
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

// REGISTER OUR HTML --------------------------
// ALL OF OUR HTML FILES WILL BE DSERVED FROM THE HTML FOLDER
app.use(express.static(__dirname + '/html'));

// REGISTER OUR ROUTES ------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================
app.listen(port);
console.log("Go to http://localhost:" + port);