const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


/* GET users listing. */
router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function(req, res, next) {
    const newUserName = req.body.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [newUserName]);
    return {"id": newUserName};
})

router.get('/:id', function(req, res, next) {

    db.all("SELECT id, name FROM users WHERE id = (?)", [+req.params.id], (err, rows) => {
        if (err) {
            next(err);
        } else {
            if (rows.length === 0) {
                res.status(404).send("No records found");
            }
            res.json(rows);
        }
    });
})

module.exports = router;
