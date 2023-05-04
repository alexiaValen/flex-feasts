// module.exports = router;
const router = require('express').Router();
const { Category, Meal } = require('../models');

// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('homepage');
// });

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const mealsData = await Meal.findAll().catch((err) => { 
        res.json(err);
      });
  
      // Serialize data so the template can read it
      const meals = mealsData.map((meal) => meal.get({ plain: true }));
      res.render('homepage', { meals });
      // Pass serialized data and session flag into template
      //res.render('homepage', { 
       // meals 
        // logged_in: req.session.logged_in 
      //});
        //res.status(200).json(mealsData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const categoryData = await Category.findAll().catch((err) => { 
        res.json(err);
      });
  
      // Serialize data so the template can read it
      const categories = categoryData.map((category) => category.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        categories 
        // logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
