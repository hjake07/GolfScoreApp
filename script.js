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
  const teeBoxes = course.holes.map(holeItem => holeItem.teeBoxes[0])
  let TheHoles = document.getElementById('holes')
  let TheYardage = document.getElementById('yardage')
  let ThePar = document.getElementById("par")
  let Handicap = document.getElementById("handicap")
  let champion = document.getElementById('champion');
  let men = document.getElementById('men');
  let women = document.getElementById('women')
  champion.innerHTML = '';
  men.innerHTML = '';
  women.innerHTML = '';
  let teeBoxSelectHtml = ''
  TheHoles.innerHTML = "";
  TheYardage.innerHTML = "";
  ThePar.innerHTML = "";
  Handicap.innerHTML = "";
  TheHoles.innerHTML += `<th id="holeTh">Holes</th>` ;
  TheYardage.innerHTML += `<th id="yardTh">Yards</th>` ;
  ThePar.innerHTML += `<th id="parTh">Par</th>`;
  Handicap.innerHTML += `<th id="handicapTh">Handicap</th>`;
  let count = 0;
  let totalYardsArray = [];
  let totalParArray = [];
  let totalHandicapArray = [];
  let image = document.getElementById('imageSection')
  image.innerHTML = `<img src=${course.thumbnail}>`
 course.holes.forEach(function(holes, index){
  TheHoles.innerHTML += `<td>${course.holes[count].hole}</td>`
  count++;
if(champion.checked){
  console.log(holes.teeBoxes[1].yards,holes.teeBoxes[1].par,holes.teeBoxes[1].hcp)
  TheYardage.innerHTML = ''
  ThePar.innerHTML = ''
  Handicap.innerHTML = ''
  TheYardage.innerHTML += `<th id="yardTh">Yards</th>`
  ThePar.innerHTML += `<th id="parTh">Par</th>`
  Handicap.innerHTML += `<th id="handicapTh">Handicap</th>`
  TheYardage.innerHTML += `<td>${holes.teeBoxes[1].yards}</td>`
  ThePar.innerHTML += `<td>${holes.teeBoxes[1].par}</td>`
  Handicap.innerHTML += `<td>${holes.teeBoxes[1].hcp}</td>`
}
else if(men.checked){
  TheYardage.innerHTML = ''
  ThePar.innerHTML = ''
  Handicap.innerHTML = ''
  TheYardage.innerHTML += `<th id="yardTh">Yards</th>`
  ThePar.innerHTML += `<th id="parTh">Par</th>`
  Handicap.innerHTML += `<th id="handicapTh">Handicap</th>`
  TheYardage.innerHTML += `<td>${holes.teeBoxes[2].yards}</td>`
  ThePar.innerHTML += `<td>${holes.teeBoxes[2].par}</td>`
  Handicap.innerHTML += `<td>${holes.teeBoxes[2].hcp}</td>`
}
else if(women.checked){
  TheYardage.innerHTML = ''
  ThePar.innerHTML = ''
  Handicap.innerHTML = ''
  TheYardage.innerHTML += `<th id="yardTh">Yards</th>`
  ThePar.innerHTML += `<th id="parTh">Par</th>`
  Handicap.innerHTML += `<th id="handicapTh">Handicap</th>`
  TheYardage.innerHTML += `<td>${holes.teeBoxes[3].yards}</td>`
  ThePar.innerHTML += `<td>${holes.teeBoxes[3].par}</td>`
  Handicap.innerHTML += `<td>${holes.teeBoxes[3].hcp}</td>`
}
else if(teeBoxSelectHtml.checked){
  TheYardage.innerHTML = ''
  ThePar.innerHTML = ''
  Handicap.innerHTML = ''
  TheYardage.innerHTML += `<th id="yardTh">Yards</th>`
  ThePar.innerHTML += `<th id="parTh">Par</th>`
  Handicap.innerHTML += `<th id="handicapTh">Handicap</th>`
  TheYardage.innerHTML += `<td>${holes.teeBoxes[0].yards}</td>`
  ThePar.innerHTML += `<td>${holes.teeBoxes[0].par}</td>`
  Handicap.innerHTML += `<td>${holes.teeBoxes[0].hcp}</td>`
}
else {
  console.log('error')
}
 })
  teeBoxes.forEach(function (teeBox, index) {

   

  TheYardage.innerHTML += `<td>${teeBox.yards}</td>`
  ThePar.innerHTML += `<td>${teeBox.par}</td>`
  Handicap.innerHTML += `<td>${teeBox.hcp}</td>`
  totalYardsArray.push(teeBox.yards)
  totalParArray.push(teeBox.par)
  totalHandicapArray.push(teeBox.hcp)
 
 
 
  
  });

  let totalYards = totalYardsArray.reduce(TotalUp)
  let totalPar = totalParArray.reduce(TotalUp);

 

  TheYardage.innerHTML += `<th id="totals">${totalYards}</th>`
  ThePar.innerHTML += `<th id="totals">${totalPar}</th>`

  document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  TheHoles.innerHTML += `<th id="totals">TOTAL</th>`
  function nines(){
    let out = document.createElement('th');
    out.setAttribute('id', 'out')
    out.innerHTML = 'OUT'
    TheHoles.insertBefore(out, TheHoles.childNodes[10])
    //--------------------------------------------------
    let In = document.createElement('th');
    In.setAttribute('id', 'In');
    In.innerHTML = 'IN';
    TheHoles.insertBefore(In, TheHoles.childNodes[20])
    //--------------------------------------------------
    let outYardage = document.createElement('th');
    outYardage.setAttribute('id', 'outYardage');
    let yardDummyArray = totalYardsArray.slice(0, 9)
    let outYardageTotal = yardDummyArray.reduce(TotalUp)
    outYardage.innerHTML = outYardageTotal;
    TheYardage.insertBefore(outYardage, TheYardage.childNodes[10])
    //---------------------------------------------------
    let inYardage = document.createElement('th');
    inYardage.setAttribute('id', 'inYardage');
    let yardInArray = totalYardsArray.slice(9);
    let inYardageTotal = yardInArray.reduce(TotalUp);
    inYardage.innerHTML = inYardageTotal;
    TheYardage.insertBefore(inYardage, TheYardage.childNodes[20])
    //---------------------------------------------------
    let outPar = document.createElement('th');
    outPar.setAttribute('id', 'outPar');
    let parDummyArray = totalParArray.slice(0, 9);
    let outParTotal = parDummyArray.reduce(TotalUp);
    outPar.innerHTML = outParTotal;
    ThePar.insertBefore(outPar, ThePar.childNodes[10])
    //---------------------------------------------------
    let inPar = document.createElement('th');
    inPar.setAttribute('id', 'inPar');
    let inParArray = totalParArray.slice(9);
    let inParTotal = inParArray.reduce(TotalUp);
    inPar.innerHTML = inParTotal;
    ThePar.insertBefore(inPar, ThePar.childNodes[20])
    //---------------------------------------------------
    let outHandicap = document.createElement('th');
    outHandicap.setAttribute('id', 'outHandicap')
    Handicap.insertBefore(outHandicap, Handicap.childNodes[10])
    //---------------------------------------------------
    Handicap.innerHTMl += `<th id="inHandicap"></th>`
    Handicap.innerHTML += `<th id="totalHandicap"></th>`
  }
  nines();
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

 function addList() {
  let text = document.getElementById('new-list-name-input')
  let table = document.getElementById('tableSection');
  table.innerHTML += `<tr id="player1row"><th id="totals">${text.value}</th></tr>`
  var Player2 = new Player(text.value, 1,)
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
  let Player3 = new Player(text.value, 2,)
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
  let Player4 = new Player(text.value, 3,)
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
  let Player5 = new Player(text.value, 4,)
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
  document.getElementById('player4row').innerHTML += `<td>${score.value}</td>`
  p4Array.push(Number(score.value))
  let p4row = document.getElementById('player4row')
  if(p4row.childElementCount == 10){
    let playerOut = document.createElement('th');
    playerOut.setAttribute('id', 'playerOut');
    let playerOutArray = p4Array.slice(0, 9);
    let pOutArrayTotal = playerOutArray.reduce(TotalUp);
    playerOut.innerHTML = pOutArrayTotal;
    p4row.insertBefore(playerOut, p4row.childNodes[10])
  }
  else if(p4row.childElementCount == 20) {
    for(let i = 0; i < p4Array.length; i++){
      p4ArrayNum.push(Number(p4Array[i]))
    }
    let p4Total = p4ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    // newLocation.innerHTML +=
    // `<div id="inputSection">
    // <input id="new-list-name-input" placeholder="Player Name">
    // <button class="btn btn-primary" onclick="addList4()">New List</button>
    //  </div>`
  document.getElementById('player4row').innerHTML += `<th id="totals">${p4Total}</th>`
  //------------------------------------------------------------------------------------
  let playerIn = document.createElement('th');
  playerIn.setAttribute('id', 'playerIn');
  let playerInArray = p4Array.slice(9);
  let pInArrayTotal = playerInArray.reduce(TotalUp);
  playerIn.innerHTML = pInArrayTotal;
  p4row.insertBefore(playerIn, p4row.childNodes[20])
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
  document.getElementById('player3row').innerHTML += `<td>${score.value}</td>`
  p3Array.push(Number(score.value))
  let p3row = document.getElementById('player3row')
  if(p3row.childElementCount == 10){
    let playerOut = document.createElement('th');
    playerOut.setAttribute('id', 'playerOut');
    let playerOutArray = p3Array.slice(0, 9);
    let pOutArrayTotal = playerOutArray.reduce(TotalUp);
    playerOut.innerHTML = pOutArrayTotal;
    p3row.insertBefore(playerOut, p3row.childNodes[10])
  }
  else if(p3row.childElementCount == 20) {
    for(let i = 0; i < p3Array.length; i++){
      p3ArrayNum.push(Number(p3Array[i]))
    }
    let p3Total = p3ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList4()">New Player</button>
     </div>`
  document.getElementById('player3row').innerHTML += `<th id="totals">${p3Total}</th>`
  //--------------------------------------------------------------------------------
    let playerIn = document.createElement('th');
    playerIn.setAttribute('id', 'playerIn');
    let playerInArray = p3Array.slice(9);
    let pInArrayTotal = playerInArray.reduce(TotalUp);
    playerIn.innerHTML = pInArrayTotal;
    p3row.insertBefore(playerIn, p3row.childNodes[20])

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
  document.getElementById('player2row').innerHTML += `<td>${score.value}</td>`
  p2Array.push(Number(score.value))
  let p2row = document.getElementById('player2row')
  if(p2row.childElementCount == 10){
    let playerOut = document.createElement('th');
    playerOut.setAttribute('id', 'playerOut');
    let playerOutArray = p2Array.slice(0, 9);
    let pOutArrayTotal = playerOutArray.reduce(TotalUp);
    playerOut.innerHTML = pOutArrayTotal;
    p2row.insertBefore(playerOut, p2row.childNodes[10])
  }
  else if(p2row.childElementCount == 20) {
    for(let i = 0; i < p2Array.length; i++){
      p2ArrayNum.push(Number(p2Array[i]))
    }
    let p2Total = p2ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList3()">New Player</button>
     </div>`
  document.getElementById('player2row').innerHTML += `<th id="totals">${p2Total}</th>`
  //-----------------------------------------------------------------------------------
  let playerIn = document.createElement('th');
  playerIn.setAttribute('id', 'playerIn');
  let playerInArray = p2Array.slice(9);
  let pInArrayTotal = playerInArray.reduce(TotalUp);
  playerIn.innerHTML = pInArrayTotal;
  p2row.insertBefore(playerIn, p2row.childNodes[20])

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
  document.getElementById('player1row').innerHTML += `<td>${score.value}</td>`
  p1Array.push(Number(score.value))
  let p1row = document.getElementById('player1row')
    if(p1row.childElementCount == 10){
      let playerOut = document.createElement('th');
      playerOut.setAttribute('id', 'playerOut');
      let playerOutArray = p1Array.slice(0, 9);
      let pOutArrayTotal = playerOutArray.reduce(TotalUp);
      playerOut.innerHTML = pOutArrayTotal;
      p1row.insertBefore(playerOut, p1row.childNodes[10])
    }
    else if(p1row.childElementCount == 20) {
    for(let i = 0; i < p1Array.length; i++){
      p1ArrayNum.push(p1Array[i])
    }
    let p1Total = p1ArrayNum.reduce(TotalUp)
    document.getElementById('button').remove();
    document.getElementById('scores').parentNode.remove();
    newLocation.innerHTML +=
    `<div id="inputSection">
    <input id="new-list-name-input" placeholder="Player Name">
    <button class="btn btn-primary" onclick="addList2()">New Player</button>
     </div>`
  document.getElementById('player1row').innerHTML += `<th id="totals">${p1Total}</th>`
  //---------------------------------------------------------------------------------
      let playerIn = document.createElement('th');
      playerIn.setAttribute('id', 'playerIn');
      let playerInArray = p1Array.slice(9);
      let pInArrayTotal = playerInArray.reduce(TotalUp);
      playerIn.innerHTML = pInArrayTotal;
      p1row.insertBefore(playerIn, p1row.childNodes[20])
  }
 
 

}
  // //============================================================================
// toastr.success(`${playerName}, you are (L)PGA Tour material`)

