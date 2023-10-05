require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MAC = require('./routes/MAC');


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// routes
app.use('/MAC', MAC);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening in port', process.env.PORT)
})
// Allow all origins for now (you can specify specific origins)
app.use(cors());