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

// Add Default Project 
addProjectToManager("Routine");

// Render available projects

UIRenderProjects(getTaskManagerControl().getTaskManager());

// Switch active project to "Routine" project both logically and visually

switchActiveProject("Routine");
UISwitchProjects(getActiveProject());


// Add Default Tasks to Routine Project

const date = new Date();

// DAY
const day = date.getDate();

// MONTH
// date.getMonth will return numbers like (1, 5, 10, 11). We need 2 decimals like (01, 05, 10, 11) 

const returnedMonth = String(date.getMonth());

const monthArray = Array.from(returnedMonth);

if( monthArray.length < 2 ) {
    monthArray.unshift("0");
} 

const month = monthArray.join("");

// YEAR
const year = date.getFullYear();

// GoOutside task Data

const goOutsideTaskData = {
    title: "Go outside",
    description: "Touch grass",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "mid",
    notes: "Talk to someone, walk by the river",
    checklist: false,
}

// Add GoOutside Task to Routine Project

addTaskToProject("Routine", goOutsideTaskData);

// Render available tasks of "Routine" Project (update board)

UIRenderTasks("Routine", getActiveProject().getTaskProject());


// BrushYourTeth task Data

const brushYourTeethTaskData = {
    title: "Brush Teeth",
    description: "",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "high",
    notes: "",
    checklist: true,
}

// Add BrushYourTeth Task to Routine Project

addTaskToProject("Routine", brushYourTeethTaskData);

// Render available tasks of "Routine" Project (update board)

UIRenderTasks("Routine", getActiveProject().getTaskProject());


// Workout task Data

const workoutTaskData = {
    title: "Workout",
    description: "Chest, Shoulders, Triceps",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "low",
    notes: "bench, dips, push ups, lateral raises",
    checklist: false,
}

// Add Workout Task to Routine Project

addTaskToProject("Routine", workoutTaskData);

// Render available tasks of "Routine" Project (update board)

UIRenderTasks("Routine", getActiveProject().getTaskProject());