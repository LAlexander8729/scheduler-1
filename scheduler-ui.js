import {
    BuildSemester,
    GetPastClasses,
    ArePrerecsMet,
    AddtoPastClasses,
    GetClasslist,
  } from "./Domain.js";
  
  function formSchedule(Classes) {}
  
  function printSchedule(Classes) {}
  
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
    const thisSemester = BuildSemester();
    const newSemesterCard = document.createElement("section");
      thisSemester.classList.add("Semester");
    thisSemester.forEach((Class) => {
      AddtoPastClasses(Class);
      newSemesterCard.append(BuildClasscard(Class));
    });
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
  
  UnassignedClasslistDisplay(GetClasslist());
  
  makeSemesterSchedule();
  