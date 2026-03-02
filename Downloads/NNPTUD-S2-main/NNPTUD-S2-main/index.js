const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const userCtrl = require('./src/controllers/userController');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// endpoints for enable/disable
app.post('/enable', userCtrl.enableUser);
app.post('/disable', userCtrl.disableUser);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nnptud';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });