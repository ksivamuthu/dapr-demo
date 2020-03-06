const express = require('express')
const app = express()
app.use(express.json())

const port = 3000

app.post('/receive-event', (req, res) => {
    console.log(req.body)
    res.status(200).send()
})

app.listen(port, () => console.log(`Kafka consumer app listening on port ${port}!`))