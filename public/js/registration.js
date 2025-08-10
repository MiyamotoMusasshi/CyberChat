fetch('http://localhost:8080/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
      }).then(res => {

        return res.json();

      })
      .then(data => {

        console.log(data)

})