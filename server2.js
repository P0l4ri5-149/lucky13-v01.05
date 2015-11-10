var port = process.env.PORT || 8083;  // set our port
var express = require('express');
var app = express();

// ROUTES FOR OUR API
// ========================================================
var router = express.Router();

// rest api methods: get, put, post, delete

// test route to make sure everything is working (accessed at GET http://localhost:8083/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
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
