const express = require('express');
const { handler,getAnanlytics} = require('./../controllers/url');
const router = express.Router();

router.post('/',handler);

router.get('/analytics/:shortid',getAnanlytics );

module.exports = router;