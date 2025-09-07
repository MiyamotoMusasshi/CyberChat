const UsernameInput = document.querySelector('#username_register')
const PasswordInput = document.querySelector('#password_register')
const returnPasswordInput = document.querySelector('#return-password_register')
const btnRegister = document.querySelector('#register-btn')


btnRegister.addEventListener('click',()=>{

  fetch('http://localhost:8080/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: UsernameInput.value,
        password: PasswordInput.value,
        returnPassword: returnPasswordInput.value
      })
    }).then(res => {

      return res.json();

    })
    .then(msgFromServer=> {

      if (document.querySelector('.cyber-att')){

        document.querySelector('body').removeChild(document.querySelector('.cyber-att'))
      }

      if (msgFromServer.error!='noError') {

        const elementError = document.createElement('span')

        elementError.classList.add('cyber-att')
        elementError.id = 'error'
        elementError.innerHTML=msgFromServer.error

        document.querySelector('body').appendChild(elementError)
      }
      else{
        document.cookie='User='+UsernameInput.value+'; max-age=31536000'
        window.location.href='http://127.0.0.1:5500/public/pages/main.html'
      }
  })
})

// fetch('http://localhost:8080/register',{
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//       }).then(res => {

//         return res.json();

//       })
//       .then(data => {

//         console.log(data)

// })