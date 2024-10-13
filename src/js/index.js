import "../scss/main.scss"; 
import { addProjectToManager, switchActiveProject, addTaskToProject } from "./modules/logic.js";
import { UIProjectCreator, UISwitchProjects, UITaskCreator } from "./modules/UI";
import "./modules/listeners.js";


// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// Add Default Project 
UIProjectCreator("Routine");
addProjectToManager("Routine");

switchActiveProject("Routine");
UISwitchProjects();


// Add Default Tasks to Routine Project

const date = new Date();

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

const brushYourTeethTaskData = {
    title: "Brush Teeth",
    description: "",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "high",
    notes: "",
    checklist: false,
}

addTaskToProject("Routine", brushYourTeethTaskData);
UITaskCreator("Routine", brushYourTeethTaskData);

const goOutsideTaskData = {
    title: "Go outside",
    description: "Touch grass",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "high",
    notes: "Talk to someone, walk by the river",
    checklist: true,
}

addTaskToProject("Routine", goOutsideTaskData);
UITaskCreator("Routine", goOutsideTaskData);


const workoutTaskData = {
    title: "Workout",
    description: "Chest, Shoulders, Triceps",
    ["due date"]: `${year}-${month}-${day}`,
    priority: "mid",
    notes: "bench, dips, push ups, lateral raises",
    checklist: false,
}

addTaskToProject("Routine", workoutTaskData);
UITaskCreator("Routine", workoutTaskData);