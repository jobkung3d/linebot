// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {97jzizVH2VGXq7ScgDZcgSHPQgwtuQqH4iK2yW5CfEMSS+8WbmE7RaNgtNG3fC9LD/xofbF+6qH96cYOtKTsGoZFRu32+oBgVFq9E9kzBXutSRD6daufZtT9r573ZYOhp476YvIvgyFr0Drnh167xwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'จ๊อบ',
            text: 'สุดหล่อ'
        },
        {
            type: 'ลูกน้ำ',
            text: 'อุ๋ง ๆ'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}