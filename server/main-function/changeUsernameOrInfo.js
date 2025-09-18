import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default function changeUsernameOrInfo(req,_res) {
    
    const username = req.body.username

    if (req.body.newUsername){

        database.run(`UPDATE users set username = "${req.body.newUsername}" WHERE username="${username}"`)
    }else{

        database.run(`UPDATE users set info = "${req.body.newInfo}" WHERE username="${username}"`)
    }

}