// CSS import 
import "../scss/main.scss"; 

// Logic imports

import { addProjectToManager, getTaskManagerControl } from "./modules/logic/TaskManager.js";
import { getActiveProject, switchActiveProject, addTaskToProject } from "./modules/logic/project.js";

// UI imports

import { UIRenderProjects, UISwitchProjects } from "./modules/UI/UIProject.js";
import { UIRenderTasks } from "./modules/UI/UITask.js";

// Listeners import

import "./modules/listeners.js";


// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
///////////////////////////////////
// INITIAL RENDER
///////////////////////////////////

///////////////////////
// Add Default Projects
///////////////////////

const firstProjectName = "Routine";

addProjectToManager(firstProjectName);

const secondProjectName = "Workout";

addProjectToManager(secondProjectName);

const thirdProjectName = "Coding";

addProjectToManager(thirdProjectName);

// Render available projects

UIRenderProjects(getTaskManagerControl().getTaskManager());

// Switch active project to "Routine" project both logically and visually

switchActiveProject(thirdProjectName);
UISwitchProjects(getActiveProject());

///////////////////////////////////////////////

///////////////////////////////////////
// Add Default Tasks to Routine Project
///////////////////////////////////////

// GoOutside task Data

const goOutsideTaskData = {
    title: "Go outside",
    description: "Touch grass",
    ["due date"]: `2024-11-11`,
    priority: "mid",
    notes: "Talk to someone, walk by the river",
    checklist: false,
}

// Add GoOutside Task to Routine Project

addTaskToProject(firstProjectName, goOutsideTaskData);

// School task Data

const schoolTaskData = {
    title: "School",
    description: "",
    ["due date"]: `2024-06-1`,
    priority: "high",
    notes: "",
    checklist: false,
}

// Add BrushYourTeth Task to Routine Project

addTaskToProject(firstProjectName, schoolTaskData);

// Render available tasks of "Routine" Project (update board)

UIRenderTasks(firstProjectName, getTaskManagerControl().getProject(firstProjectName).getTaskProject());

///////////////////////////////////////
// Add Default Tasks to Workout Project
///////////////////////////////////////

// Cardio task Data

const cardioTaskData = {
    title: "Cardio",
    description: "Running, and endurance",
    ["due date"]: `2024-10-28`,
    priority: "low",
    notes: "Heavy bag, 10 minutes high intensity 15 minutes low",
    checklist: false,
}

// Add Cardio Task to Workout Project

addTaskToProject("Workout", cardioTaskData);

// BJJ task Data 

const bjjTaskData = {
    title: "BJJ Training",
    description: "Brazilian jiu-jitsu",
    ["due date"]: `2024-11-08`,
    priority: "mid",
    notes: "",
    checklist: false,
}

// Add BJJ Task to Workout Project

addTaskToProject("Workout", bjjTaskData);

// UFC 308

const ufcTaskData = {
    title: "UFC 308",
    description: "MMA",
    ["due date"]: `2024-10-26`,
    priority: "low",
    notes: "",
    checklist: true,
}

// Add UFC 308 Task to Workout Project

addTaskToProject("Workout", ufcTaskData);

UIRenderTasks(secondProjectName, getTaskManagerControl().getProject(secondProjectName).getTaskProject());


///////////////////////////////////////
// Add Default Tasks to Coding Project
///////////////////////////////////////

// Review SOLID

const solidTaskData = {
    title: "Review SOLID",
    description: "Review SOLID principles",
    ["due date"]: `2024-11-12`,
    priority: "low",
    notes: "",
    checklist: false,
}

// Add SOLID Task to Coding Project

addTaskToProject("Coding", solidTaskData);

// Learn Linting

const lintingTaskData = {
    title: "Learn linting",
    description: "Learn Linting",
    ["due date"]: `2024-11-08`,
    priority: "high",
    notes: "",
    checklist: false,
}

// Add Linting Task to Coding Project

addTaskToProject("Coding", lintingTaskData);

// Code Todo Project 

const todoTaskData = {
    title: "Code ToDo",
    description: "Code ToDo project",
    ["due date"]: `2024-09-27`,
    priority: "mid",
    notes: "",
    checklist: true,
}

// Add Code Todo Project Task to Coding Project

addTaskToProject("Coding", todoTaskData);

UIRenderTasks(thirdProjectName, getTaskManagerControl().getProject(thirdProjectName).getTaskProject());