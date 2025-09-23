import sqlite from 'sqlite3'
import dotenv from 'dotenv'
import { onlineUsers } from '../index.js'

dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default async function openChat(req,res) {
    
    const username = req.body.usernameMy
    const usernameInterlocutor = req.body.usernameInterlocutor
    const online_offline = usernameInterlocutor in onlineUsers ? "online" : "offline"
    
    let resAvatar=''
    let promiseProfileImg = new Promise(function(resolve,reject){

        database.get(`SELECT avatar FROM users WHERE username=?`,[usernameInterlocutor], (err,row)=>{

            if (err){

                console.error(err)
                reject()
            }else if(row==undefined){

                resolve()
            }else{

                if (row.avatar==null) {

                    resAvatar='http://127.0.0.1:8080/img/common.png'
                }else{

                    resAvatar=row.avatar
                    // res.json({avatar:row.avatar})
                }
                resolve()
            }
        })
    })

    await promiseProfileImg
    
    res.json({username:usernameInterlocutor, avatar:resAvatar, isOnline:online_offline})
}
