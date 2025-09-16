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

dotenv.config()

const PORT = process.env.PORT
const app =express()
const __dirname = path.resolve()
const uploadFolder = path.join(__dirname, 'img')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname)))

const storage = multer.diskStorage({

  destination: function(_req, file,cb){
    console.log(file)
    return cb(null,uploadFolder)

  },
  filename: function(_req,file,cb){

    console.log(file)
    let originFileName = file.originalname.split('.')[0]
    let filename = originFileName + '-'+ Date.now()+path.extname(file.originalname)
    console.log(filename)
    return cb(null,filename)
  }

})

const upload = multer({storage: storage})


const server = http.createServer(app)
// const wsServer = new WebSocketServer({server})


// wsServer.on('connection', function connection(ws){

//     ws.on('error', console.error)


//     ws.send('connection')
// })

app.post('/register', register)
app.post('/login', login)
app.post('/myprofile',sendProfileInfo)
app.post('/profileInfo',sendProfileInfo)

server.listen(PORT,()=>{

    console.log('server started, port:'+PORT)
})
