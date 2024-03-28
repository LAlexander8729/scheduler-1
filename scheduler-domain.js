const Courselist = [
  {
    id: "CS 1400",
    title: "Programming Fundamentals",
    credits: 3,
    prereqs: [],
  },
  {
    id: "CS 1405",
    title: "Programming Fundamentals Lab",
    credits: 1,
    prereqs: [],
  },
  {
    id: "CS 1430",
    title: "User Experience Design",
    credits: 1,
    prereqs: [],
  },
  {
    id: "CS 1410",
    title: "Object Oriented Programming",
    credits: 3,
    prereqs: ["CS 1400", "CS 1405"],
  },
  {
    id: "CS 1415",
    title: "Object Oriented Programming Lab",
    credits: 1,
    prereqs: ["CS 1400", "CS 1405"],
  },
  {
    id: "CS 1810",
    title: "Intro to Web Development",
    credits: 3,
    prereqs: ["CS 1400", "CS 1405"],
  },
  {
    id: "CS 2700",
    title: "Digital Circuits",
    credits: 3,
    prereqs: ["CS 1400", "CS 1405"],
  },
  {
    id: "CS 2810",
    title: "Computer Organization & Architecture",
    credits: 3,
    prereqs: ["CS 2700"],
  },
  {
    id: "CS 2420",
    title: "Data Structures & Algorithms",
    credits: 3,
    prereqs: ["CS 1410", "CS 2700"],
  },
  {
    id: "CS 2450",
    title: "Intro to Software Engineering",
    credits: 3,
    prereqs: ["CS 2420"],
  },
  {
    id: "CS 2860",
    title: "Operating System Theory",
    credits: 3,
    prereqs: ["CS 2810"],
  },
  {
    id: "SE 3250",
    title: "Survey of Languages",
    credits: 3,
    prereqs: ["CS 2450", "CS 2860"],
  },
  {
    id: "SE 3520",
    title: "Database Theory",
    credits: 3,
    prereqs: ["CS 2450", "CS 2860"],
  },
  {
    id: "SE 3820",
    title: "Back-End Web Development",
    credits: 3,
    prereqs: ["CS 2450", "CS 2860"],
  },
  {
    id: "SE 3140",
    title: "Ethics & PSP",
    credits: 3,
    prereqs: ["SE 3250", "SE 3520", "SE 3820"],
  },
  {
    id: "SE 3630",
    title: "Mobile App Development",
    credits: 3,
    prereqs: ["SE 3250", "SE 3520", "SE 3820"],
  },
  {
    id: "SE 3830",
    title: "Cloud App Development",
    credits: 3,
    prereqs: ["SE 3250", "SE 3520", "SE 3820"],
  },
  {
    id: "SE 3840",
    title: "Telemetry & Operations",
    credits: 3,
    prereqs: ["SE 3250", "SE 3520", "SE 3820"],
  },
  {
    id: "SE 4230",
    title: "Advanced Algorithms",
    credits: 3,
    prereqs: ["SE 3140", "SE 3630", "SE 3830"],
  },
  {
    id: "SE 4270",
    title: "Software Maintenance",
    credits: 3,
    prereqs: ["SE 3140", "SE 3630", "SE 3830"],
  },
  {
    id: "SE 4400",
    title: "Practicum I",
    credits: 3,
    prereqs: ["SE 3140", "SE 3630", "SE 3830"],
  },
  {
    id: "SE 4850",
    title: "Advanced Front-End Development",
    credits: 3,
    prereqs: ["SE 3140", "SE 3630", "SE 3830"],
  },
  {
    id: "SE 4340",
    title: "Secure Coding Practices",
    credits: 3,
    prereqs: ["SE 4230", "SE 4270", "SE 4400"],
  },
  {
    id: "SE 4450",
    title: "Practicum II",
    credits: 3,
    prereqs: ["SE 4230", "SE 4270", "SE 4400"],
  },
  {
    id: "SE 4620",
    title: "Distributed App Development",
    credits: 3,
    prereqs: ["SE 4230", "SE 4270", "SE 4400"],
  },
];

var scheduledClasses = [];
var unscheduledClasses = Courselist;

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

export { BuildSemester };
