const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} : ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to file.');
    }
  });
  next();
});
app.use((req,res,next) => {
  if(true){
    res.render('maintenance.hbs', {
      error: 'There was a database error.'
    });
  }
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


app.get('/', (request, response) => {
  response.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome sucka'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    error: 'Error msg'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
