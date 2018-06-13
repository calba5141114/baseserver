//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Worker  = require('./models/worker');

function modelSave(nameX, jobX , locationX){
    let temporaryModelX = new Worker({
        name: nameX,
        job: jobX,
        location: locationX,
    });

    temporaryModelX.save((err, modelX)=>{
        if (err){
            console.log(err);
        }
    });
}

app.set('view engine', 'pug');
app.set('views', __dirname + '/public')
// parse application/x-www-form-urlencoded and parse application/json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

try {
    mongoose.connect('mongodb://root:onix365@ds253889.mlab.com:53889/palyhacks');
    console.log('successful connection has been made! to our mongo database');
} catch (error) {
    console.log(err);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


// the index page
app.get('/', (req, res) => {
    res.render( 'index');
});

app.get('/workers', (req, res)=>{

    Worker.find((err, workerData)=>{
        // res.send(workerData);
        res.render('worker',{workerList: workerData});
    });

});

// the post method for a user profile
app.post('/profile', (req, res) => {
    let name = req.body.name;
    let job = req.body.job;
    let location = req.body.location;

    modelSave(name, job, location);

    console.log(`${name} works as a ${job} from ${location}`);
    res.redirect('/');

});



app.listen(process.env.PORT || 3000, () => {
    console.log("the app is running on port 3000 or whatever port it was assigned.");
});
