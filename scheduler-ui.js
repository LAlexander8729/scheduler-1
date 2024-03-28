import { BuildSemester as BuildSemesters } from "./scheduler-domain.js";

function BuildClasscard(Class) {
  const newCourseCard = document.createElement("article");
  const CourseID = document.createElement("p");
  const CourseTitle = document.createElement("p");
  const CourseCredits = document.createElement("p");
  const CoursePrereqs = document.createElement("p");
  CourseID.classList.add("ClassInfo");
  CourseTitle.classList.add("ClassInfo");

  CourseID.textContent = `Class ID: ${Class.id}`;
  CourseTitle.textContent = `Class Title: ${Class.title}`;
  CourseCredits.textContent = `Class Credits: ${Class.credits}`;
  CoursePrereqs.textContent = `Class Prerequisites:`;

  if (Class.CoursePrereqs && Class.CoursePrereqs.length > 0) {
    CoursePrereqs.textContent += ` ${Class.CoursePrereqs[0]}`;
    for (let i = 1; i < Class.CoursePrereqs.length; i++) {
      CoursePrereqs.textContent += `, ${Class.CoursePrereqs[i]}`;
    }
  } else {
    CoursePrereqs.textContent += " None";
  }

  newCourseCard.append(CourseID);
  newCourseCard.append(CourseTitle);
  newCourseCard.append(CourseCredits);
  newCourseCard.append(CoursePrereqs);
  newCourseCard.setAttribute("id", "Class");
  return newCourseCard;
}

function makeSemesterSchedule() {
  const scheduleRoot = document.getElementById("assigned-classes");
  const semestersToRender = BuildSemesters();
  let semesterNumber = 1;
  semestersToRender.forEach((currentSemester) => {
    const newSemesterDiv = document.createElement("div");
    newSemesterDiv.setAttribute("class", "schedule-column");
    const semesterNum = document.createElement('h2')
    semesterNum.innerText = "Semester " + semesterNumber;
    semesterNumber += 1;
    newSemesterDiv.append(semesterNum);
    currentSemester.forEach((course) => {
        const newCourseCard = document.createElement("div");
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
        
        newSemesterDiv.appendChild(newCourseCard);
        console.log(newSemesterDiv);
    })
    
    scheduleRoot.appendChild(newSemesterDiv);
  })
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

makeSemesterSchedule();
