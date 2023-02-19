const express = require('express')
const database = require("../config/database")
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({
    extended: false
  }));
  // parse application/json
  router.use(bodyParser.json())

router.get('/', (req, res) => {
    database.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from event', (err, rows) => {
            connection.release() // return the connection to database

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from event table are: \n', rows)
        })
    })
})

// Add a comment
router.post('/', (req, res) => {
    database.getConnection((err, connection) => {
        if(err) throw err

        const inputemail = req.body.email;
        const inputbody = req.body.body;
        const inputeventid = req.body.eventid;
        connection.query('INSERT INTO event (email , body , eventid) VALUES ("?","?","?")', [inputemail, inputbody, inputeventid], (err, rows) => {
        connection.release() // return the connection to database
        if (!err) {
            res.send(`Event with the record ID has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from the comment table are: \n', rows)

        })
    })
});

// Get an event by id
router.get('/:id', (req, res) => {
    database.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM event WHERE id = ?', [req.body.id], (err, rows) => {
            connection.release() // return the connection to database
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from the events table are: \n', rows)
        })
    })
});

// Delete an event by id
router.delete('/:id', (req, res) => {

    database.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM event WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to database
            if (!err) {
                res.send(`Event with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from song table are: \n', rows)
        })
    })
});
// update an event
router.put('/:id', (req, res) => {

    database.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const inputtitle = req.body.Name
        const inputduration = req.body.Duration
        connection.query('UPDATE event SET name = ? , duration = ? WHERE id = ?', [inputtitle,inputduration, req.params.id] , (err, rows) => {
            connection.release() // return the connection to database

            if(!err) {
                res.send(`Event with the id: ${req.params.id} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})
module.exports = router;