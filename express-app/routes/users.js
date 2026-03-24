const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const users = [{'id' : 1, 'name': 'Кристина'}, {'id' : 2, 'name': 'Мефодий'}]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({'item' : users});
});

router.post('/', function(req, res, next) {
    let newId = users.at(-1).id
    newId += 1
    const newUser = {'id': newId, 'name': req.body.name};
    users.push(newUser);
    res.status(201).json(newUser);
})

router.get('/:id', function(req, res, next) {
    let id = +req.params.id;
    const currentUser = users.find(user => user.id == id)
    if (!currentUser) {
        res.status(404).send('Not Found');
    }
    res.send(currentUser);
})

module.exports = router;
