// Reply using AIML

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const AIMLInterpreter = require('aimlinterpreter')

const app = express()
const port = process.env.PORT || 4000
const aimlInterpreter = new AIMLInterpreter({ name:'HelloBot'})

aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, (answer, wildCardArray, input) => {
        reply(reply_token, wildCardArray)
    })
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {97jzizVH2VGXq7ScgDZcgSHPQgwtuQqH4iK2yW5CfEMSS+8WbmE7RaNgtNG3fC9LD/xofbF+6qH96cYOtKTsGoZFRu32+oBgVFq9E9kzBXutSRD6daufZtT9r573ZYOhp476YvIvgyFr0Drnh167xwdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
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