const express = require('express')

var cors = require("cors");
const app = express()
const port = process.env.PORT || 3000;

// enable cors
app.use(cors())

//for the views
app.set('view engine', 'ejs')

const eventRouter = require("./routes/events")

app.use("/events", eventRouter)

const commentRouter = require("./routes/comments")

app.use("/comments", commentRouter)

app.get("/", (req, res) => {
    res.render('index', {text : 'World'})
  })
  


// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))