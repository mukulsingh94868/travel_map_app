import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

const app = express();
const corsOptions = {
    origin: true,
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

dotenv.config();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB connection established');
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log('error', error);
    })