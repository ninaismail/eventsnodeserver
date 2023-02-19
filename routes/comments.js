const express = require('express')
const pool = require("../config/database")

const router = express.Router()

// Get all comments
router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from comment', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from the comment table are: \n', rows)
        })
    })
})

// Add a comment
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err

        const inputemail = req.body.email;
        const inputbody = req.body.body;
        const inputeventid = req.body.eventid;
        connection.query('INSERT INTO comment (email , body , eventid) VALUES ("?","?","?")', [inputemail, inputbody, inputeventid], (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Comment with the record ID has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from the comment table are: \n', rows)

        })
    })
});

// Get an comment by id
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM comment WHERE id = ?', [req.body.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from comment table are: \n', rows)
        })
    })
});

// Delete a comment by id
router.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM song WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Song with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from song table are: \n', rows)
        })
    })
});
// update a comment
router.put('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const inputtitle = req.body.Name
        const inputduration = req.body.Duration
        connection.query('UPDATE song SET name = ? , duration = ? WHERE id = ?', [inputtitle,inputduration, req.params.id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Song with the id: ${req.params.id} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

module.exports = router;