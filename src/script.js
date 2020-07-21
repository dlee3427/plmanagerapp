let divForm = document.getElementById("formDiv")

function register() {
    divForm.innerHTML = 
    `<form method="post" id="registerForm">
          <input type="text" name="name" required>
          <input type="text" name="email">
          <input type="password" name="password">
          <input type="password" name="password_confirmation">
          <input type="submit" value="Submit">
    </form>`
    let form = document.getElementById("registerForm")
    form.addEventListener("submit", () => {
        event.preventDefault() 
        createNewUser()
    })
}

function login(){
    divForm.innerHTML =
     `<form method="post" id="loginForm">
          <input type="text" name="email" required>
          <input type="password" name="password"> 
          <input type="submit" value="Submit">
      </form>`
    let form = document.getElementById("loginForm")
    form.addEventListener("submit", () => {
      event.preventDefault()
    fetch("https://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
         if (users.find(user => user.name === form.name.value)){
            let currentUser = users.find(user => user.name === form.name.value)
            currentUser 
        }
        else (divForm.innerHTML += "<p> You messed up, you forgot the username </p>")
      })
    })
  }

  function newPlayerForm() {
    divForm.innerHTML = 
    `<form method="post" id="newPlayer">
          <input type="text" name="name" required>
          
          <input type="submit" value="Submit">
    </form>`
    let form = document.getElementById("newPlayer")
    form.addEventListener("submit", () => {
        event.preventDefault()
        createNewPlayer()
    })

  }


  function createNewUser() {
      fetch("https://localhost:3000/users", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify()
      })
      .then(resp => resp.json())
  }

  function createNewPlayer() {
      fetch("https://localhost:3000/players", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify()
      })
      .then(resp => resp.json())
  }