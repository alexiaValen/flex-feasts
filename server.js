// // Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const sequelize = require('./config/connection');
const { fstat } = require('fs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//code for webscraping 
const artcilesUrl = 'https://www.muscleandstrength.com/articles';
const workoutUurl = 'https://www.muscleandstrength.com/workout-routines';
const articles = []

app.get('/api/articles', (req,res) => {
  axios(artcilesUrl)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    // const articles = [] //node-short-summary

    $('.node-title', html).each(function() {
      const title = $(this).text().replace(/\n/g,'')
      const url = $(this).find('a').attr('href')
      articles.push({
         title,
          url
      })
    })
    res.json(articles)
  }).catch(err => console.log(err))
});

app.get('/api/workouts', (req,res) => {
  axios(workoutUurl)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    // const articles = [] //node-short-summary

    $('.node-title', html).each(function() {
      const title = $(this).text().replace(/\n/g,'')
      const url = $(this).find('a').attr('href')
      articles.push({
         title,
          url
      })
    })
    res.json(articles)
  }).catch(err => console.log(err))
});

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});