import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)


export default async function checkCloneUser(username){

    let checkResult=false

    let promiseCheckCloneUser= new Promise(function(resolve,reject){

        database.get(`SELECT username FROM users WHERE username=?`,[username], (err,row)=>{

            if (err){

                console.error(err)
                reject()
            }


            if(row){

                checkResult=true
                resolve()
            }
            else{
                
                resolve()
            }
        })
    })
    
    await promiseCheckCloneUser


    return checkResult
}