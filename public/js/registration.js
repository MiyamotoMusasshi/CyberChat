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
    .then(data => {

      console.log(data)
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