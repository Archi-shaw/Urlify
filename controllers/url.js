const { nanoid } = require('nanoid');

const URL = require('./../models/url');

async function handler(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const generatedId = nanoid(8);


    await URL.create({
        redirecturl: body.url,
        shortid: generatedId,
        viewHistory: [], 
    });

    return res.json({ id: generatedId });
}


async function getAnanlytics(req, res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortid: shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.viewHistory.length,
        analytics: result.viewHistory,
    });
}



module.exports = { handler ,getAnanlytics};
