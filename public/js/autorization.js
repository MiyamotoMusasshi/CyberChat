const UsernameInput = document.querySelector('#username_login')
const PasswordInput = document.querySelector('#password_login')
const btnLogin = document.querySelector('#login-btn')


btnLogin.addEventListener('click',()=>{

  fetch('http://localhost:8080/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: UsernameInput.value,
        password: PasswordInput.value,
      })
    }).then(res => {

      return res.json();

    })
    .then(msgFromServer=> {

      if (document.querySelector('.cyber-att')){

        document.querySelector('body').removeChild(document.querySelector('.cyber-att'))
      }

      if (msgFromServer) {

        const elementError = document.createElement('span')

        elementError.classList.add('cyber-att')
        elementError.id = 'error'
        elementError.innerHTML=msgFromServer.error

        document.querySelector('body').appendChild(elementError)
      }
  })
})
