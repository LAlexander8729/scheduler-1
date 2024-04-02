async function GetCourseList() {
    const apireturn = await fetch("https://raw.githubusercontent.com/alexmickelson/1810-scheduler-data/main/courses.json");
    const jsonedCourses = await apireturn.json()
    return jsonedCourses;
}

const GetSavedSchedule = () => {
    const retrievedValue = localStorage.getItem("savedSchedule");
    if(retrievedValue !== null)
        return JSON.parse(retrievedValue);
    else
        return "There is no schedule saved!";
}

const SaveSchedule = (scheduleToSave) => {
    localStorage.setItem("savedSchedule", JSON.stringify(scheduleToSave));
}

const ClearSavedSchedule = () => {
    localStorage.clear();
}

export { GetSavedSchedule, SaveSchedule, ClearSavedSchedule, GetCourseList }