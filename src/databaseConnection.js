import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import { config } from 'dotenv';
config();

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
};

