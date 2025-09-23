import sqlite from 'sqlite3'
import dotenv from 'dotenv'

dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default function msgProcessing(msg, username, usernameInterlocutor, date){

    database.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='msg${username}'`,(err,row)=>{

        if(err){console.error(err)}

        if(!row){database.run(`CREATE TABLE 'msg${username}' (${usernameInterlocutor} TEXT, date TEXT)`)}
    })

    database.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='msg${usernameInterlocutor}'`,(err,row)=>{

        if(err){console.error(err)}

        if(!row){database.run(`CREATE TABLE 'msg${usernameInterlocutor}' (${username} TEXT, date TEXT)`)}
    })
    
    database.run(`UPDATE ${username} set lastMsg="${msg}", dataLastMsg="${date}" WHERE chatWith="${usernameInterlocutor}"`)
    database.run(`UPDATE ${usernameInterlocutor} set lastMsg="${msg}", dataLastMsg="${date}"  WHERE chatWith="${username}"`)

    database.run(`INSERT INTO 'msg${username}' (${usernameInterlocutor},date) VALUES (?, ?)`, [msg, date])
}