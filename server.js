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



//Added functions to handle Routes requests conserning html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html')); //This if  /notes route is given
  });
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); //This if  any other routes  is given
  });



//Starting of server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });