document.addEventListener("DOMContentLoaded", () => {
  


let divForm = document.getElementById("formDiv")
let header = document.getElementById("header")
const teamDetails = document.getElementById("showTeamDetails")
const playerRoster = document.getElementById("playerRoster")
const workoutList = document.getElementById("workoutList")
const playerDetail = document.getElementById("showPlayerDetails")
const teamPictures = document.getElementById("teamPictures")
const teamInformation = document.getElementById("teamInformation")

function PopulateTeamDropDownList() {
   
   let selectList = document.getElementById("selectList");
   selectList.length = 0;
   
   let defaultOption = document.createElement('option');
   defaultOption.text = 'Choose Your Team';
   selectList.add(defaultOption);
   
   selectList.selectedIndex = 0;
   
   fetch("http://localhost:3000/api/v1/teams")  
     .then(  
       function(response) {  
         if (response.status !== 200) {  
           console.warn('Status Code: ' + 
             response.status);  
           return;  
         }
         response.json().then(function(data) {  
           let option;
       
         for (let i = 0; i < data.length; i++) {
             option = document.createElement('option');
             option.text = data[i].name;
             option.value = data[i].id;
             selectList.add(option);
         }    
         });  
       }  
     )}

function PopulateExerciseList() {

  let list = document.getElementById("exercises");
   list.length = 0;
   
   let defaultOption = document.createElement('option');
   defaultOption.text = 'Choose Exercises';
   list.add(defaultOption);
   
  fetch("http://localhost:3000/api/v1/exercises")  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Status Code: ' + 
            response.status);  
          return;  
        }
        response.json().then(function(data) {  
          let option;
      
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = data[i].id;
            list.add(option);
        }    
        });  
      }  
    )}

function register() {
    divForm.innerHTML = 
    `	
      <header class="v-header container"> 
        <div class="full-screen-video-wrap"> 
        <video autoplay muted loop id="myVideo"> 
              <source src="prem.mp4" type="video/mp4"
        </video>
        </div> 
        <div class="header-overlay">
        </div> 
        <div class="header-content"> 
          <h1>Register</h1>
          <form method="post" id="registerForm">
                <div class="form-group">
                  <label for="name">Name: </label>
                  <input type="text" name="name"><br>
                </div>

                <div class="form-group">
                  <label for="email">Email </label>
                  <input type="email" class="form-control"name="email"><br> 
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                <div>
                
                <label for="user_picture">Your Picture </label>
                <input type="text" name="user_picture"><br>

                <label for="selectList">Team</label>
                <select id="selectList">
                </select><br>

                <label for="password">Password </label>
                <input type="password" name="password"><br>

                <label for="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation"><br>
                
                <input type="submit" value="Submit">
          </form>
        </div>
      </header> 
      `
    let form = document.getElementById("registerForm")
    PopulateTeamDropDownList()
    form.addEventListener("submit", () => {
        event.preventDefault() 
        createNewUser(event)
        form.reset()
    })
}

function login(){
    divForm.innerHTML =
      ` 
      <header class="v-header container"> 
        <div class="full-screen-video-wrap"> 
        <video autoplay muted loop id="myVideo"> 
              <source src="prem.mp4" type="video/mp4"
        </video>
        </div> 
        <div class="header-overlay">
        </div> 
        <div class="header-content"> 
          <h1>Login</h1>
          <form method="post" id="loginForm">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="password" type="email" class="form-control" name="email"><br> 
            </div>
          
            <div class="form-group">
              <label for="password">Password </label>
              <input id="password" type="password" class="form-control" name="password" required data-eye><br>
            </div>

            <div class="form-group m-0">
              <input type="submit" value="Log-In">
            <div>
          
            <div class="mt-4 text-center">
            <br>Don't Have an Account?<button type="button" class="btn">Register</button>
            <div>
          </form>
        </div>
      </header> 
      `
    let form = document.getElementById("loginForm")
    let registerBtn = document.querySelector("button.btn")
    form.addEventListener("submit", () => {
      event.preventDefault()
      debugger
    fetch("http://localhost:3000/api/v1/users")
        .then(res => res.json())
        .then(users => {
         if (users.find(user => user.email === form.email.value)){
            let currentUser = users.find(user => user.email === form.email.value)
            getindividualTeam(currentUser)
        }
        else (divForm.innerHTML += "<p> You messed up, you forgot the username </p>")
      })
    })
    registerBtn.addEventListener("click", () => {
      register()
    })

  }

  function createNewUser(event) {
      fetch("http://localhost:3000/api/v1/users", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: event.target[0].value, 
            email: event.target[1].value,
            user_picture: event.target[2].value,  
            team_id: event.target[3].value,
            password: event.target[4].value,
          })
      })
      .then(resp => resp.json())
      .then(user => getindividualTeam(user))
  }

  function getindividualTeam(input) {
    fetch("http://localhost:3000/api/v1/teams/"+input.team.id)
      .then(resp => resp.json())
      .then(team => showTeamDetails(team))
  }

  function showTeamDetails(team) {
    divForm.innerHTML = ""
    playerDetail.innerHTML = ""
    playerRoster.innerHTML = ""
    
    const teamLogo = document.createElement("img")
    teamLogo.src = team.logo
    teamLogo.style = "width:300px;height:300px"
    
    const stadiumPicture = document.createElement("img")
    stadiumPicture.src = team.stadium_picture
    stadiumPicture.style = "width: 400px;height:300px"

    teamPictures.prepend(teamLogo, stadiumPicture)

    teamInformation.innerHTML =
    `<h1>${team.name}</h1>
     <h3>Stadium: ${team.stadium}</h3>
     <h3>Primary Kit Color: ${team.primary_color}</h3>
     <h3>Secondary Kit Color: ${team.secondary_color}</h3>
     <h3>Team Budget: £${team.team_budget}</h3>
     <h3>Wins:${team.wins}</h3>
     <h3>Draws:${team.draws}</h3>
     <h3>Losses: ${team.losses}</h3>
     <h3>Goals This Season: ${team.goals}</h3>
     
     <br><button type="button" class="signPlayerBtn">Sign New Player</button>   
     <button type="button" class="teamSchedBtn">Team Schedule</button>
     <button type="button" class="teamFinancesBtn">Team Finances</button>
     <button type="button" class="teamWorkout">Schedule Workout for Team</button>

     <h3>Player Roster</h3> 
    `
    
    let char = team["players"];
    char.forEach(player => {
      
      let card = document.createElement("div")
      card.className= "card"
      playerRoster.appendChild(card)
      
      let playerName = document.createElement("h4")
      playerName.innerHTML = player.name 
      card.appendChild(playerName)

      let image = document.createElement("img"); 
      image.style = "width:250px;height:200px"
      image.src = player.player_picture;
      image.addEventListener("click", (player) => {
        showPlayerDetails(player)
      })
      card.appendChild(image) 
  
      let playerPosition = document.createElement("p")
      playerPosition.innerHTML = `Position: ${player.position}`
      card.appendChild(playerPosition)

      let showPlayerBtn = document.createElement("button")
      showPlayerBtn.innerHTML = "Show Player Details"
      showPlayerBtn.addEventListener("click", () => {
        showPlayerDetails(player)
      })
      card.appendChild(showPlayerBtn)

      let cutPlayerBtn = document.createElement("button")
      cutPlayerBtn.innerText = "Cut Player"
      cutPlayerBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/api/v1/players/"+player.id, {
          method: "DELETE"
        })
      .then(() => card.remove())
      })
      card.appendChild(cutPlayerBtn)
    })  

    const signPlayerBtn = document.querySelector("button.signPlayerBtn")
    const teamSchedBtn = document.querySelector("button.teamSchedBtn") 
    const teamFinancesBtn = document.querySelector("button.teamFinancesBtn")
    const teamWorkoutBtn = document.querySelector("button.teamWorkout")
    signPlayerBtn.addEventListener("click", () => {
      signPlayer(team)
    })
    teamSchedBtn.addEventListener("click", () => {
      seeTeamSched(team)
    })
    teamFinancesBtn.addEventListener("click", () => {
      seeTeamFinances(team)
    })
    teamWorkoutBtn.addEventListener("click", () => {
      scheduleTeamWorkout(team)
    })

  }
  function signPlayer(team) {
    playerRoster.innerHTML = ""
    teamDetails.innerHTML = ""
    playerDetail.innerHTML = ""
    divForm.innerHTML = 
    `<form method="post" id="newPlayer">
          <label for="name">Name </label>
          <input type="text" name="name" required><br>

          <label for="player_picture">Player Picture:</label>
          <input type="text" name="player_picture><br> 

          <label for="player_position">Position:</label><br>
          <input type="text" name="position" required><br>

          <label for="number">Player Number:</label>
          <input type="integer" name="number" required><br>
          
          <label for="Salary">Player Salary:</label>
          <input type="float" name="salary"><br> 

          <label for="playing_time">Playing Time</label>
          <input type="integer" name="playing_time" required><br>

          <label for="nationality">Nationality</label>
          <input type="text" name="nationality" required><br> 

          <label for="Age">Age</label>
          <input type="integer" name="age" required><br>

          <label for="Appearances">Appearances:</label>
          <input type="integer" name="appearances"><br>

          <label for="goals">Goals:</label>
          <input type="integer" name="goals"><br>

          <label for="player_picture">Assists:</label>
          <input type="integer" name="assists"><br>

          <label for="passes">Successful Passes</label>
          <input type="integer" name="passes"><br>

          <label for="tackles">Tackles:</label>
          <input type="integer" name="tackles"><br>

          <input type="submit" value="Submit">
    </form>`
    let form = document.getElementById("newPlayer")
    form.addEventListener("submit", () => {
        event.preventDefault()
        createNewPlayer(event)
    })
  }

  function createNewPlayer(event) {
      fetch("http://localhost:3000/api/v1/players", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: event.target[0].value,
            player_picture: event.target[1].value,
            position: event.target[2].value,
            number: event.target[3].value,
            salary: event.target[4].value,
            playing_time: event.target[5].value,
            nationality: event.target[6].value,
            age: event.target[7].value,
            appearances: event.target[8].value,
            goals: event.target[9].value,
            assists: event.target[10].value,
            passes: event.target[11].value,
            tackles: event.target[12].value,
          })
      })
      .then(resp => resp.json())
      .then(player => fetchPlayer(player))
  }

  function fetchPlayer(player) {
    debugger
    fetch("http://localhost:3000/api/v1/players/"+player.id)
    .then(resp => resp.json())
    .then(player => showPlayerDetails(player))
  }

  function showPlayerDetails(player) {

    divForm.innerHTML = ""
    playerRoster.innerHTML = ""
    teamDetails.innerHTML = ""
    const img = document.createElement("img")
    debugger
    img.src = player.player_picture
    img.style = "width:450px;height:400px"
    playerDetail.prepend(img)

    const playerInformation = document.createElement("div")
    playerInformation.id = "playerInformation"
   
    playerInformation.innerHTML = 
    `
     <h3>${player.name}</h3>
     <h3>${player.position}</h3>
     <h3>${player.number}</h3>
     <h3>${player.salary}</h3>
     <h3>${player.nationality}</h3>
    
     <h4>Player Statistics</h4> 
     <p>Appearances: ${player.appearances}</p>
     <p>Goals:${player.goals}</p>
     <p>Assists: ${player.assists}</p>
     <p>Successful Passes: ${player.passes}</p>
     <p>Tackles: ${player.tackles}</p>

     <h4> Upcoming Workouts </h4> 
    `
    playerDetail.append(playerInformation)
    // let char = player["workouts"]
    // debugger
    // char.forEach(workout => {
    //   let card = document.createElement("div")
    //   card.className= "card"
    //   workoutList.appendChild(card)
      
    //   let workoutName = document.createElement("h4")
    //   workoutName.innerHTML = `Workout Name: ${workout.name}` 
    //   card.appendChild(workoutName)

    //   let wStartTime = document.createElement("p")
    //   wStartTime.innerHTML = `Workout Start Time: ${workout.name}` 
    //   card.appendChild(wStartTime)

    //   let wEndTime = document.createElement("p")
    //   wEndTime.innerHTML = `Workout End Time: ${workout.name}`
    //   card.appendChild(wEndTime)
    // })

    const schedWorkout = document.createElement("button")
    schedWorkout.innerText = "Schedule New Workout"

    const checkSched = document.createElement("button") 
    checkSched.innerText = "Check Weekly Schedule"

    const editPlayer = document.createElement("button")
    editPlayer.innerText = "Edit Player Details"

    const backToHomePage = document.createElement("button")
    backToHomePage.innerText = "Back To Team"

    schedWorkout.addEventListener("click", () => {
      newWorkout(player)
    })
    checkSched.addEventListener("click", () => {
      checkSched(player)
    })
    editPlayer.addEventListener("click", () => {
      editPlayer(player)
    })
    backToHomePage.addEventListener("click", () => {
      getindividualTeam(player)
    })

    playerDetail.append(schedWorkout, checkSched, editPlayer, backToHomePage)
  }

  function newWorkout(player) {
    playerDetail.innerHTML = ""
    divForm.innerHTML = 
    `<form method="post" id="newWorkout">
          <label for="name">Name </label>
          <input type="text" name="name" required><br>

          <label for="exercises">Exercise </label>
          <select name="exercises" id="exercises" multiple>
          </select><br>

          <label for="start_time">Start Time </label>
          <input type="date" name="datetime" required><br>

          <label for="end_time">End Time </label>
          <input type="date" name="datetime" required><br>

          <input type="submit" value="Submit">
    </form>
    
    <button type="button" class="backToPlayer">Back To Player </button>
    <button type="button" class="teamHomePage">Team Homepage </button> 
    `
    const teamHomePage = document.querySelector("button.teamHomePage")
    const backToPlayer = document.querySelector("button.backToPlayer")

    teamHomePage.addEventListener("click", () => {
      getindividualTeam(player)
    })
    backToPlayer.addEventListener("click", () => {
      showPlayerDetails(player)
    })

    let form = document.getElementById("newWorkout")
    PopulateExerciseList()
    form.addEventListener("submit", () => {
      createWorkout()
    })
  }

  function newExerciseForm() {
    divForm.innerHTML = 
    `<form method="post" id="newExercise">
          <label for="name">Name </label>
          <input type="text" name="name" required><br>

          <label for="exercise_type">Exercise Type:</label>
          <input type="text" name="exercise_type" required><br>

          <label for="sets">Sets:</label>
          <input type="number" name="sets" required><br>

          <label for="reps">Reps:</label>
          <input type="number" name="reps" required><br>

          <label for="start_time">Start Time </label>
          <input type="time" name="start_time" required><br> 

          <label for="end_time">End Time </label>
          <input type="time" name="end_time" required><br>
    </form>  
    `
    let form = document.getElementById("newExercise")
    form.addEventListener("submit", () => {
      createExercise()
    })

  }

  function seeTeamSched(team){
    const teamSched = document.getElementById("seeTeamSched")

  }

  function seeTeamFinances(team){ 
    teamDetails.innerHTML = ""
    playerRoster.innerHTML = ""
    playerDetail.innerHTML = ""

    const teamFinances = document.getElementById("showTeamFinances")
    teamFinances.innerHTML = 
    `
    <h2>${team.name} Yearly Finances for the 2019 Season</h3> 
    <h2> Team Budget This Season: £${team.team_budget} </h4>
    <h3> Number of Players on Contract: ${team.players.length}</h3> 
    <h4> Total Player Salaries: ${playerSalaryValue} </h4> 
    
    <h3> Number of Coaches on Contract: ${team.users.length}
    <p> Total Coach Salaries: ${coachSalaryValue} </h4> 
    `
  }

  login()

})