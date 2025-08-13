import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

import register from './database/function/registration.js'
import login from './database/function/autorization.js'

dotenv.config()

const PORT = process.env.PORT
const app =express()


app.use(cors())
app.use(express.json())


const server = http.createServer(app)
// const wsServer = new WebSocketServer({server})


// wsServer.on('connection', function connection(ws){

//     ws.on('error', console.error)


//     ws.send('connection')
// })

app.post('/register', register)
app.post('/login', login)

server.listen(PORT,()=>{

    console.log('server started, port:'+PORT)
})
