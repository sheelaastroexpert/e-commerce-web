// src/config/db.js
import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Options are now set by default in Mongoose 8.x
    });

    console.log(chalk.green.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;