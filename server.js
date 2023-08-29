'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BookModel = require('./BookModel.js');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());

mongoose.connect(MONGODB_URL);

app.get('/books', async (request, response) => {
  try {
    let documents = await BookModel.find({});
    response.json(documents);
  } catch (error) {
    console.log('Something went wrong when finding books', error);
    response.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
