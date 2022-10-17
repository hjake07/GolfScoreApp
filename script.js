//should fetch the API
 function TotalUp(total, num) {
    return total + num;
  }
async function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses')
    .then(response => response.json()).then(data => data.courses)
}

async function getCourse(id) {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
    .then(response => response.json())
    .then(data => data.data)
}


async function renderAvailableCourses() {
  const courses = await getAvailableCourses()
  renderGolfCourseNames(courses)


}

async function renderCourse(id) {
  const course = await getCourse(id);
  console.log(course.holes)
  const teeBoxes = course.holes.map(holeItem => holeItem.teeBoxes[0])
  let TheHoles = document.getElementById('holes')
  let TheYardage = document.getElementById('yardage')
  let ThePar = document.getElementById("par")
  let Handicap = document.getElementById("handicap")
  let teeBoxSelectHtml = ''
  let count = 0;
  let totalYardsArray = [];
  let totalParArray = [];
  let totalHandicapArray = [];
  
 course.holes.forEach(function(holes){
  TheHoles.innerHTML += `<td>${course.holes[count].hole}</td>`
  count = count + 1;

 })
  teeBoxes.forEach(function (teeBox, index) {
  teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.yards} yards</option>`
  TheYardage.innerHTML += `<td>${teeBox.yards}</td>`
  ThePar.innerHTML += `<td>${teeBox.par}</td>`
  Handicap.innerHTML += `<td>${teeBox.hcp}</td>`
  totalYardsArray.push(teeBox.yards)
  totalParArray.push(teeBox.par)
  totalHandicapArray.push(teeBox.hcp)
  });

  let totalYards = totalYardsArray.reduce(TotalUp)
  let totalPar = totalParArray.reduce(TotalUp);
  let totalHCP = totalHandicapArray.reduce(TotalUp);

 

  TheYardage.innerHTML += `<th id="totals">${totalYards}</th>`
  ThePar.innerHTML += `<th id="totals">${totalPar}</th>`
  Handicap.innerHTML += `<th id="totals">${totalHCP}`


  document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  TheHoles.innerHTML += `<th id="totals">TOTAL</th>`
}

function updateCourseSelected() {
  const selectElement = document.querySelector('#course-select');
  const id = selectElement.value;

  renderCourse(id)
}


async function initialLoad() {
  await renderAvailableCourses();


}
//==============================================================================

function renderGolfCourseNames(courses) {
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
  });
  document.getElementById('course-select').innerHTML = courseOptionsHtml;
}
initialLoad();
class Player {
  constructor(name, id = getNextId(), scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}
function getNextId() {
  console.log('empty')
}
 function addList() {
  console.log('test1')
  let text = document.getElementById('new-list-name-input')
  let table = document.getElementById('tableSection');
  table.innerHTML += `<tr id="player1row"><th id="totals">${text.value}</th></tr>`
  let Player2 = new Player(text.value, 1,)
  console.log(Player2.name)
  text.parentElement.remove();
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','buttonClicked()')
  button.innerHTML += "+"
  table.append(button)
}
function addList2(){
  let text = document.getElementById('new-list-name-input')
  let table = document.getElementById('tableSection');
  table.innerHTML += `<tr id="player2row"><th id="totals">${text.value}</th></tr>`
  let Player3 = new Player(text.value, 1,)
  console.log(Player3.name)
  text.parentElement.remove();
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','buttonClicked2()')
  button.innerHTML += "+"
  table.append(button)
}
function addList3(){
  let text = document.getElementById('new-list-name-input')
  let table = document.getElementById('tableSection');
  table.innerHTML += `<tr id="player3row"><th id="totals">${text.value}</th></tr>`
  let Player4 = new Player(text.value, 1,)
  console.log(Player4.name)
  text.parentElement.remove();
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','buttonClicked3()')
  button.innerHTML += "+"
  table.append(button)
}
function addList4(){
  let text = document.getElementById('new-list-name-input')
  let table = document.getElementById('tableSection');
  table.innerHTML += `<tr id="player4row"><th id="totals">${text.value}</th></tr>`
  let Player5 = new Player(text.value, 1,)
  console.log(Player5.name)
  text.parentElement.remove();
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','buttonClicked4()')
  button.innerHTML += "+"
  table.append(button)
}
function buttonClicked4(){
  let table = document.getElementById('tableSection')
  document.getElementById('button').remove();
  table.innerHTML += `<td><input id = "scores" type="text" placeholder="Score"></td>`
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','postScore4()')
  button.innerHTML += "+"
  table.append(button)
}
let p4Array = [];
let p4ArrayNum = [];
function postScore4(){
  let newLocation = document.getElementById('emptyDiv')
  let score = document.getElementById('scores')
  document.getElementById('player4row').innerHTML += `<td>${scores.value}</td>`
  p4Array.push(scores.value)
  let p4row = document.getElementById('player4row')
  if(p4row.childElementCount == 19) {
    for(let i = 0; i < p4Array.length; i++){
      p4ArrayNum.push(Number(p4Array[i]))
    }
    console.log(p4ArrayNum)
    let p4Total = p4ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    // newLocation.innerHTML +=
    // `<div id="inputSection">
    // <input id="new-list-name-input" placeholder="Player Name">
    // <button class="btn btn-primary" onclick="addList4()">New List</button>
    //  </div>`
  document.getElementById('player4row').innerHTML += `<th id="totals">${p4Total}</th>`

  }}
function buttonClicked3(){
  let table = document.getElementById('tableSection')
  document.getElementById('button').remove();
  table.innerHTML += `<td><input id = "scores" type="text" placeholder="Score"></td>`
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','postScore3()')
  button.innerHTML += "+"
  table.append(button)
}
let p3Array = [];
let p3ArrayNum = [];
function postScore3(){
  let newLocation = document.getElementById('emptyDiv')
  let score = document.getElementById('scores')
  document.getElementById('player3row').innerHTML += `<td>${scores.value}</td>`
  p3Array.push(scores.value)
  let p3row = document.getElementById('player3row')
  if(p3row.childElementCount == 19) {
    for(let i = 0; i < p3Array.length; i++){
      p3ArrayNum.push(Number(p3Array[i]))
    }
    console.log(p3ArrayNum)
    let p3Total = p3ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList4()">New List</button>
     </div>`
  document.getElementById('player3row').innerHTML += `<th id="totals">${p3Total}</th>`

  }
}
function buttonClicked2(){
  let table = document.getElementById('tableSection')
  document.getElementById('button').remove();
  table.innerHTML += `<td><input id = "scores" type="text" placeholder="Score"></td>`
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','postScore2()')
  button.innerHTML += "+"
  table.append(button)
}
let p2Array = [];
let p2ArrayNum = [];
function postScore2(){
  let newLocation = document.getElementById('emptyDiv')
  let score = document.getElementById('scores')
  document.getElementById('player2row').innerHTML += `<td>${scores.value}</td>`
  p2Array.push(scores.value)
  let p2row = document.getElementById('player2row')
  if(p2row.childElementCount == 19) {
    for(let i = 0; i < p2Array.length; i++){
      p2ArrayNum.push(Number(p2Array[i]))
    }
    console.log(p2ArrayNum)
    let p2Total = p2ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList3()">New List</button>
     </div>`
  document.getElementById('player2row').innerHTML += `<th id="totals">${p2Total}</th>`

  }
}
function buttonClicked(){
  let table = document.getElementById('tableSection')
  document.getElementById('button').remove();
  table.innerHTML += `<td><input id = "scores" type="text" placeholder="Score"></td>`
  let button = document.createElement('button');
  button.setAttribute('id','button')
  button.setAttribute('onclick','postScore()')
  button.innerHTML += "+"
  table.append(button)
 
}
let p1Array = [];
let p1ArrayNum = []
function postScore(){
  let newLocation = document.getElementById('emptyDiv')
  let score = document.getElementById('scores')
  document.getElementById('player1row').innerHTML += `<td>${scores.value}</td>`
  p1Array.push(scores.value)
  let p1row = document.getElementById('player1row')
  if(p1row.childElementCount == 19) {
    for(let i = 0; i < p1Array.length; i++){
      p1ArrayNum.push(Number(p1Array[i]))
    }
    console.log(p1ArrayNum)
    let p1Total = p1ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList2()">New List</button>
     </div>`
  document.getElementById('player1row').innerHTML += `<th id="totals">${p1Total}</th>`

  }
}

  // //============================================================================
// toastr.success(`${playerName}, you are (L)PGA Tour material`)

