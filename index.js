const express = require('express');
const app = express();
const port = 8002;
const connectDB = require('./connect');
const URL = require('./models/url');
const cookieParser = require("cookie-parser");
const { restrictToLoginUserOnly} = require('./middleware/auth');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticroute');
const userRouter = require('./routes/user');


connectDB('mongodb://127.0.0.1:27017/urlshortner')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/url',restrictToLoginUserOnly, urlRoute);
app.use('/', staticRoute);
app.use('/user',userRouter);


app.get('/url/:shortid', async (req, res) => {
  const { shortid } = req.params;
  const entry = await URL.findOneAndUpdate(
    { shortid },
    { $push: { viewHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send('Short URL not found');
  }
  res.redirect(entry.redirecturl);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));