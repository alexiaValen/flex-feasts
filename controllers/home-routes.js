// module.exports = router;
const router = require('express').Router();
const { Category, Meal, User, Project } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('homepage');
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meal }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/meals', async (req, res) => {
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

  router.get('/meals/:id', async (req, res) => {
    try {
      const mealData = await Meal.findByPk(req.params.id, {
        include: Category,
      });
      if (!mealData) {
        res.status(404).json({ message: 'No meal found with this id' });
        return;
      }
      const meal = mealData.get({ plain: true });

      res.render('recipe', { meal });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/category/:id', async (req, res) => {
    try {
      const mealsData = await Meal.findAll({
        where: { category_id: req.params.id },
        include: [{ model: Category }],
      });
  
      const meals = mealsData.map((meal) => meal.get({ plain: true }));

      res.render('homepage', { meals });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

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
