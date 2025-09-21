document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('.chat_msg').scrollTop = document.querySelector('.chat_msg').scrollHeight
})
console.log(document.cookie.replace('User=',''))

const socket = new WebSocket("ws://localhost:8080");
const search = document.querySelector('#search')
const listChats = document.querySelector('#list-chats')
const selectDiscussion = document.querySelectorAll('.main_chat-selection')

socket.onopen = function(){

    socket.send(JSON.stringify({username:document.cookie.replace('User=',''),isOnline:1}))
}


function openChat(usernameInterlocutor){

    fetch('http://localhost:8080/openchat',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usernameMy:document.cookie.replace('User=',''),
            usernameInterlocutor:usernameInterlocutor
        })
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

                selectDiscussionSearch.addEventListener('click',openChat(username.innerHTML))
            }
        })
    }
})



