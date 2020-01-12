const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gis', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => console.log('Database Error'));
db.on('open', () => console.log('Database Connection Success'));

module.exports = db;
