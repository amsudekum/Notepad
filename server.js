const express = require('express');
const path = require('path');
const fs = require('fs');
const app= express(); 
const PORT = process.env.PORT || 3001; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

//.html GETS
app.get('/', (req, res) => 
res.sendFile(path.join(_dirname, '/public/index.html')))
app.get('/notes', (req, res) =>
res.sendFile(path.join(_dirname, '/public/notes.html'))) 
