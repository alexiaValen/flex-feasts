// Dependencies
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const axios = require('axios');
const cheerio = require('cheerio');

const hbs = exphbs.create({ helpers });

// Sets up the Express App
const app = express();

//code for webscraping 
const url = 'https://www.muscleandstrength.com/articles';
const workouts = 'https://www.muscleandstrength.com/workout-routines';

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articles = [] //node-short-summary

    $('.node-title', html).each(function() {
      const title = $(this).text().replace(/\n/g,'')
      const url = $(this).find('a').attr('href')
      articles.push({
         title,
          url
      })
    })
    console.log(articles)
  }).catch(err => console.log(err))



const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sets up the routes
app.use(require('./controllers/home-routes'));

app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
