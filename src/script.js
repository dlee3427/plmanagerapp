document.addEventListener("DOMContentLoaded", () => {
  homePage()
})
  
let divForm = document.getElementById("formDiv")
let header = document.getElementById("header")
const teamDetails = document.getElementById("showTeamDetails")
const playerRoster = document.getElementById("playerRoster")

const playerDetail = document.getElementById("showPlayerDetails")
const teamPictures = document.getElementById("teamPictures")
const teamInformation = document.getElementById("teamInformation")
const showWorkoutDiv = document.getElementById("showWorkout")
const workoutInformation = document.getElementById("workoutInformation")
const teamBtns = document.querySelector("button#playerRoster")
const teamFinances = document.getElementById("showTeamFinances")

const teamDiv = document.createElement("div")
teamDiv.class = "container"

const cardDeck = document.createElement("div")
cardDeck.className = "card-deck"


function homePage() {
  teamDiv.innerHTML = ""
  cardDeck.innerHTML = ""

  divForm.innerHTML = 
  `
  <section class="content-section video-section">
  <div class="pattern-overlay">
    <div class="full-screen-video-wrap"> 
      <video autoplay muted loop id="myVideo"> 
        <source src="prem.mp4" type="video/mp4">
      </video>
    </div> 
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="premierLeagueLogo">
          </div>
          <h1 class="premLeague">Welcome to the</h1>
          <h1 class="premLeagueSecond">Premier League</h1>
          <br><br>
          <button id="loginBtn" style="background-color: #e90052; font-color:white;" class="btn-xl btn-light">Get Started</button>
        </div>
      </div>
    </div>
  </div>
</section>
  `
  const gotologin = document.getElementById("loginBtn")
  gotologin.addEventListener("click", () => {
    login()
  })

}



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

function showUser(user) {

  divForm.innerHTML = `
  <div class="full-screen-video-wrap"> 
    <video autoplay muted loop id="myVideo"> 
        <source src="prem.mp4" type="video/mp4">
    </video>
  </div> 
  <div class="row justify-content-md-center" id="playerCard">
    <div class="col-md-10" position:absolute; left:0; right:0;>
        <div class="card m-b-30">
            <div class="card-header bg-white">
                <h5 class="card-title text-black mb-0">Your Profile</h5>
            </div>
            <div class="user-body text-center">
                <div class="user-information">
                    <div class="user-picture-div">
                        <div class="row">
                            <div class="playerPicture">
                                <img src="${user.country_picture}" class="rounded img-fluid" alt="img">
                            </div>
                        </div>
                    </div>
                    <div class="user-body">
                        <div class="row">
                            <div class="col">
                                <div class="py-3">
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-center">
                                    <img src="${user.user_picture}" alt="user-profile" class="rounded-circle img-fluid">
                                </div>
                            </div>
                            <div class="col">
                                <div class="py-3">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="user-body">
                        <div class="row">
                            <div class="col">
                                <div class="user-name">
                                    <h1 class="my-1 text-black">${user.name}</h5>
                                </div><br>
                                <div class="user-email">
                                    <h5 class="my-1 text-black">${user.email}</p>
                                </div>
                                <div class="user-information">
                                    <h5 class="my-1 text-black">Your Team: ${user.team.name}</p>
                                    <h5 class="my-1 text-black">Your Salary: £${user.salary}</p>
                                    <h5 class="my-1 text-black">Your Nationality: ${user.nationality}</p>
                                    <h5 class="my-1 text-black">Number of Players Managed: ${user.team.players.length}</p>
                                </div><br>
                                <div class="user-profile-buttons">
                                  <button class="btn btn-light" id="getTeam">Go to Team Information</button>
                                  <button class="btn btn-danger" id="logOut">Log Out</button><br>
                                </div><br><br>
                            </div>
                            </div>
                        </div>
                    </div>        
                </div>
          </div>
      </div> 
</div>
  `

  const getTeam = document.getElementById("getTeam")
  const logOut = document.getElementById("logOut")

  getTeam.addEventListener("click", () => [
    getindividualTeam(user)
  ])
  logOut.addEventListener("click", () => {
    homePage()
  })


}

function PopulateWorkoutList() {

  let selectList = document.getElementById("getWorkouts");
  selectList.length = 0;
  
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose a Workout';
  selectList.add(defaultOption);
  
  selectList.selectedIndex = 0;

  fetch("http://localhost:3000/api/v1/workouts")  
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
            option.text = data[i].name
            option.value = data[i].id;
            selectList.add(option)
        }    
        });  
      }  
    )}

function register() {
    cardDeck.innerHTML = ""
    teamDiv.innerHTML = ""
    divForm.innerHTML = 
    `	
      <header class="v-header container"> 
        <div class="full-screen-video-wrap"> 
          <video autoplay muted loop id="myVideo"> 
                <source src="prem.mp4" type="video/mp4">
          </video>
        </div> 
        <div class="header-overlay">
        </div> 
        <div class="header-content"> 
        <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-6 mx-auto">
                <div class="card card-signin flex-row my-5">
                  <div class="card-img-left d-none d-md-flex">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title-register text-center">Register</h5>
                    <form class="form-signin" id="registerForm">
                      <div class="form-label-group">
                        <input type="text" id="name" class="form-control" placeholder="Name" required autofocus>
                        <label for="name">Name</label>
                      </div>
        
                      <div class="form-label-group">
                        <input type="email" id="inputEmail" class="form-control" placeholder="Email Address" required>
                        <label for="inputEmail">Email address</label>
                      </div>

                      <div class="form-label-group">
                        <select id="selectList" class="form-control">
                        </select>
                      </div>
        
                      <div class="form-label-group">
                        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                      </div>
                      
                      <div class="form-label-group">
                        <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Password" required>
                        <label for="inputConfirmPassword">Confirm password</label>
                      </div>

                      <input type="submit" class="btn btn-primary" value="Register">
        
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
    teamDiv.innerHTML = ""
    cardDeck.innerHTML = ""
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
          <h1>Login</h1><br>
          <form method="post" id="loginForm">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="password" type="email" class="form-control" name="email"> 
            </div>
          
            <div class="form-group">
              <label for="password">Password </label>
              <input id="password" type="password" class="form-control" name="password" required data-eye>
            </div>

            <div class="form-group m-0">
              <input type="submit" class="btn btn-primary" value="Log-In">
            <div>
          
            <div class="mt-4 text-center">
            Don't Have an Account?<br><br>
            <button type="button" class="btn btn-danger">Register</button>
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
            let loggedinUser = users.find(user => user.email === form.email.value)
            showUser(loggedinUser)
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
            team_id: event.target[2].value,
            password: event.target[3].value,
          })
      })
      .then(resp => resp.json())
      .then(user => showUser(user))
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
    cardDeck.innerHTML = ""

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
                    <div class="team-div">
                        <div class="team-picture">
                            <div class="row">
                                <div class="stadium-photo">
                                    <img src="${team.stadium_picture}" class="rounded img-fluid" alt="img">
                                </div>
                            </div>
                        </div>
                        <div class="team-information">
                            <div class="row">
                                <div class="col">
                                    <div class="py-3">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="text-center">
                                        <img src="${team.logo}" alt="user-profile" class="rounded-circle img-fluid">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="py-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="row">
                                <div class="col">
                                    <div class="team-name">
                                        <h2 class="my-1 text-black">${team.name}</h5>
                                    </div>
                                    <div class="team-stadium">
                                        <p class="mb-3 text-muted">${team.stadium}</p>
                                    </div>
                                    <div class="team-budget">
                                        <p class="mb-3 text-muted">Team Budget: £${team.team_budget - playerSalary}</p>
                                    </div>

                                    <div class="team-colors">
                                      <p class="text-muted">Primary Kit Color: ${team.primary_color}</p>
                                      <p class="text-muted">Secondary Kit Color: ${team.secondary_color}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="team-information text-center">
                            <div class="row">
                                <div class="col">
                                    <div class="pt-3">
                                        <h5 class="text-black my-1" id="teamWins">${team.wins}</h5>
                                        <p class="mb-0 text-muted">Wins</p>
                                        <button id="incrementWins" class="btn btn-light">+</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="pt-3">
                                        <h5 class="text-black my-1" id="teamDraws">${team.draws}</h5>
                                        <p class="mb-0 text-muted">Draws</p>
                                        <button id="incrementDraws" class="btn btn-light">+</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="pt-3">
                                        <h5 class="text-black my-1" id="teamLosses">${team.losses}</h5>
                                        <p class="mb-0 text-muted">Losses</p>
                                        <button id="incrementLosses" class="btn btn-light">+</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="pt-3">
                                        <h5 class="text-black my-1" id="teamPoints">${team.wins * 3 + team.draws * 1}</h5>
                                        <p class="mb-0 text-muted">Points</p>
                                    </div>
                                </div>
                            </div> 
                            <div class="row-btn">
                              <div class="col-btn">
                                <div class="mx-auto">
                                  <button class="btn btn-light" id="signPlayerBtn">Sign New Player</button>
                                  <button class="btn btn-light" id="checkTeam">Team Roster</button>
                                  <button class="btn btn-light" id="teamFinancesBtn">Check Team Finances</button>
                                  <button class="btn btn-light" id="premStandings">Premier League Standings</button>
                                  <button class="btn btn-light" id="checkSched">Team Schedule</button><br><br>
                                  <button class="btn btn-danger" id="logOutBtn">Log Out</button> 
                                </div>
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
    const teamBtn = document.querySelector("button#checkTeam") 
    const teamFinancesBtn = document.querySelector("button#teamFinancesBtn")
    const premLeague = document.querySelector("button#premStandings")
    const incrWins = document.getElementById("incrementWins")
    const incrDraws = document.getElementById("incrementDraws")
    const incrLosses = document.getElementById("incrementLosses")
    const teamWins = document.getElementById("teamWins")
    const teamDraws = document.getElementById("teamDraws")
    const teamLosses = document.getElementById("teamLosses")
    const teamPoints = document.getElementById("teamPoints")
    const logOut = document.getElementById("logOutBtn")
    const checkTeamSched = document.getElementById("checkSched")

    checkTeamSched.addEventListener("click", () => {
      fetchMatches(team)
    })

    logOut.addEventListener("click", () => {
      homePage()
    })


    incrWins.addEventListener("click", () => {
      return fetch("http://localhost:3000/api/v1/teams/"+team.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          wins: team.wins + 1 
        })
      })
      .then(resp => resp.json())
      .then(updatedTeam => {
        teamWins.innerText = updatedTeam.wins
        teamPoints.innerText = updatedTeam.wins * 3 + updatedTeam.draws
        team = updatedTeam
      })
    })

    incrDraws.addEventListener("click", () => {
      return fetch("http://localhost:3000/api/v1/teams/"+team.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          draws: team.draws + 1 
        })
      })
      .then(resp => resp.json())
      .then(updatedTeam => {
        teamDraws.innerText = updatedTeam.draws
        teamPoints.innerText = updatedTeam.wins * 3 + updatedTeam.draws
        team = updatedTeam
      })
    })

    incrLosses.addEventListener("click", () => {
      return fetch("http://localhost:3000/api/v1/teams/"+team.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          losses: team.losses + 1 
        })
      })
      .then(resp => resp.json())
      .then(updatedTeam => {
        teamLosses.innerText = updatedTeam.losses
        teamPoints.innerText = updatedTeam.wins * 3 + updatedTeam.draws
        team = updatedTeam
      })
    })


    signPlayerBtn.addEventListener("click", () => {
      signPlayer(team)
    })
    teamBtn.addEventListener("click", () => {
      showTeamDetails(team)
    })
    teamFinancesBtn.addEventListener("click", () => {
      seeTeamFinances(team)
    })
    premLeague.addEventListener("click", () => {
      fetchAllTeams()
    })

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
      showPlayerBtn.className = "btn btn-light"
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
      .then(() => cardGroup.remove())
      })
    })  
  }

  function signPlayer(team) {
    playerDetail.innerHTML = ""
    teamDiv.innerHTML = ""
    cardDeck.innerHTML = ""
    divForm.innerHTML = 
    `
    <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Sign Player</h5>
            <form method="post" class="form-signin" id="newPlayer">
              <div class="form-label-group">
                <input type="text" name="playerName" class="form-control" required autofocus>
                <label for="playerName">Player Name</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="player_picture" class="form-control">
                <label for="player_picture">Player Picture</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="position" class="form-control" required>
                <label for="position">Player Position</label>
              </div>

              <div class="form-label-group">
                <select id="selectCoach" class="form-control">
                </select>
              </div>

              <div class="form-label-group">
                <input type="integer" name="playerNumber" class="form-control" required autofocus>
                <label for="playerNumber">Player Number</label>
              </div>

              <div class="form-label-group">
                <input type="float" name="playerSalary" class="form-control" required autofocus>
                <label for="playerSalary">Player Salary</label>
              </div>

              <div class="form-label-group">
                <input type="integer" name="playingTime" class="form-control" required autofocus>
                <label for="playingTime">Playing Time</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="nationality" class="form-control" required autofocus>
                <label for="nationality">Nationality</label>
              </div>

              <div class="form-label-group">
                <input type="text" name="country_picture" class="form-control">
                <label for="country_picture">Flag Picture</label>
              </div>

              <div class="form-label-group">
              <input type="integer" name="age" class="form-control" required autofocus>
                <label for="age">Age</label>             
              </div>

              <hr class="my-4">

              <input class="btn btn-primary" type="submit" value="Submit">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    PopulateCoachDropDownList()
    let form = document.getElementById("newPlayer")
    form.addEventListener("submit", () => {
        event.preventDefault()
        createNewPlayer(team, event)
    })
  }

  function createNewPlayer(team, event) {
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
            team_id: team.id,
            user_id: event.target[3].value,
            number: event.target[4].value,
            salary: event.target[5].value,
            playing_time: event.target[6].value,
            nationality: event.target[7].value,
            country_picture: event.target[8].value,
            age: event.target[9].value,
          })
      })
      .then(resp => resp.json()) 
      .then(player => showPlayerDetails(player))

  }

  function showPlayerDetails(player) {
    divForm.innerHTML = ""
    cardDeck.innerHTML = ""
    
    cardDeck.append(playerDetail)

    const injuryStatus = document.createElement("p")
    if (player.injured === true) {
      injuryStatus.style = "color:red"
      injuryStatus.innerText = "Injury Status: Player is injured!"
    } else {
      injuryStatus.style = "color:green"
      injuryStatus.innerText = "Injury Status: Player is Healthy!"
    }

    const playerInformation = document.createElement("div")
    playerInformation.id = "playerInformation"
    cardDeck.append(playerInformation)

    playerInformation.innerHTML = 
    `<div class="row justify-content-md-center" id="playerCard">
    <div class="col-md-10" position:absolute; left:0; right:0;>
        <div class="card m-b-30">
            <div class="card-header bg-white">
                <h5 class="card-title text-black mb-0">Player Profile</h5>
            </div>
            <div class="card-body">
                <div class="player-body">
                    <div class="player-picture-div">
                        <div class="row">
                            <div class="playerPicture">
                                <img src="${player.country_picture}" class="rounded img-fluid" alt="img">
                            </div>
                        </div>
                    </div>
                    <div class="player-picture">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div class="text-center">
                                    <img src="${player.player_picture}" alt="user-profile" class="rounded-circle img-fluid">
                                </div>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="row">
                            <div class="col">
                                <div class="player-name">
                                    <h1 class="my-1 text-black">${player.name} #${player.number}</h5>
                                </div><br>
                                <div class="player-position">
                                    <h3 class="my-1 text-black">${player.position}</p>
                                </div>
                                <div class="player-salary">
                                  <p class="mb-3 text-muted">Salary: £${player.salary}</p>
                                  <p class="mb-3 text-muted">Nationality: ${player.nationality}</p>
                                  <p class="mb-3 text-muted">Age: ${player.age}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="row">
                            <div class="col">
                                <div class="player-stats">
                                    <h5 class="text-black my-1">${player.appearances}</h5>
                                    <p class="mb-0 text-muted">Appearances</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="pt-3">
                                    <h5 class="text-black my-1">${player.goals}</h5>
                                    <p class="mb-0 text-muted">Goals</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="pt-3">
                                    <h5 class="text-black my-1">${player.assists}</h5>
                                    <p class="mb-0 text-muted">Assists</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="pt-3">
                                    <h5 class="text-black my-1">${player.tackles}</h5>
                                    <p class="mb-0 text-muted">Tackles</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="pt-3">
                                    <h5 class="text-black my-1">${player.playing_time}</h5>
                                    <p class="mb-0 text-muted">Playing Time</p>
                                </div>
                            </div>
                            </div>
                            <div class="row-btn-player">
                              <div class="col-btn-player" id="playerBtns">
                                <div class="mx-auto">
                                  <button class="btn btn-light" id="schedWorkout">Schedule New Workout</button>
                                  <button class="btn btn-light" id="teamRoster">Back to Team Roster</button><br>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                    </div>
    `
    const playerCard = document.getElementById("playerCard")
    
    if (player["workouts"] === undefined) {
      getindividualTeam(player)
    } else {
      let char = player["workouts"]
    
    char.forEach(workout => {

      var a = new Date(`${workout.start_time}`)
      var formattedDate1 = a.toLocaleString()
      
      var b = new Date(`${workout.end_time}`)
      var formattedDate2 = b.toLocaleString()
      
      let workoutDeck = document.createElement("div")
      workoutDeck.className = "card-deck-workouts"
      playerCard.appendChild(workoutDeck)

      let card = document.createElement("div")
      card.className= "card-workout"
      workoutDeck.appendChild(card)

      let br = document.createElement("br")
      card.append(br)
      
      let workoutName = document.createElement("h4")
      workoutName.className = "workout-content-h4"
      workoutName.innerHTML = `${workout.name}` 
      card.appendChild(workoutName)
    

      let wStartTime = document.createElement("p")
      wStartTime.className = "workout-content-p"
      wStartTime.innerHTML = `Start Time: ${formattedDate1}` 
      card.appendChild(wStartTime)

      let wEndTime = document.createElement("p")
      wEndTime.className = "workout-content-p"
      wEndTime.innerHTML = `End Time: ${formattedDate2}`
      card.appendChild(wEndTime)
      
      let workoutDetail = document.createElement("button")
      workoutDetail.innerText = "Workout Detail"
      workoutDetail.className = "workout-detail btn btn-light"
      card.appendChild(workoutDetail)
      workoutDetail.addEventListener("click", () => {
        fetchWorkout(workout)
      })

      let workoutDelete = document.createElement("button")
      workoutDelete.innerText = "Delete Workout"
      workoutDelete.className = "workout-detail btn btn-danger"
      card.appendChild(workoutDelete)
      workoutDelete.addEventListener("click", () => {
        return fetch("http://localhost:3000/api/v1/workouts/"+workout.id, {
          method: "DELETE"
        })
      .then(() => card.remove())
      })

    })

    const playerBtns = document.getElementById("playerBtns")
    const btn = document.createElement("button")
    btn.className = "btn btn-light"
    if (player.injured === true) {
      btn.innerText = "Injured!"
      btn.className = "btn btn-danger"
    } else {
      btn.innerText = "Healthy"
      btn.className = "btn btn-success"
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
          btn.className = "btn btn-danger"
        } else {
          btn.innerText = "Healthy"
          btn.className = "btn btn-success"
        }
      })
    })
    playerBtns.append(btn)

    const schedWorkout = document.getElementById("schedWorkout")
    const backToHomePage = document.getElementById("teamRoster")
    
    schedWorkout.addEventListener("click", () => {
      if (player.injured === true) {
        window.alert("Your player is injured! He cannot train today!")
        showPlayerDetails(player)
      } else {
        newWorkout(player)
      
      }
    })
    backToHomePage.addEventListener("click", () => {
      fetchPlayerTeam(player)
    })
  }
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
    playerDetail.innerHTML = ""
    workoutList.innerHTML = ""
    cardDeck.innerHTML = ""
    cardDeck.innerHTML = 
    `<form method="post" id="newWorkout">
          <label for="workouts">Choose a Workout</label>
          <select name="workouts" id="getWorkouts"><br> 
          </select>
          <input type="submit" value="Submit">
    </form>
    
    <button type="button" class="backToPlayer">Back To Player </button>
    `
    const teamHomePage = document.querySelector("button.teamHomePage")
    const backToPlayer = document.querySelector("button.backToPlayer")
    PopulateWorkoutList()
    backToPlayer.addEventListener("click", () => {
      showPlayerDetails(player)
    })
  
    let form = document.getElementById("newWorkout")

    form.addEventListener("submit", () => {
      event.preventDefault()
      createPlayerWorkout(player, event)
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
    playerDetail.innerHTML = ""
    cardDeck.innerHTML = ""

    cardDeck.append(teamFinances)

    let players = team["players"]
    var playerSalary = players.map(player => player.salary).reduce((acc, salary) => salary + acc)
    

    teamFinances.innerHTML = 
    `<div class=”row”>
        <div class=”col-6 align-self-center”>
            <div class=”card card-block”>
              <div id="parentContainer" style="width: 100%;">
                <div id="chartContainer1" style="float: left; width: 45%; height: 260px;">
                  <h2 class="teamName"> Expenses for 2020 Season</h2><br><br>
                  <canvas id="myChart" width="600" height="600"></canvas><br><br><br>
                </div>
                <div id="chartContainer2" style="float: right; width: 45%; height: 260px;">
                  <h2 class="teamName">Revenue Streams for 2020 Season</h2><br><br>
                  <canvas id="secondChart" width="600" height="600"></canvas><br><br><br>
                </div>
              </div>
            </div>
        </div>
    </div>
    
    `
    let CHART = document.getElementById("myChart").getContext('2d');
    let doughnutChart = new Chart(CHART, {
      type: 'doughnut',
      data: {
        labels: ["Travel Expenses", "Merchandise Costs", "Marketing Expenses", "Employee Expenses", "Player Contracts", "Taxes"],
        datasets: [
          {
            backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9', '#e90052', '#00ff85'],
            data: [team.travel_expenses, team.merchandising_costs, team.marketing_expenses, team.employee_expenses, playerSalary, team.taxes]
          }
        ]
      }, 
      options: {
        responsive: false,
        cutoutPercentage: 0,
        animation: {
          animateScale: true
        }
      }
    })


    const newChart = document.getElementById("secondChart").getContext("2d"); 
    let revenueChart = new Chart(newChart, {
      type: 'doughnut', 
      data: {
        labels: ["Concession Sales", "Sponsorship Value", "Ticket Sales"],
        datasets: [
          {
            backgroundColor: ['#04f5ff', '#e90052', '#00ff85'],
            data: [team.concession_sales, team.sponsorship_value, team.ticket_sales]
          }
        ]
      },
      options: {
        responsive: false,
        cutoutPercentage: 0,
        animation: {
          animateScale: true
        }
      }
    })
  }

  function createPlayerWorkout(player, event) {
 
    fetch("http://localhost:3000/api/v1/player_workouts", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        workout_id: event.target[0].value,
        player_id: player.id
      })   
  })
  .then(resp => resp.json())
}

  function showWorkout(workout) {
    playerDetail.innerHTML = ""
    workoutList.innerHTML = ""
    formDiv.innerHTML = ""
    cardDeck.innerHTML = ""
    var e = new Date(`${workout.start_time}`)
    var date = e.toLocaleDateString()

    var c = new Date(`${workout.start_time}`)
    var startDate = c.toLocaleTimeString()
    
    var d = new Date(`${workout.end_time}`)
    var endDate = d.toLocaleTimeString()
    

    cardDeck.innerHTML = `
    <div class="row justify-content-md-center">
        <div class="card m-b-30">
            <div class="card-header bg-white">
                <h5 class="card-title text-black mb-0">Workout Detail</h5>
            </div>
            <div class="card-body-workout" id="workoutCard">
                <div class="workout-information">
                    <div class="text-center">
                        <div class="row">
                            <div class="col">
                                <div class="workout-name">
                                    <h4 class="my-1 text-black">${workout.name}</h4>
                                </div><br>
                                <div class="workout-dates">
                                    <p class="my-1 text-black">Workout Date: ${date}</p>
                                    <p class="my-1 text-black">Workout Start Time: ${startDate}</p>
                                    <p class="my-1 text-black">Workout End Time: ${endDate}</h4><br>
                                </div><br>
                                <div class="show-exercises" id="showExercises">
                                  <h4>Exercises</h4><br>
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>
            </div>
        </div>
    </div>
    `    
    const showExerciseDiv = document.getElementById("workoutCard")
    let exercises = workout["exercises"]
    exercises.forEach(exercise => {

      let cardGroup = document.createElement("div")
      cardGroup.className = "card-exercise"
      showExerciseDiv.appendChild(cardGroup)

      let cardContent = document.createElement("div")
      cardGroup.append(cardContent)
      
      let br = document.createElement("br")
      cardContent.append(br)
      
      let exerciseType = document.createElement("h5")
      exerciseType.innerHTML = exercise.exercise_type
      cardContent.append(exerciseType)

      let exerciseTitle = document.createElement("h2")
      exerciseTitle.innerHMTL = exercise.name
      cardContent.append(exerciseTitle)

      let exerciseSets = document.createElement("p")
      exerciseSets.innerHTML = `Sets: ${exercise.sets}` 
      cardContent.append(exerciseSets)

      let exerciseReps = document.createElement("p")
      exerciseReps.innerHTML = `Reps: ${exercise.reps}` 
      cardContent.append(exerciseReps)

      let exerciseDuration = document.createElement("p")
      exerciseDuration.innerHTML = `${exercise.duration} seconds`
      cardContent.append(exerciseDuration)

 
    })


  }
  function fetchAllTeams() {
    fetch("http://localhost:3000/api/v1/teams")
    .then(resp => resp.json())
    .then(teams => checkPremierLeagueStandings(teams))

  }
  function checkPremierLeagueStandings(teams) {
    cardDeck.innerHTML = ""
    const ptable = document.createElement("div")
    ptable.className = "ptable"
    cardDeck.append(ptable)

    debugger

    let newTeamData = teams.sort(function(a, b) {
      b.wins - a.wins;
    })

    debugger 

    ptable.innerHTML = `
        <h1 class="headin">Premier League Standings</h1>
                <table id="teamTable">
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
                  <tbody id="tableData">
                  </tbody>
              </table>
      </div>
      `
      const tableBody = document.getElementById("tableData")
      let dataHTML = ''; 

      for(let data of newTeamData) {
        dataHTML += `
          <tr class="wpos"> 
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.wins + data.losses + data.draws}</td>
            <td>${data.wins}</td>
            <td>${data.draws}</td>
            <td>${data.losses}</td>
            <td>${data.goals}</td>
            <td>${data.wins * 3 + data.draws * 1}</td>
          </tr>
        `
        tableBody.innerHTML = dataHTML
      }
  }

  function fetchMatches(team) {
    fetch("http://localhost:3000/api/v1/games")
    .then(resp => resp.json())
    .then(games => {
      let allGames = games.filter(game => game.location === team.stadium)
      showTeamSched(allGames)
    })
  }

  function showTeamSched(allGames) {
    cardDeck.innerHTML = ""
    cardDeck.innerHTML =`
    <div class="row justify-content-md-center" id="gameCard">
    </div>
    `
    const showGameCard = document.getElementById("gameCard")
    allGames.forEach(game => {

      let allGameCard = document.createElement("div")
      allGameCard.className = "card-deck-workouts"
      showGameCard.append(allGameCard)

      let gameCard = document.createElement("div")
      gameCard.className = "card-games"
      allGameCard.append(gameCard)

      let br = document.createElement("br")
      gameCard.append(br)

      let cardTitle = document.createElement("h4")
      cardTitle.className = "games-content-h4"
      cardTitle.innerText = game.location
      gameCard.append(cardTitle)
      
      let gameStartTime = document.createElement("p")
      gameStartTime.className = "games-content-p"
      var startTime = new Date(`${game.start_time}`)
      var gameDate = startTime.toLocaleString()
      gameStartTime.innerHTML = gameDate
      gameCard.append(gameStartTime)

      let teams = game["teams"]
      teams.forEach(team => {

        cardText = document.createElement("h4")
        cardText.className = "card-text"
        gameCard.append(cardText)

        let teamNames = document.createElement("h6")
        teamNames.className = "games-content-h6" 
        teamNames.innerText = `${team.name}`
        gameCard.append(teamNames)

        let br = document.createElement("br")
        gameCard.append(br)
      })

    })

    // let homeTeamGoals = document.createElement('h4')
    // homeTeamGoals.innerText = allGames.home_team_goals

    // let awayTeamGoals = document.createElement('h4') 
    // awayTeamGoals.innerText = allGames.away_team_goals

    // cardText.innerText = `${homeTeamGoals} : ${awayTeamGoals}`



  }



