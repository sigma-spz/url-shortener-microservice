require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const urlHandler = require('./handlers/url_handler');
const path = require('path');

// Basic Configuration
const port = process.env.PORT || 3000;
const baseDir = path.join(__dirname, '../');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/public', express.static(`${baseDir}/public`));

app.get('/', function(req, res) {
    res.sendFile(`${baseDir}/views/index.html`);
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.post('/api/shorturl', urlHandler.postUrl);
app.get('/api/shorturl/:key?', urlHandler.goToUrl)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
