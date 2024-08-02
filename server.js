// Importation of modules for further work
const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');


const app = express(); // Created an instance of Express object
const PORT = process.env.PORT || 3001; // Created environment variable or  port 3001 as a default port


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html')); // Send the notes.html file when the /notes route is accessed
  });
  
 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Send the index.html file for all other routes (catch-all)
  });

