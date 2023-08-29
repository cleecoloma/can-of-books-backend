'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BookModel = require('./models/BookModel.js');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());

mongoose.connect(MONGODB_URL);

// READ
app.get('/books', async (request, response) => {
  try {
    let documents = await BookModel.find({});
    response.json(documents);
  } catch (error) {
    console.log('Something went wrong when finding books', error);
    response.status(500).send(error);
  }
});

// CREATE
app.post('/books', async (request, response) => {
  try {
    console.log(`Requesting. Here's our request body: `, request.body);
    let { title, description, status} = request.body;

    if (!title || !description || !status) {
      response.status(400).send(`Please send all required object properties!`)
    } else {
      let newBook = new BookModel({ title, description, status });
      let book = await newBook.save();
      console.log('New book created!' + book)
      response.json(book);
    }

  } catch (error) {
    response.status(400).send('Please send correct book object', error)
  }
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
