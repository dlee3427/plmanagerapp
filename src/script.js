document.addEventListener("DOMContentLoaded", () => {
  login()
})
  
let divForm = document.getElementById("formDiv")
let header = document.getElementById("header")
const teamDetails = document.getElementById("showTeamDetails")
const playerRoster = document.getElementById("playerRoster")
const workoutList = document.getElementById("workoutList")
const playerDetail = document.getElementById("showPlayerDetails")
const teamPictures = document.getElementById("teamPictures")
const teamInformation = document.getElementById("teamInformation")
const showWorkoutDiv = document.getElementById("showWorkout")
const workoutInformation = document.getElementById("workoutInformation")
const teamBtns = document.querySelector("button#playerRoster")
const teamFinances = document.getElementById("showTeamFinances")

const teamDiv = document.createElement("div")
teamDiv.class = "container"

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

     function PopulatePlayerList() {
   
      let selectList = document.getElementById("players");
      selectList.length = 0;
      
      let defaultOption = document.createElement('option');
      defaultOption.text = 'Choose Player to Assign a Workout to';
      selectList.add(defaultOption);
      
      selectList.selectedIndex = 0;
      
      fetch("http://localhost:3000/api/v1/players")  
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


        function PopulateCoachDropDownList() {
   
          let selectList = document.getElementById("selectCoach");
          selectList.length = 0;
          
          let defaultOption = document.createElement('option');
          defaultOption.text = 'Choose a Coach to Assign to Player';
          selectList.add(defaultOption);
          
          selectList.selectedIndex = 0;
          
          fetch("http://localhost:3000/api/v1/users")  
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

  let selectList = document.getElementById("exercises");
  selectList.length = 0;
  
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose an Exercise';
  selectList.add(defaultOption);
  
  selectList.selectedIndex = 0;

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
            selectList.add(option)
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
    fetch("http://localhost:3000/api/v1/users")
        .then(res => res.json())
        .then(users => {
         if (users.find(user => user.email === form.email.value)){
            let currentUser = users.find(user => user.email === form.email.value)
            getindividualTeam(currentUser)
        }
        else (divForm.innerHTML += "<p> Please Sign in Again! </p>")
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

  function getindividualTeam(user) {
    fetch("http://localhost:3000/api/v1/teams/"+user.team.id)
      .then(resp => resp.json())
      .then(team => showTeamDetails(team))
  }

  function showTeamDetails(team) {
    divForm.innerHTML = ""
    playerDetail.innerHTML = ""
    workoutList.innerHTML = ""
    teamFinances.innerHTML = ""
    teamDiv.innerHTML = ""

    let players = team["players"]
    var playerSalary = players.map(player => player.salary).reduce((acc, salary) => salary + acc)
    var rosterTotal = players.length
    teamDiv.innerHTML = `
    <div class="row justify-content-md-center">
        <div class="col-md-10" position:absolute; left:0; right:0;>
            <div class="card m-b-30">
                <div class="card-header bg-white">
                    <h5 class="card-title text-black mb-0">Team Profile</h5>
                </div>
                <div class="card-body">
                    <div class="xp-social-profile">
                        <div class="xp-social-profile-img">
                            <div class="row">
                                <div class="stadiumPhoto">
                                    <img src="${team.stadium_picture}" class="rounded img-fluid" alt="img">
                                </div>
                            </div>
                        </div>
                        <div class="xp-social-profile-top">
                            <div class="row">
                                <div class="col">
                                    <div class="xp-social-profile-star py-3">
                                        <i class="mdi mdi-star font-24"></i>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="xp-social-profile-avatar text-center">
                                        <img src="${team.logo}" alt="user-profile" class="rounded-circle img-fluid">
                                        <span class="xp-social-profile-live"></span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="xp-social-profile-menu text-right py-3">
                                        <i class="mdi mdi-dots-horizontal font-24"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="xp-social-profile-middle text-center">
                            <div class="row">
                                <div class="col">
                                    <div class="xp-social-profile-title">
                                        <h2 class="my-1 text-black">${team.name}</h5>
                                    </div>
                                    <div class="xp-social-profile-subtitle">
                                        <p class="mb-3 text-muted">${team.stadium}</p>
                                    </div>
                                    <div class="xp-social-profile-subtitle">
                                    <p class="mb-3 text-muted">Team Budget: £${team.team_budget - playerSalary}</p>
                                    </div>

                                    <div class="xp-social-profile-desc">
                                    <p class="text-muted">Primary Kit Color:${team.primary_color}<br>Secondary Kit Color: ${team.secondary_color}</p>
                                   </div>

                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="xp-social-profile-bottom text-center">
                            <div class="row">
                                <div class="col">
                                    <div class="xp-social-profile-media pt-3">
                                        <h5 class="text-black my-1">${team.wins}</h5>
                                        <p class="mb-0 text-muted">Wins</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="xp-social-profile-followers pt-3">
                                        <h5 class="text-black my-1">${team.draws}</h5>
                                        <p class="mb-0 text-muted">Draws</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="xp-social-profile-following pt-3">
                                        <h5 class="text-black my-1">${team.losses}</h5>
                                        <p class="mb-0 text-muted">Losses</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="xp-social-profile-following pt-3">
                                        <h5 class="text-black my-1">${team.goals}</h5>
                                        <p class="mb-0 text-muted">Goals</p>
                                    </div>
                                </div>
                                <div class="col">
                                  <div class="xp-social-profile-following pt-3">
                                      <h5 class="text-black my-1">${rosterTotal}</h5>
                                      <p class="mb-0 text-muted"># on Roster</p>
                                  </div>
                                </div>
                            </div> 
                            <div class="row-btn">
                              <div class="col-btn">
                                <button class="btn btn-light" id="signPlayerBtn">Sign New Player</button>
                                <button class="btn btn-light" id="checkTeamSchedBtn">Check Team Schedule </button>
                                <button class="btn btn-light" id="teamFinancesBtn">Check Team Finances</button>
                              <div/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    document.body.append(teamDiv)

    const signPlayerBtn = document.querySelector("button#signPlayerBtn")
    const teamSchedBtn = document.querySelector("button#checkTeamSchedBtn") 
    const teamFinancesBtn = document.querySelector("button#teamFinancesBtn")
    
    signPlayerBtn.addEventListener("click", () => {
      signPlayer()
    })
    teamSchedBtn.addEventListener("click", () => {
      seeTeamSched(team)
    })
    teamFinancesBtn.addEventListener("click", () => {
      seeTeamFinances(team)
    })


    const cardDeck = document.createElement("div")
    cardDeck.className = "card-deck"

    document.body.appendChild(cardDeck)

    let char = team["players"];
    char.forEach(player => {
      
      let cardGroup = document.createElement("div")
      cardGroup.className = "card-player"
      cardDeck.appendChild(cardGroup)
      
      let cardPicture = document.createElement("div")
      cardPicture.className = "card-image-player"
      cardGroup.append(cardPicture)

      let countryPicture = document.createElement("img")
      countryPicture.src = player.country_picture 
      cardPicture.append(countryPicture)

      let profilePicture = document.createElement("div")
      profilePicture.className = "profile-player"
      cardGroup.append(profilePicture)

      let playerPicture = document.createElement("img")
      playerPicture.src = player.player_picture
      profilePicture.append(playerPicture)
      debugger
      let cardContent = document.createElement("div")
      cardContent.className = "card-content-player"
      cardGroup.append(cardContent)

      let playerName = document.createElement("h3")
      playerName.innerHTML = `${player.name} #${player.number}` 
      cardContent.appendChild(playerName)  
  
      let playerPosition = document.createElement("p")
      playerPosition.innerHTML = `Position: ${player.position}`
      cardContent.appendChild(playerPosition)

      let playerInjury = document.createElement("p")
      if (player.injured == true) {
        playerInjury.innerHTML = "Status: Injured"
        playerInjury.style = "color:red" 
      } else {
        playerInjury.innerHTML = "Status: Healthy"
        playerInjury.style = "color:green"
      }
      playerInjury.className = "card-text"
      cardContent.appendChild(playerInjury)

      buttons = document.createElement("div")
      buttons.className = "buttons-player"
      cardGroup.append(buttons)

      let showPlayerBtn = document.createElement("button")
      showPlayerBtn.innerHTML = "Show Player Details"
      showPlayerBtn.className = "btn btn-primary"
      showPlayerBtn.addEventListener("click", () => {
        showPlayerDetails(player)
      })
      buttons.appendChild(showPlayerBtn)

      let cutPlayerBtn = document.createElement("button")
      cutPlayerBtn.innerText = "Cut Player"
      cutPlayerBtn.className = "btn btn-danger"
      buttons.append(cutPlayerBtn)
      cutPlayerBtn.addEventListener("click", () => {
        return fetch("http://localhost:3000/api/v1/players/"+player.id, {
          method: "DELETE"
        })
      .then(() => card.remove())
      })
    })  
  }

  function signPlayer() {
    playerDetail.innerHTML = ""
    teamDiv.innerHTML = ""
    divForm.innerHTML = 
    `<form method="post" id="newPlayer">
          <label for="name">Name </label>
          <input type="text" name="name" required><br>

          <label for="player_picture">Player Picture:</label>
          <input type="text" name="player_picture><br> 

          <label for="player_position">Position:</label><br><br>
          <input type="text" name="position" required><br>

          <label for="selectList">Team</label>
          <select id="selectList">
          </select><br>

          <label for="selectList">Select a Coach to Assign to Player</label>
          <select id="selectCoach">
          </select><br>

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
    PopulateCoachDropDownList()
    PopulateTeamDropDownList()
    let form = document.getElementById("newPlayer")
    form.addEventListener("submit", () => {
        event.preventDefault()
        createNewPlayer(event)
    })
  }

  function createNewPlayer(event) {
    debugger
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
            team_id: event.target[3].value,
            user_id: event.target[4].value,
            number: event.target[5].value,
            salary: event.target[6].value,
            playing_time: event.target[7].value,
            nationality: event.target[8].value,
            age: event.target[9].value,
            appearances: event.target[10].value,
            goals: event.target[11].value,
            assists: event.target[12].value,
            passes: event.target[13].value,
            tackles: event.target[14].value,
          })
      })
      .then(resp => resp.json())
      .then(player => showPlayerDetails(player))
  }

  function showPlayerDetails(player) {
    debugger
    divForm.innerHTML = ""
    teamDiv.innerHTML = ""

    const img = document.createElement("img")
    img.src = player.player_picture
    img.style = "width:450px;height:400px"
    playerDetail.prepend(img)

    const injuryStatus = document.createElement("p")
    if (player.injured === true) {
      injuryStatus.style = "color:red"
      injuryStatus.innerText = "Injury Status: Player is injured!"
    } else {
      injuryStatus.style = "color:green"
      injuryStatus.innerText = "Injury Status: Player is Healthy!"
    }
    playerDetail.append(injuryStatus)

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
    let char = player["workouts"]
    char.forEach(workout => {
      let card = document.createElement("div")
      card.className= "card"
      workoutList.appendChild(card)
      
      let workoutName = document.createElement("h4")
      workoutName.innerHTML = `Workout Name: ${workout.name}` 
      card.appendChild(workoutName)

      let wStartTime = document.createElement("p")
      wStartTime.innerHTML = `Workout Start Time: ${workout.start_time}` 
      card.appendChild(wStartTime)

      let wEndTime = document.createElement("p")
      wEndTime.innerHTML = `Workout End Time: ${workout.end_time}`
      card.appendChild(wEndTime)

      let workoutDetail = document.createElement("button")
      workoutDetail.innerText = "Workout Detail"
      card.appendChild(workoutDetail)
      workoutDetail.addEventListener("click", () => {
        fetchWorkout(workout)
      })
    })

    const btn = document.createElement("button")
    if (player.injured === true) {
      btn.innerText = "Injured!"
    } else {
      btn.innerText = "Healthy"
    }
    btn.addEventListener("click", () => {
      player.injured = !player.injured
      fetch("http://localhost:3000/api/v1/players/"+player.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            injured: player.injured
        })
      })
      .then(resp => resp.json())
      .then(updatedPlayer => {
        if(updatedPlayer.injured === true ) {
          btn.innerText = "Injured!" 
        } else {
          btn.innerText = "Healthy"
        }
      })
    })


    const schedWorkout = document.createElement("button")
    schedWorkout.innerText = "Schedule New Workout"

    const checkSched = document.createElement("button") 
    checkSched.innerText = "Check Weekly Schedule"

    const backToHomePage = document.createElement("button")
    backToHomePage.innerText = "Back To Team"

    schedWorkout.addEventListener("click", () => {
      newWorkout(player)
    })
    checkSched.addEventListener("click", () => {
      checkSched(player)
    })
    backToHomePage.addEventListener("click", () => {
      fetchPlayerTeam(player)
    })

    playerDetail.append(schedWorkout, checkSched, backToHomePage, btn)

  }

  function fetchPlayerTeam(player) {
    return fetch("http://localhost:3000/api/v1/teams/"+player.team.id)
    .then(resp => resp.json())
    .then(team => showTeamDetails(team))
  }

  function fetchWorkout(workout) {
    fetch("http://localhost:3000/api/v1/workouts/"+workout.id)
    .then(resp => resp.json())
    .then(workout => showWorkout(workout))
  }


  function newWorkout(player) {
    debugger
    playerDetail.innerHTML = ""
    workoutList.innerHTML = ""
    divForm.innerHTML = 
    `<form method="post" id="newWorkout">
          <label for="name">Name </label>
          <input type="text" name="name" required><br>

          <label for="exercises">Exercise </label>
          <select name="exercises" id="exercises">
          </select><br>

          <label for "players">Player</label>
          <select name="players" id="players"> 
          </select><br>

          <label for="start_time">Start Time </label>
          <input type="time" name="start_time" required><br>

          <label for="end_time">End Time </label>
          <input type="time" name="end_time" required><br>

          <input type="submit" value="Submit">
    </form>
    
    <button type="button" class="backToPlayer">Back To Player </button>
    <button type="button" class="teamHomePage">Team Homepage </button> 
    `
    const teamHomePage = document.querySelector("button.teamHomePage")
    const backToPlayer = document.querySelector("button.backToPlayer")
    PopulateExerciseList()
    teamHomePage.addEventListener("click", () => {
      getindividualTeam(player)
    })
    backToPlayer.addEventListener("click", () => {
      showPlayerDetails(player)
    })
    debugger
    let form = document.getElementById("newWorkout")
    PopulateExerciseList()
    PopulatePlayerList()
    form.addEventListener("submit", () => {
      event.preventDefault()
      createWorkout(event)
    })
  }

  function seeTeamSched(team){
    const teamSched = document.getElementById("seeTeamSched")
    const teamHeader = document.getElementById("teamHeader")
    const calendarDiv = document.createElement("div")
    calendarDiv.id = "calendar"

    teamHeader.innerHTML = `
    <h2>${team.name}</h2>
    `
    teamSched.append(teamHeader, calendarDiv)
  }

  function seeTeamFinances(team){ 
    teamDiv.innerHTML = ""
    playerDetail.innerHTML = ""

    let players = team["players"]
    var playerSalary = players.map(player => player.salary).reduce((acc, salary) => salary + acc)
    
    teamFinances.innerHTML = 
    `
    <h2>${team.name} Yearly Finances for the 2019 Season</h3> 
    <h2> Team Budget This Season: £${team.team_budget - playerSalary} </h4>
    <h3> Number of Players on Contract: ${team.players.length}</h3> 
    <h3>Total Value of Player Contracts: £${playerSalary} </h3>

    <h3> Number of Coaches on Contract: ${team.users.length}</h3><br>

    <button id="backtoHome">Back to Team Details</button>
    `

    const teamBtn = document.getElementById("backtoHome")
    teamBtn.addEventListener("click", () => {
      showTeamDetails(team)
    })
  }

  function createWorkout(event) {
    debugger
    fetch("http://localhost:3000/api/v1/workouts", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: event.target[0].value,
        exercise_id: event.target[1].value,
        player_id: event.target[2].value,
        start_time: event.target[3].value,
        end_time: event.target[4].value
      })   
  })
  .then(resp => resp.json())
  .then(workout => showWorkout(workout))
}

  function showWorkout(workout) {
    teamDetails.innerHTML = ""
    playerDetail.innerHTML = ""
    workoutList.innerHTML = ""
    formDiv.innerHTML = ""

    showWorkoutDiv.innerHTML = `
    <h2>${workout.name}</h2> 
    <h4>Workout Start Time:${workout.start_time}</h4>
    <h4>Workout End Time: ${workout.end_time}</h4>

    <button id="backtoPlayer">Back to Player</button>

    <h5>List of Exercises</h5>
    `
    const backtoPlayer = document.createElement("button")
    backtoPlayer.innerText = "Back to Player"


    const listExercises = document.createElement("h5")
    listExercises.innerHTML = "List of Exercises"

    showWorkoutDiv.append(backtoPlayer, listExercises)
    
    const showExerciseDiv = document.getElementById("showExercises")
    debugger
    let exercises = workout["exercises"]
    exercises.forEach(exercise => {
         
      let card = document.createElement("div")
      card.className = "card"
      showExerciseDiv.appendChild(card)

      let exerciseName = document.createElement("p")
      exerciseName.innerHMTL = exercise.name
      card.append(exerciseName)

      let exerciseType = document.createElement("p")
      exerciseType.innerHTML = exercise.exercise_type
      card.append(exerciseType)

      let exerciseSets = document.createElement("p")
      exerciseSets.innerHTML = `Sets: ${exercise.sets}` 
      card.append(exerciseSets)

      let exerciseReps = document.createElement("p")
      exerciseReps.innerHTML = `Reps: ${exercise.reps}` 
      card.append(exerciseReps)

      let exerciseDuration = document.createElement("p")
      exerciseDuration.innerHTML = `Duration: ${exercise.duration} seconds`
      card.append(exerciseDuration)
    })


  }
  function fetchAllTeams() {
    fetch("http://localhost:3000/api/v1/teams")
    .then(resp => resp.json())
    .then(teams => checkPremierLeagueStandings(teams))

  }
  function checkPremierLeagueStandings(teams) {
    const ptable = document.createElement("div")
    ptable.className = "ptable"

    document.body.append(ptable)

    teams.forEach(team => {
    ptable.innerHTML = `
        <h1 class="headin">Premier League Standings</h1>
                <table>
                  <tr class="col">
                    <th>#</th>
                    <th>Team</th>
                    <th>GP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Goals</th>
                    <th>PTS</th>
                  </tr>
                  <tr class="wpos" id="teamTable">
                    <td>1</td>
                    <td>${team.name}</td>
                    <td>30</td>
                    <td>${team.wins}</td>
                    <td>${team.draws}</td>
                    <td>${team.losses}</td>
                    <td>${team.goals}</td>
                  </tr>
                </table>
      </div>
      `
      trId = document.getElementById("teamTable")
      
      teamName = document.createElement("td")
      teamName.innerText = `${team.name}`


    })


  }


  // function createPlayerWorkouts(player) {
  //     debugger
  //     player_id = player.id
  //     fetch("http://localhost:3000/api/v1/workouts", {
  //       method: "POST", 
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name: event.target[0].value,
  //         exercise_id: event.target[1].value,
  //         player_id: player_id,
  //         start_time: event.target[3].value,
  //         end_time: event.target[4].value
  //       })   
  //   })
  //   .then(resp => resp.json())
  //   .then(workout => showWorkout(workout))
  // }


