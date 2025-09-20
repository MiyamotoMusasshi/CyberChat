document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('.chat_msg').scrollTop = document.querySelector('.chat_msg').scrollHeight
})

const search = document.querySelector('#search')
const listChats = document.querySelector('#list-chats')

search.addEventListener('keydown',(key)=>{

    if (search.value!=document.cookie.replace('User=','')){

        if(document.querySelector('.main_chat-selection')){
            
            listChats.removeChild(document.querySelector('.main_chat-selection'))
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

                const selectDiscussion = document.createElement('div')
                const avatar = document.createElement('img')
                const chatInfo = document.createElement('div')
                const username = document.createElement('span')
                const userInfo = document.createElement('span')

                selectDiscussion.classList.add('main_chat-selection')
                selectDiscussion.classList.add('cyber-glitch-0')
                selectDiscussion.classList.add('fg-yellow')
                chatInfo.classList.add('chat-info')
                userInfo.classList.add('chat-info_last-msg')

                avatar.src=info.avatar
                userInfo.innerHTML=info.info
                username.innerHTML=info.username

                listChats.appendChild(selectDiscussion)
                selectDiscussion.appendChild(avatar)
                selectDiscussion.appendChild(chatInfo)
                chatInfo.appendChild(username)
                chatInfo.appendChild(userInfo)
            }
        })
    }
})

// socket.onopen = function(){

//     console.log('connect')
    
// }


