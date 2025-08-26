const express = require('express');
const URL = require('../models/url');

const router = express.Router();
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  try {
    const allUrls = await URL.find({ createdBy: req.user.id });
    return res.json({ urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get('/signup', (req, res) => {
  return res.json({ message: "Use /user/signup (POST) to register" });
});

router.get('/login', (req, res) => {
  return res.json({ message: "Use /user/login (POST) to authenticate" });
});

module.exports = router;
