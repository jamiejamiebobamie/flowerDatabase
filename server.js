const dotenv = require('dotenv').config();

var cookieParser = require('cookie-parser');

const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

const mongoose = require('mongoose');

//middleware for JSON data
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//middleware for putting something when you post it
const methodOverride = require('method-override');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Interaction = require('./models/logInteraction.js');

const port = process.env.PORT || 13000;

// Add after body parser initialization!
// app.use(expressValidator());

//must come below const app, but before routes
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.use(express.static('public'));
// app.use(express.static('/'));

// //heroku database.
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/flower-classification'), { useNewUrlParser: true });

//views middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(port);

// local database
// mongoose.connect(process.env.COMPOSE_URI, function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });

app.get("/", (req, res) => {
    Interaction.find().then( interactions => {
        res.render('interactions', {interactions})
    })
});

app.get("/logInteraction", (req, res) => {

    // if (req.host == )
    // console.log(req.connection.remoteAddress)
    // console.log(req.host)

    const urlBody = req.url.split('?=')
    const payload = urlBody[1].split('&')
    // console.log(urlBody, payload)

    const newInteraction = new Interaction();

    newInteraction.petalLength = payload[0]
    newInteraction.petalWidth = payload[1]
    newInteraction.sepalLength = payload[2]
    newInteraction.sepalWidth = payload[3]
    newInteraction.output = payload[4]
    newInteraction.time = payload[5]

    newInteraction.save().then(()=>
        res.redirect('/')
    )
});

app
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

module.exports = app;
