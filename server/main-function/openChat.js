import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default async function openChat(req,res) {
    
    const username = req.body.usernameMy
    const usernameInterlocutor = req.body.usernameInterlocutor

    database.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`,username+'and'+usernameInterlocutor,(_err, row) => {
        console.log(row)
    });
}