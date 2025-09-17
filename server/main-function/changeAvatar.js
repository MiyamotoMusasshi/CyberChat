import sqlite from 'sqlite3'
import dotenv from 'dotenv'


dotenv.config()

const locationDataBase = process.env.locationDataBase
const database = new sqlite.Database(locationDataBase)

export default function changeAvatar(req,_res) {
    
    const username = req.file.originalname.replace('avatar','').replace('.png','')
    const newAvatarName = req.file.filename

    database.run(`UPDATE users set avatar = "http://127.0.0.1:8080/img/${newAvatarName}" WHERE username="${username}"`)


}