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

// GET route to obtain notes that already saved
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes');
    }
    res.json(JSON.parse(data));
  });
});

// POST route for saving any new note
app.post('/api/notes', (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };

  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes');
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving note');
      }
      res.json(newNote);
    });
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html')); //This if  any other routes  is given
});

//Starting of server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
