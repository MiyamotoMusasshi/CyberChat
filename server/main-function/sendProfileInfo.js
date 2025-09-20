import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default async function sendProfileInfo(req,res){

    const username=req.body.username

    
    let resAvatar=''
    let resInfoProfile=''

    let promiseProfileImg = new Promise(function(resolve,reject){

        database.get(`SELECT avatar FROM users WHERE username=?`,[username], (err,row)=>{

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
    let promiseProfileInfo = new Promise(function(resolve,reject){

       database.get(`SELECT info FROM users WHERE username=?`,[username], (err,row)=>{

            if (err){

                console.error(err)
                reject()
            }else if(row==undefined){

                resolve()
            }else{

                if (row.info==null) {

                    resInfoProfile='Your profile Info'
                }else{

                    resInfoProfile=row.info
                    // res.json({avatar:row.avatar})
                }
                resolve()
            }
        })
    })


    await promiseProfileImg
    await promiseProfileInfo

    res.json({avatar:resAvatar,info:resInfoProfile,username:username})
}
