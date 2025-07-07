const { nanoid } = require('nanoid');
const URL = require('../models/url');

// async function handler(req, res) {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   const generatedId = nanoid(8);
//   const fullUrl = url.startsWith('http://') || url.startsWith('https://')
//     ? url
//     : `http://${url}`;

//   await URL.create({
//     redirecturl: fullUrl,
//     shortid: generatedId,
//     viewHistory: [],
//     createdBy: req.user._id,
//   });

//   const allUrls = await URL.find({});  

//   return res.render("home", {
//     id: generatedId,
//     urls: allUrls,     
// });
// }

async function handler(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const generatedId = nanoid(8);
    const fullUrl = url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `http://${url}`;
    await URL.create({
        redirecturl: fullUrl,
        shortid: generatedId,
        viewHistory: [],
        createdBy: req.user.id,
    });
    const allUrls = await URL.find({ createdBy: req.user.id });
    return res.render("home", {
        id: generatedId,
        urls: allUrls,
    });
}

async function getAnalytics(req, res) {
  const { shortid } = req.params;
  const result = await URL.findOne({ shortid });

  if (!result) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  return res.json({
    totalClicks: result.viewHistory.length,
    analytics: result.viewHistory
  });
}

module.exports = { handler, getAnalytics };
