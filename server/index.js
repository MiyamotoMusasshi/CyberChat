import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

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

app.post('/register', (req,res)=>{

    
    res.json({msg:'hello'})
})

server.listen(PORT,()=>{

    console.log('server started, port:'+PORT)
})
