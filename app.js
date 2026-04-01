const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //
const path = require('path'); // 
const fs = require('fs');   
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));//
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));//
app.use('/uploads', express.static(uploadDir));


connectDB()
  .then(() => console.log('Connected to MongoDB '))
  .catch((err) => {
    console.error('MongoDB connection failed ', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// app.get('/api/status', (req, res) => {
//   res.json({ message: 'API is running' });
// });



app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});