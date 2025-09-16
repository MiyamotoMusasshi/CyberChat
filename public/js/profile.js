const body = document.querySelector('body')
const myImg = document.querySelector('#my-img')
const myName = document.querySelector('#my-name')
const myInfo = document.querySelector('.my-info')

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
    console.log(myInfo)
    myName.innerHTML=document.cookie.replace('User=','')
    myImg.src=myInfo.avatar
})

function openInfoProfile(isMyProfile,username) {

    const divProfile = document.createElement('div')
    const avatar = document.createElement('img')
    const spanUsername = document.createElement('span')
    const textInfoProfile = document.createElement('div')

    divProfile.classList.add('profile')
    spanUsername.classList.add('fg-cyan')
    textInfoProfile.classList.add('profile_info')
    textInfoProfile.classList.add('fg-yellow')

    fetch('http://localhost:8080/profileInfo',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
        })
    }).then(res=>{

        return res.json()
    }).then(profileInfo=>{

        avatar.src=profileInfo.avatar
        spanUsername.innerHTML=username
        textInfoProfile.innerHTML=profileInfo.info
    })

    body.appendChild(divProfile)
    divProfile.appendChild(avatar)
    divProfile.appendChild(spanUsername)
    divProfile.appendChild(textInfoProfile)

    if (isMyProfile==1){

        const btnLogout = document.createElement('button')
        const cyberSpanForBtn = document.createElement('span')

        btnLogout.classList.add('cyber-button-small')
        btnLogout.classList.add('fg-red')
        btnLogout.classList.add('bg-dark')
        btnLogout.classList.add('log-out')
        cyberSpanForBtn.classList.add('glitchtext')

        btnLogout.innerHTML='Log out'
        cyberSpanForBtn.innerHTML='Log out'

        divProfile.appendChild(btnLogout)
        btnLogout.appendChild(cyberSpanForBtn)
    }
}

myInfo.addEventListener('click',openInfoProfile(1,document.cookie.replace('User=','')))