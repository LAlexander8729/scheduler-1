import { BuildSemester as BuildSemesters, IsCoursePositionValid, MoveCourse} from "./scheduler-domain.js";

let currentSchedule = [];

function BasicScheduleSetup() {
  currentSchedule = BuildSemesters();
  makeSemesterSchedule(currentSchedule);
}

function makeSemesterSchedule(scheduleToFormat) {
  const scheduleRoot = document.getElementById("assigned-classes");
  const semestersToRender = scheduleToFormat;
  let semesterNumber = 1;
  semestersToRender.forEach((currentSemester) => {

    
    //Add Header To Columns
    const newSemesterDiv = document.createElement("div");
    newSemesterDiv.setAttribute("class", "schedule-column");
    const semesterNum = document.createElement('h2');
    let semesterSeason = semesterNumber % 2 !== 0 ? "Spring" : "Fall";
    semesterNum.innerText = "Semester " + semesterNumber + " - " + semesterSeason;
    semesterNumber += 1;

    //Add Draggable Logic To Semester
    newSemesterDiv.append(semesterNum);
    newSemesterDiv.setAttribute("id", "semester-" + semesterNumber)
    newSemesterDiv.addEventListener("drop", (event) =>  {
      currentSchedule = MoveCourse(currentSchedule, event.dataTransfer.getData("text/plain"), newSemesterDiv.getAttribute("id").split("-")[1]);
      ClearOutSchedule();
      makeSemesterSchedule(currentSchedule);
    });
    newSemesterDiv.addEventListener("dragenter", (event) =>  {
      event.preventDefault();
    })
    newSemesterDiv.addEventListener("dragover", (event) =>  {
      event.preventDefault();
    })
    currentSemester.forEach((course) => {
        //Card Draggable Logic
        const newCourseCard = document.createElement("div");
        newCourseCard.draggable = true;

        newCourseCard.addEventListener("dragstart", (event) => 
        {
          event.dataTransfer.setData("text/plain", course.id);
          console.log(event.dataTransfer);
        })
        newCourseCard.setAttribute("class", "schedule-card")
      

        const courseCardTitle = document.createElement("p");
        courseCardTitle.innerText = course.title;
        courseCardTitle.setAttribute("class", "card-title");

        const courseCardID = document.createElement("p");
        courseCardID.innerText = course.id;
        courseCardID.setAttribute("class", "card-id");

        newCourseCard.appendChild(courseCardTitle);
        newCourseCard.appendChild(courseCardID);

        const prereqList = document.createElement("ul");
        prereqList.setAttribute("class", "prereqs-list")

        if(course.prereqs.length !== 0)
        {
            newCourseCard.appendChild(prereqList);
            
        course.prereqs.forEach((prereq) => {
            const newListItem = document.createElement("li");
            newListItem.setAttribute("class", "prereq")
            newListItem.textContent = prereq;
            prereqList.appendChild(newListItem);
        })
        }

        const isClassPositionValid = IsCoursePositionValid(course.id, currentSchedule, semesterNumber);
        if(isClassPositionValid[0])
        {
          newCourseCard.classList.add("cardDiv-error");
          const errorMessage = document.createElement("p");
          errorMessage.innerText = isClassPositionValid[1];
          newCourseCard.appendChild(errorMessage);
        }
        
        newSemesterDiv.appendChild(newCourseCard);
    })
    
    scheduleRoot.appendChild(newSemesterDiv);
  })
}

const ClearOutSchedule = () => {
  const scheduleRoot = document.getElementById("assigned-classes");
  const numberOfChildren = scheduleRoot.children.length;
  for (let index = 0; index < numberOfChildren; index++) {
    scheduleRoot.removeChild(scheduleRoot.children[0]);
  }
}

function UnassignedClasslistDisplay() {
  const UnassignedDisplay = document.getElementById("UnassignedClasslist");
  const Classlist = GetClasslist();
  console.log(Classlist);
  Classlist.forEach((course) => {
    const CourseCard = document.createElement("article");
    CourseCard.append(BuildClasscard(course));
    UnassignedDisplay.append(CourseCard);
  });
}

BasicScheduleSetup();