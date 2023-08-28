'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const BookModel = require('./BookModel.js');
const MONGODB_URL = process.env.MONGODB_URL;
const bookData = require('./src/assets/books.json')

mongoose.connect(MONGODB_URL);

// const createList = () => {
//   for (let i = 0; i < bookData.books.length; i++) {
//     new BookModel(
//       bookData.books[i].title,
//       bookData.books[i].description,
//       bookData.books[i].status,
//     );
//   }
// }

let book1 = new BookModel({
  title: 'The Enchanted Garden Adventure',
  description:
    'Join young siblings on a magical journey through their garden, where they discover the wonders of nature and the power of imagination.',
  status: true,
});

let book2 = new BookModel({
  title: 'Mystery at Maplewood Manor',
  description:
    'A group of kids solves mysteries in their quaint neighborhood, unraveling secrets and strengthening their bond of friendship along the way.',
  status: false,
});

let book3 = new BookModel({
  title: 'The Amazing Space Explorers',
  description:
    'Embark on an intergalactic adventure with a diverse crew of young astronauts as they discover new planets and learn about teamwork.',
  status: true,
});

Promise.all([
  book1.save(), 
  book1.save(),
  book1.save()
]).then(documents => {
  console.log(documents);
});