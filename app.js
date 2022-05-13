const express = require('express')
const app = express()
require("dot-env").config()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/", (req, res) => {
  res.send("APIS are live");
});