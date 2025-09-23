import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import multer from 'multer';

import register from './database/function/registration.js'
import login from './database/function/autorization.js'
import sendProfileInfo from './main-function/sendProfileInfo.js'
import changeAvatar from './main-function/changeAvatar.js'
import changeUsernameOrInfo from './main-function/changeUsernameOrInfo.js'
import openChat from './main-function/openChat.js'
import msgProcessing from './main-function/msgProcessing.js'

dotenv.config()

const PORT = process.env.PORT
const app =express()
const __dirname = path.resolve()
const uploadFolder = path.join(__dirname, 'img')

export const onlineUsers=[]

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname)))

const storage = multer.diskStorage({

  destination: function(_req, file,cb){

    return cb(null,uploadFolder)

  },
  filename: function(_req,file,cb){


    let originFileName = file.originalname.split('.')[0]
    let filename = originFileName + '-'+ Date.now()+path.extname(file.originalname)

    return cb(null,filename)
  }

})

const upload = multer({storage: storage})


const server = http.createServer(app)
const wsServer = new WebSocketServer({server})


wsServer.on('connection', function connection(ws){

  ws.on('error', console.error)


  ws.on('message',(data)=>{

    const message = data.toString('utf8')
    const parseMessage = JSON.parse(message)


    if (parseMessage.isOnline){

      let username = parseMessage.username

      onlineUsers.push(username)

      ws.on('close',()=>{

        onlineUsers.pop(username)
      })
    }
    if(parseMessage.msg){

      ws.send(JSON.stringify({msgFor: parseMessage.usernameInterlocutor, username: parseMessage.username, msg:parseMessage.msg}))
      msgProcessing(parseMessage.msg,parseMessage.username,parseMessage.usernameInterlocutor,parseMessage.date)
    }
  })

  

})

app.post('/register', register)
app.post('/login', login)
app.post('/myprofile',sendProfileInfo)
app.post('/profileInfo',sendProfileInfo)
app.post('/changeavatar',upload.single('avatar'),changeAvatar)
app.post('/changeusername',changeUsernameOrInfo)
app.post('/changeinfo',changeUsernameOrInfo)
app.post('/search',sendProfileInfo)
app.post('/openchat',openChat)

server.listen(PORT,()=>{

    console.log('server started, port:'+PORT)
})
