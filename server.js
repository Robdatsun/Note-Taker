const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', function (err, data) {
    console.log(data)
    res.json(data)
  })
});




app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', function (err, data) {
    const db = JSON.parse(data)
    db.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
      if (err) throw err
      res.send('ok')
    })
  })
}
);

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', function (err, data) {
    const db = JSON.parse(data)
    db.splice(req.body.id, 1)
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
      if (err) throw err;
      res.end("Note deleted");
    })
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`) })