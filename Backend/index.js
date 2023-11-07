const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

app.use(express.json());
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

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