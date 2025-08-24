const express = require('express');
const { handler,
    getAnalytics} 
    =  require('../controllers/url');
const router = express.Router();
const URL = require('../models/url');


router.delete('/:shortid', async (req, res) => {
  const { shortid } = req.params;
  await URL.deleteOne({ shortid });
  res.redirect('/');
});


router.post('/',handler);

router.get('/analytics/:shortid',getAnalytics );

module.exports = router;
