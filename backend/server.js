import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

await connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  if (!process.env.MONGO_URI) {
    console.log('Seeding in-memory database...');
    try {
      await User.deleteMany();
      await Product.deleteMany();
      await Order.deleteMany();
      
      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;
  
      const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
      });
  
      await Product.insertMany(sampleProducts);
      console.log('In-memory database seeded!');
    } catch (e) {
      console.error('Failed to seed DB', e);
    }
  }
});
