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
  const teeBoxes = course.holes.map(holeItem => holeItem.teeBoxes[0])
  console.log(course)
  let teeBoxSelectHtml = ''
  course.holes.forEach(function(holeItem) {
    teeBoxes.forEach(function (teeBox, index) {
      teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.yards
        } yards</option>`
    });

    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  })

  

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
function addLlist(){

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