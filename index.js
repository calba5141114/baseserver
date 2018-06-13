const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index/index.html');
});

app.post('/profile', (req, res) => {

    let name = req.body.name;
    let job = req.body.job;
    let location = req.body.location;

    console.log(`${name} works as a ${job} from ${location}`);
    res.sendFile( __dirname + '/public/index/index.html');

});

app.listen(process.env.PORT || 3000, () => {
    console.log("the app is running on port 3000 or whatever port it was assigned.");
});