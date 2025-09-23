document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('.chat_msg').scrollTop = document.querySelector('.chat_msg').scrollHeight
})
console.log(document.cookie.replace('User=',''))

const socket = new WebSocket("ws://localhost:8080");
const search = document.querySelector('#search')
const listChats = document.querySelector('#list-chats')
const selectDiscussion = document.querySelectorAll('.main_chat-selection')
const main = document.querySelector('main')

socket.onopen = function(){

    socket.send(JSON.stringify({username:document.cookie.replace('User=',''),isOnline:1}))
}


function sendMsg(msg, username, usernameInterlocutor){

    socket.send(JSON.stringify({msg:msg, username:username, usernameInterlocutor:usernameInterlocutor, date:Date.now()}))

    const yourMsg = document.createElement('div')

    yourMsg.classList.add('your-msg')
    yourMsg.classList.add('fg-cyan')

    yourMsg.innerHTML=msg

    document.querySelector('.chat_msg').appendChild(yourMsg)
}




function openChat(usernameInterlocutor){
    
    if(document.querySelector('.main_chat')){main.removeChild(document.querySelector('.main_chat'))}
    
    fetch('http://localhost:8080/openchat',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usernameMy:document.cookie.replace('User=',''),
            usernameInterlocutor:usernameInterlocutor
        })
    }).then(res=>{

        return res.json()
    }).then(info=>{

        const chat = document.createElement('div')
        const topInfo = document.createElement('div')
        const avatar = document.createElement('img')
        const topInfoText = document.createElement('div')
        const username = document.createElement('div')
        const isOnline = document.createElement('div')
        const chatMsg = document.createElement('div')
        const chatWrite = document.createElement('div')
        const inputWrite = document.createElement('input')
        const btnSend = document.createElement('button')
        const btnSendSpan = document.createElement('span')

        chat.classList.add('main_chat')
        topInfo.classList.add('top-info')
        avatar.classList.add('img')
        topInfoText.classList.add('top-info_text-info')
        username.classList.add('username-interlocutor')
        username.classList.add('fg-yellow')
        isOnline.classList.add('online-or-offline')
        if(info.isOnline=='online'){isOnline.classList.add('fg-green')}else{isOnline.classList.add('fg-red')}
        chatMsg.classList.add('chat_msg')
        chatWrite.classList.add('chat_write-msg')
        btnSend.classList.add('chat_btn-send')
        btnSend.classList.add('cyber-button')
        btnSend.classList.add('bg-dark')
        btnSend.classList.add('fg-cyan')
        btnSendSpan.classList.add('glitchtext')

        avatar.src=info.avatar
        username.innerHTML = info.username
        isOnline.innerHTML = info.isOnline
        inputWrite.placeholder='Write your msg'
        btnSend.innerHTML='Send'
        btnSendSpan.innerHTML='Send'

        main.appendChild(chat)
        chat.appendChild(topInfo)
        chat.appendChild(chatMsg)
        chat.appendChild(chatWrite)

        topInfo.appendChild(avatar)
        topInfo.appendChild(topInfoText)
        topInfoText.appendChild(username)
        topInfoText.appendChild(isOnline)

        chatWrite.appendChild(inputWrite)
        chatWrite.appendChild(btnSend)
        btnSend.appendChild(btnSendSpan)
        
        inputWrite.addEventListener('keydown',(key)=>{if (key.key=='Enter'){sendMsg(inputWrite.value, document.cookie.replace('User=',''),info.username); inputWrite.value=''}})
        btnSend.addEventListener('click',()=>{sendMsg(inputWrite.value, document.cookie.replace('User=',''),info.username); inputWrite.value=''})

        socket.onmessage= function(event){

            if (event.msgFor == document.cookie.replace('User=','') && event.username == username.innerHTML){

                const hisMsg = document.createElement('div')

                hisMsg.classList.add('his-msh')
                hisMsg.classList.add('fg-yellow')

                hisMsg.innerHTML= event.msg
            }
        }
    })
}



search.addEventListener('keydown',(key)=>{

    if (search.value+key.key!=document.cookie.replace('User=','')){

        if(document.querySelector('.search-result')){

            listChats.removeChild(document.querySelector('.search-result'))
        }

        
        fetch('http://localhost:8080/search',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:search.value+key.key
            })
        }).then(res=>{

            return res.json()
        }).then(info=>{
            
            if (info.avatar != '' && info.info!=''){

                const selectDiscussionSearch = document.createElement('div')
                const avatar = document.createElement('img')
                const chatInfo = document.createElement('div')
                const username = document.createElement('span')
                const userInfo = document.createElement('span')

                selectDiscussionSearch.classList.add('main_chat-selection')
                selectDiscussionSearch.classList.add('cyber-glitch-0')
                selectDiscussionSearch.classList.add('fg-yellow')
                selectDiscussionSearch.classList.add('search-result')
                chatInfo.classList.add('chat-info')
                userInfo.classList.add('chat-info_last-msg')

                avatar.src=info.avatar
                userInfo.innerHTML=info.info
                username.innerHTML=info.username

                
                listChats.prepend(selectDiscussionSearch)
                selectDiscussionSearch.appendChild(avatar)
                selectDiscussionSearch.appendChild(chatInfo)
                chatInfo.appendChild(username)
                chatInfo.appendChild(userInfo)

                selectDiscussionSearch.addEventListener('click',()=>{openChat(username.innerHTML)})
            }
        })
    }
})



