const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDb = require('./config/db');
const port = process.env.PORT;
const URL = require('./models/url');
const userRouter = require('./routes/user'); 
connectDb();
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticroute');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',                 
  'https://urlify-front.onrender.com'       
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use('/user', userRouter); 


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
