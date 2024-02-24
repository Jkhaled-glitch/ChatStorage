const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const fileRoutes = require('./routes/fileRoutes.js');


const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dossiers statiques
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Routes

app.use('/', fileRoutes);



app.listen(port, () => console.log(`Server Storage started on port ${port}`));
