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
    //aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, (answer, wildCardArray, input) => {
        //reply(reply_token, answer)
    //})

    let answer = '';
    if(msg == "จ๊อบ"){
        let items = ['สุดหล่อ','คนนี้เด็ดใช่ย่อย','มุขเสี่ยวขอให้บอก','โห...คนจริงอ่ะ บอกเลย','น่ารักใช่ไหมล่ะ']
        let item = items[Math.floor(Math.random()*items.length)];
        answer = item
    }else if(msg == "ลูกน้ำ"){
        let items = ['สุดสวย','ใช่นางฟ้าหรือเปล่า','น่ารักที่สุด','นี่คนหรือนางฟ้า','รักที่สุด']
        let item = items[Math.floor(Math.random()*items.length)];
        answer = item
    }else if(msg == "-help"){
        answer = 'คำที่ใช้ได้ จ๊อบ กับ ลูกน้ำ'
    }
    
    reply(reply_token, answer)
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