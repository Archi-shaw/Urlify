const express = require('express');
const { handler,getAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/',handler);

router.get('/analytics/:shortid',getAnalytics );

module.exports = router;
