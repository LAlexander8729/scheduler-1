import { GetSavedSchedule, SaveSchedule, GetCourseList } from "./scheduler-service.js";

const Courselist = await GetCourseList();

var scheduledClasses = [];
var unscheduledClasses = Courselist;

const resetScheduledCourses = () => {
  unscheduledClasses = Courselist;
  scheduledClasses = [];
}

function BuildSemester() {
  var allSemesters = [];
  while (unscheduledClasses.length !== 0) {
    var currentSemester = unscheduledClasses;
    currentSemester = currentSemester.filter((course) => {
      var hasPreReqs = true;
      course.prereqs.forEach((prereq) => {
        if (!scheduledClasses.map((c) => c.id).includes(prereq)) {
          hasPreReqs = false;
        }
      });
      return hasPreReqs;
    });
    scheduledClasses = [...currentSemester];
    unscheduledClasses = unscheduledClasses.filter(
      (course) => !scheduledClasses.includes(course)
    );
    allSemesters.push(scheduledClasses);
  }
  return allSemesters;
}

const GetCourseByID = (idToSearchBy) => {
  return Courselist.filter((course) => course.id === idToSearchBy);
}

const IsCoursePositionValid = (courseID, fullSchedule, semesterNum) => {
  const courseToCheck = GetCourseByID(courseID);
  let errorMessage = "";
  let hasFailed = false;
  let fullListToCheck = [];
  for (let index = 0; index < semesterNum - 2; index++) {
    fullListToCheck = [...fullListToCheck, ...fullSchedule[index]];
  }
  courseToCheck[0].prereqs.forEach((prereq) => {
    if (!fullListToCheck.map((c) => c.id).includes(prereq)) {
      hasFailed = true;
      errorMessage = "The prereqs for this class are not met!";
    }
  })

  if(!hasFailed)
  {
    const semesterToCheck = semesterNum % 2 !== 0 ? "Spring" : "Fall";
    hasFailed = !courseToCheck[0].semestersOffered.includes(semesterToCheck);
    if(hasFailed)
    {
      errorMessage = "This class is not offered in the " + semesterToCheck + "!";
    }
  }
  return [hasFailed, errorMessage];
}

const MoveCourse = (scheduleToChange, courseToMoveID, destinationSemester) => {
  const courseToMove = GetCourseByID(courseToMoveID);
  for (let index = 0; index < scheduleToChange.length; index++) {
    let semesterToChange = scheduleToChange[index];
    scheduleToChange[index] = semesterToChange.filter((course) => course.id !== courseToMoveID);
  }
  scheduleToChange[destinationSemester - 2].push(courseToMove[0]);
  IsCoursePositionValid(courseToMoveID, scheduleToChange, destinationSemester);
  SaveSchedule(scheduleToChange);
  return scheduleToChange;
}

export { BuildSemester, MoveCourse, IsCoursePositionValid, resetScheduledCourses};