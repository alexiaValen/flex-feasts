// module.exports = router;
const router = require('express').Router();
const { Category, Meal, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/articles', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('articles');
});

router.get('/vegan', async (req, res) => {
  try {
    const mealsData = await Meal.findAll({
      where: { category_id: 1 },
    }).catch((err) => {
      res.json(err);
    });

    const meals = mealsData.map((meal) => meal.get({ plain: true }));

    res.render('vegan', { meals });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/vegetarian', async (req, res) => {
  try {
    const mealsData = await Meal.findAll({
      where: { category_id: 2 },
    }).catch((err) => {
      res.json(err);
    });

    const meals = mealsData.map((meal) => meal.get({ plain: true }));

    res.render('vegetarian', { meals });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/meats', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('meats');
});

router.get('/workouts', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('workouts');
});

router.get('/glutenfree', async (req, res) => {
  try {
    const mealsData = await Meal.findAll({
      where: { category_id: 3 },
    }).catch((err) => {
      res.json(err);
    });

    const meals = mealsData.map((meal) => meal.get({ plain: true }));

    res.render('glutenfree', { meals });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pescatarian', async (req, res) => {
  try {
    const mealsData = await Meal.findAll({
      where: { category_id: 4 },
    }).catch((err) => {
      res.json(err);
    });

    const meals = mealsData.map((meal) => meal.get({ plain: true }));

    res.render('pescatarian', { meals });

  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.post('/profile', async (req, res) => {
  try {
    if (!req.body.recipe) {
      return res.status(400).json({ error: 'Name field is required' });
    }

    let filename = ''; // initialize filename to empty string

    if (req.body.category === '1') { // if Vegan category is selected
      filename = 'vegan-logo.jpeg';
    } else if (req.body.category === '2') { // if Vegetarian category is selected
      filename = 'vegetarian-logo.jpeg';
    } else if (req.body.category === '3') { // if gluten-free category is selected
      filename = 'gluten-free-logo.jpeg';
    } else if (req.body.category === '4') { // if Pescatarian category is selected
      filename = 'pescatarian-logo.jpeg';
    } else { // if no category is selected
      filename = '5.png';
    }

    const newMeal = await Meal.create({
      name: req.body.recipe,
      description: req.body.description,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      ingredients: req.body.ingredients.split('\n'),
      instructions: req.body.instructions,
      protein: req.body.protein,
      fat: req.body.fat,
      carbs: req.body.carbs,
      calories: req.body.calories,
      filename: filename,
      category_id: req.body.category || null // set category to null if not provided
    });
    
    res.status(200).json(newMeal);
  } catch (err) {
    console.log(err);
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
      res.render('meals', { meals });
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
