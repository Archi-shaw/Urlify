// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// dotenv.config(); 
// const port = process.env.PORT;
// const URL = require('./models/url');
// const cookieParser = require("cookie-parser");
// const { checkForAuthentication,restrictTo} = require('./middleware/auth');

// const urlRoute = require('./routes/url');
// const staticRoute = require('./routes/staticroute');
// const userRouter = require('./routes/user');

// const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(checkForAuthentication);
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

// app.use('/url', urlRoute);
// app.use('/', staticRoute);
// app.use('/user',userRouter);


// app.get('/url/:shortid', async (req, res) => {
//   const { shortid } = req.params;
//   const entry = await URL.findOneAndUpdate(
//     { shortid },
//     { $push: { viewHistory: { timestamp: Date.now() } } },
//     { new: true }
//   );

//   if (!entry) {
//     return res.status(404).send('Short URL not found');
//   }
//   res.redirect(entry.redirecturl);
// });

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));


const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const mongoose = require('mongoose');
const URL = require('./models/url');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticroute');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortid', async (req, res) => {
  const { shortid } = req.params;
  const entry = await URL.findOneAndUpdate(
    { shortid },
    { $push: { viewHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!entry) return res.status(404).send('Short URL not found');
  res.redirect(entry.redirecturl);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
