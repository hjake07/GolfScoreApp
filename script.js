//should fetch the API
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

  function TotalUp(total, num) {
    return total + num;
  }

  TheYardage.innerHTML += `<th>${totalYards}</th>`
  ThePar.innerHTML += `<th>${totalPar}</th>`
  Handicap.innerHTML += `<th>${totalHCP}`


  document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  TheHoles.innerHTML += `<th>TOTAL</th>`
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

// //============================================================================
// toastr.success(`${playerName}, you are (L)PGA Tour material`)

