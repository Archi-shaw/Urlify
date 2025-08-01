// const express = require('express');
// const URL = require('../models/url');

// const router = express.Router();



// router.get('/', async (req, res) => {
//    if (!req.user) {
//     return res.redirect('/signup'); 
//   }
//     const allUrls = await URL.find({ createdBy: req.user.id });
//     return res.render('home', {
//         urls: allUrls,
//     });
// });


// router.get('/signup', async(req,res) => {
//   return res.render('signup');
// })

// router.get('/login', async(req,res) => {
//   return  res.render('login');
// })

// module.exports = router;


// routes/staticroute.js
const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  const allUrls = await URL.find({ createdBy: req.user.id });
  return res.render('home', { urls: allUrls });
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
