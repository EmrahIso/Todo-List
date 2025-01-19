import {
  getTaskManagerControl,
  addProjectToManager,
} from "./logic/TaskManager";

import {
  addTaskToProject,
  getActiveProject,
  switchActiveProject,
} from "./logic/project";

import { UIRenderProjects, UISwitchProjects } from "./UI/UIProject";
import { UIRenderTasks } from "./UI/UITask";

// If we are in development mode I don't want localStorage
if (process.env.NODE_ENV !== "production") {
  console.log("----------------------");
  localStorage.clear();
  console.log("Cleared localStorage");
  console.log("----------------------");
}

// Storage Object Control

export function updateStorage() {
  const storageObject = {};

  for (let key in localStorage)
    if (key !== "activeProject")
      storageObject[key] = localStorage.getItem(`--tdl-${key}`);

  // Fill up storageObject with new data

  for (let projectKey in storageObject)
    localStorage.removeItem(`--tdl-${projectKey}`);

  const taskManager = getTaskManagerControl().getTaskManager();

  Object.values(taskManager).forEach((project) => {
    storageObject[project.name] = project;

    const projectTasksObj = storageObject[project.name].getTaskProject();

    storageObject[project.name] = { name: project.name };

    Object.values(projectTasksObj).forEach((task) => {
      storageObject[project.name][task.taskObj.title] = {
        taskObj: task.taskObj,
      };
    });

    localStorage.setItem(
      `--tdl-${project.name}`,
      JSON.stringify(storageObject[project.name])
    );
  });
}

function renderStorage() {
  const allProjects = {};

  // Render Projects

  Object.keys(localStorage).forEach((projectName) => {
    const newProjectName = projectName.split("").slice(6).join("");
    allProjects[newProjectName] = { name: newProjectName };
    if (projectName !== "activeProject") addProjectToManager(newProjectName);
  });

  delete allProjects["activeProject"];

  UIRenderProjects(allProjects);

  // Render Tasks

  Object.values(allProjects).forEach((project) => {
    const projectTasksJSON = localStorage.getItem(`--tdl-${project.name}`);

    const projectTasksObj = JSON.parse(projectTasksJSON);

    delete projectTasksObj["name"];

    UIRenderTasks(project.name, projectTasksObj);

    Object.values(projectTasksObj).forEach((task) => {
      addTaskToProject(project.name, task.taskObj);
    });
  });
}

///////////////////
// Default Projects
///////////////////

const routineProject = { name: "Routine" };

const workoutProject = { name: "Workout" };

const codingProject = { name: "Coding" };

// Default Tasks

///////////////////////////////////////
// Default Tasks for Routine Project
///////////////////////////////////////

// GoOutside task Data

const goOutsideTaskData = {
  title: "Go outside",
  description: "Touch grass",
  ["due date"]: `2024-11-11`,
  priority: "mid",
  notes: "Talk to someone, walk by the river",
  checklist: false,
};

routineProject[goOutsideTaskData.title] = { taskObj: goOutsideTaskData };

// School task Data

const schoolTaskData = {
  title: "School",
  description: "",
  ["due date"]: `2024-06-1`,
  priority: "high",
  notes: "",
  checklist: false,
};

routineProject[schoolTaskData.title] = { taskObj: schoolTaskData };

///////////////////////////////////////
// Default Tasks for Workout Project
///////////////////////////////////////

// Cardio task Data

const cardioTaskData = {
  projectName: "Workout",
  title: "Cardio",
  description: "Running, and endurance",
  ["due date"]: `2024-10-28`,
  priority: "low",
  notes: "Heavy bag, 10 minutes high intensity 15 minutes low",
  checklist: false,
};

workoutProject[cardioTaskData.title] = { taskObj: cardioTaskData };

// BJJ task Data

const bjjTaskData = {
  projectName: "Workout",
  title: "BJJ Training",
  description: "Brazilian jiu-jitsu",
  ["due date"]: `2024-11-08`,
  priority: "mid",
  notes: "",
  checklist: false,
};

workoutProject[bjjTaskData.title] = { taskObj: bjjTaskData };

// UFC 308

const ufcTaskData = {
  projectName: "Workout",
  title: "UFC 308",
  description: "MMA",
  ["due date"]: `2024-10-26`,
  priority: "low",
  notes: "",
  checklist: true,
};

workoutProject[ufcTaskData.title] = { taskObj: ufcTaskData };

///////////////////////////////////////
// Default Tasks for Coding Project
///////////////////////////////////////

// Review SOLID

const solidTaskData = {
  projectName: "Coding",
  title: "Review SOLID",
  description: "Review SOLID principles",
  ["due date"]: `2024-11-12`,
  priority: "low",
  notes: "",
  checklist: false,
};

codingProject[solidTaskData.title] = { taskObj: solidTaskData };

// Learn Linting

const lintingTaskData = {
  projectName: "Coding",
  title: "Learn linting",
  description: "Learn Linting",
  ["due date"]: `2024-11-08`,
  priority: "high",
  notes: "",
  checklist: false,
};

codingProject[lintingTaskData.title] = { taskObj: lintingTaskData };

// Code Todo Project

const todoTaskData = {
  projectName: "Coding",
  title: "Code ToDo",
  description: "Code ToDo project",
  ["due date"]: `2024-09-27`,
  priority: "mid",
  notes: "",
  checklist: true,
};

codingProject[todoTaskData.title] = { taskObj: todoTaskData };

//////////////////////////////////
// Store Initial localStorage Data
//////////////////////////////////

if (localStorage.length === 0) {
  // Add initial projects

  localStorage.setItem("--tdl-Routine", JSON.stringify(routineProject));
  localStorage.setItem("--tdl-Workout", JSON.stringify(workoutProject));
  localStorage.setItem("--tdl-Coding", JSON.stringify(codingProject));

  renderStorage();

  // Add initial activeProject

  localStorage.setItem("--tdl-activeProject", codingProject.name);
} else {
  renderStorage();
}

switchActiveProject(localStorage.getItem("--tdl-activeProject"));

UISwitchProjects(getActiveProject());
