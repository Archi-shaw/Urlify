const express = require('express');
const app = express();
const port = 8000;
const urlRoute = require('./routes/url');
const connectDB = require('./connect');
const URL  = require('./models/url');

connectDB('mongodb://127.0.0.1:27017/urlshortner')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: " + err);
    });

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId: shortid },
        {
            $push: {
                viewHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirecturl);
});


app.listen(port, () => {
    console.log("Server started on port: " + port);
});
