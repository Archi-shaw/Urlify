const express = require('express');
const { handler, getAnalytics } = require('../controllers/url');
const URL = require('../models/url');
const router = express.Router();

router.delete('/:shortid', async (req, res) => {
  const { shortid } = req.params;
  const deleted = await URL.deleteOne({ shortid });

  if (deleted.deletedCount === 0) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.json({ success: true, message: "URL deleted" });
});

router.post('/', handler);

router.get('/analytics/:shortid', getAnalytics);

module.exports = router;
