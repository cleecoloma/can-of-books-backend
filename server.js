'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BookModel = require('./models/BookModel.js');
const authorize = require('./auth/authorize.js');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());
app.use(authorize);
app.use(express.json());

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
    let { title, description, status } = request.body;
    console.log(title + description + status);
    if (!title || !description || !status) {
      response.status(400).send(`Please send all required object properties!`);
    } else {
      let newBook = new BookModel({ title, description, status });
      let book = await newBook.save();
      console.log('New book created!' + book);
      response.json(book);
    }
  } catch (error) {
    response.status(400).send('Please send correct book object', error);
  }
});

app.put('/books/:bookId', async (request, response) => {
  // we need the id
  let id = request.params.bookId;

  try {
    await BookModel.replaceOne({ _id: id }, request.body); // req.body - the express object for all data.
    let newBook = await BookModel.findOne({ _id: id });
    response.status(200).json(newBook);
  } catch (e) {
    console.log(e);
    response.status(400).send(e);
  }
});

// DELETE
app.delete('/books/:bookId', async (request, response) => {
  if (!request.params.bookId) {
    request.status(404).send('Please provide a valid book ID');
    return;
  }

  console.log('deleting book at ID: ' + request.params.bookId);
  try {
    let result = await BookModel.findByIdAndDelete(request.params.bookId);
    console.log(result);
    response.status(204).send('SUCCESS');

    // if (!result) {
    //   response.status(404).send('Book not found');
    // } else {
    //   response.status(204).send('Book Deleted!');
    // }
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
