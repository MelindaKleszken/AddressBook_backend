require('./db/connection')
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).send({ message: "Backend Working"})
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})