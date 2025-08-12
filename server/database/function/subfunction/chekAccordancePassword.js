import bscrypt from 'bcryptjs'
import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)


export default async function checkAccordancePassword(username,password){

    let checkResult=false

    let promiseCheckAccordancePassword= new Promise(function(resolve,reject){

        database.get(`SELECT password FROM users WHERE username=?`,[username], async(err,row)=>{

            if (err){

                console.error(err)
                reject()
            }


            if(row){

                await bscrypt.compare(password,row.password).then(resultDecryptor=>{
                    
                    checkResult=resultDecryptor
                })

                resolve()
            }
            else{

                resolve()
            }
        })
    })
    
    await promiseCheckAccordancePassword



    return checkResult
}