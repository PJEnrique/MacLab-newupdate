require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const MAC = require('./routes/MAC');
const AttendanceRoute = require('./routes/AttendanceRoute');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: ['http://192.168.116.181:3900', 'exp://192.168.116.181:19000', 'http://192.168.116.181:3500', 'http://localhost:3900', 'http://localhost:3900']
})); 

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

app.use('/mac', MAC);
app.use('/attendance', AttendanceRoute);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});