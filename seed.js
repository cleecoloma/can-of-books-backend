'use strict';

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const BookModel = require('./models/BookModel.js');
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const bookData = require('./src/assets/books.json');

mongoose.connect(MONGODB_URL);

const listOfBooks = [];
const createList = () => {
  for (let i = 0; i < bookData.books.length; i++) {
    let book = new BookModel({
      title: bookData.books[i].title,
      description: bookData.books[i].description,
      status: bookData.books[i].status,
    });
    listOfBooks.push(book);
  }
};

createList();
Promise.all(listOfBooks.map((book) => book.save())).then((documents) => {
  console.log(documents);
});
