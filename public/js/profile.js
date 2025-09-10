const myImg = document.querySelector('#my-img')
const myName = document.querySelector('#my-name')

fetch('http://localhost:8080/myprofile',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: document.cookie.replace('User=','')
    })
}).then(res=>{

    return res.json()
}).then(myInfo=>{

    myName.innerHTML=document.cookie.replace('User=','')
    myImg.src=myInfo.avatar
})