import bscrypt from 'bcryptjs'
import sqlite from 'sqlite3'
import dotenv from 'dotenv'

import checkCloneUser from './subfunction/checkCloneUsername.js'

dotenv.config()

const locationDataBase = process.env.locationDataBase


const salt = bscrypt.genSaltSync(15)
const database = new sqlite.Database(locationDataBase)


export default async function register(req,res) {
    
    const username = req.body.username
    const password = req.body.password
    const returnPassword = req.body.returnPassword

    let error = ''

    await checkCloneUser(username).then(resultCloneUser=>{

        if (resultCloneUser==true){
            
            error='username used'            
        }
    })

    if (username.length < 5) {

        error='The username must be more than 5 characters long'
    }else if (password != returnPassword) {

        error="Passwords don't match"
    }else if (password.length < 6){

        error='The password must have at least 6 characters.'
    }
    
    if (error != ''){

        res.json({
        
            error: error
        })
    }else{

        const hashPassword = bscrypt.hashSync(password, salt)

        database.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPassword])
    }
    
}