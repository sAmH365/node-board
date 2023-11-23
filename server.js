const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
new MongoClient(url).connect().then(client => {
    console.log('DB연결 성공')
    db = client.db('forum')

    app.listen(8080, () => {
        console.log('http://localhost:8080 에서 서버 실행중!')
    })
}).catch(err => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html')
})

app.get('/news', (req, res) => {
    db.collection('post').insertOne({title: (Math.floor(Math.random() * 2 + 1))})
    res.send('오늘 맑음')
})

app.get('/shop', (req, res) => {
    res.send('쇼핑페이지입니다')
})

