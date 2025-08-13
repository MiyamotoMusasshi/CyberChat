import checkCloneUser from './subfunction/checkCloneUsername.js'
import checkAccordancePassword from './subfunction/chekAccordancePassword.js'


export default async function login(req,res) {
    
    const username = req.body.username
    const password = req.body.password

    let error = ''

    await checkCloneUser(username).then(resultCloneUser=>{

        if (resultCloneUser==false){

            error='There is no such user'
        }
    })

    await checkAccordancePassword(username,password).then(resultAccordancePassword=>{

        if (resultAccordancePassword==false && error==''){

            error='Invalid password'
        }
    })

    if (error !=''){

        res.json({

            error:error
        })
    }
    
}