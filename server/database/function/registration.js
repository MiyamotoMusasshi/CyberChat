import bscrypt from 'bcryptjs'
import sqlite from 'sqlite3'
import dotenv from 'dotenv'

dotenv.config()

const locationDataBase = process.env.locationDataBase


const salt = bscrypt.genSaltSync(15)
const database = new sqlite.Database(locationDataBase)


export default function register(req,res) {
    
    const username = req.body.username
    const password = req.body.password
    const returnPassword = req.body.returnPassword

    console.log(username,password,returnPassword)
}