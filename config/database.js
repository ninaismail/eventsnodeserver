const {createPool} = require('mysql')
// MySQL
const pool  = createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'events'
})



module.exports = pool;