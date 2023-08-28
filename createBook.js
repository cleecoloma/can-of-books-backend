'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const BookModel = require('./BookModel.js');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(`${MONGODB_URL}/can-of-books-cd-frontend`);

let book = new BookModel({
  title: '',
  description: '',
  status: '',
});

book.save().then(document => {
  console.log(document);

  BookModel.find({}).then(documents => {
    console.log(documents);
  });
});