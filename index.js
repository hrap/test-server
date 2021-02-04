const { request } = require('express')
const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const PORT = 3000
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(express.json({ limit: '1mb' }))

db.defaults({
  persons: [
    {
      uuid: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      uuid: uuidv4(),
      firstName: 'Jeanne',
      lastName: "d'Arc",
    },
  ],
}).write()

app.get('/person', async (req, res) => {
  res.json(db.get('persons').value())
})

app.post('/person', async (req, res) => {
  if (req.body) {
    const uuid = uuidv4()
    db.get('persons')
      .push({ uuid, ...req.body })
      .write()

    res.json({ uuid })
  } else {
    res.sendStatus(400)
  }
})

app.put('/person/:uuid', async (req, res) => {
  if (req.body && req.params.uuid) {
    db.get('persons').find({ uuid: req.params.uuid }).assign(req.body).write()
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/person/:uuid', async (req, res) => {
  if (req.params.uuid) {
    console.log(db.get('persons').remove({ uuid: req.params.uuid }).write())
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


app.listen(PORT, function () {
  console.log(`Server listen http://localhost:${PORT}`)
})
