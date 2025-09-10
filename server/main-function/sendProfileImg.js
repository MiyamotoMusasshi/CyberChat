import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default async function sendProfileImg(req,res){

    const username=req.body.username

    let promiseSendProfileImg=  new Promise(function(resolve,reject){

        database.get(`SELECT avatar FROM users WHERE username=?`,[username], (err,row)=>{

            if (err){

                console.error(err)
                reject()
            }else{

                if (row.avatar==null) {

                    res.json({avatar:'http://127.0.0.1:8080/img/common.png'})
                }else{

                    res.json({avatar:row.avatar})
                }
                resolve()
            }
        })
    })

    await promiseSendProfileImg
}