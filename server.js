const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id')
const uniqueId = generateUniqueId()
const app= express(); 
const PORT = process.env.PORT || 3001; 
const dbJson = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

//.html GETS
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html')))
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))) 

//api routes
app.get('/api/notes', (req, res) => res.json(dbJson))
app.post('/api/notes', (req, res) => {
    const newNote = {
        title:req.body.title,
        text:req.body.text,
        id: generateUniqueId()
    };

    fs.readFile('db.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).json({error: 'Failed to read.'})
        }
        debugger
        const notes = JSON.parse(data);
        notes.push (newNote);

        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if(err) {
                return res.status(500).json({ error: 'Failed to write.'})
            }
            res.json(newNote)
        })
    })
})


app.listen(PORT, () => 
console.log(`API listening at http://localhost:${PORT}`));