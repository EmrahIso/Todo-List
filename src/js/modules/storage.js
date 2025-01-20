import {
  getTaskManagerControl,
  addProjectToManager,
  checkForProject,
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

  for (let key in localStorage) {
    const keyPrefix = key.split("").splice(0, 6).join("");
    if (keyPrefix === "--tdl-") {
      storageObject[key] = localStorage.getItem(`--tdl-${key}`);
    }
  }

  // Fill up storageObject with new data

  for (let projectKey in storageObject) {
    if (getActiveProject() !== "none" && projectKey !== "--tdl-activeProject") {
      localStorage.removeItem(projectKey);
    }
  }

  const taskManager = getTaskManagerControl().getTaskManager();

  Object.values(taskManager).forEach((project) => {
    storageObject[`--tdl-${project.name}`] = project;

    const projectTasksObj =
      storageObject[`--tdl-${project.name}`].getTaskProject();

    storageObject[`--tdl-${project.name}`] = { name: project.name };

    Object.values(projectTasksObj).forEach((task) => {
      storageObject[`--tdl-${project.name}`][task.taskObj.title] = {
        taskObj: task.taskObj,
      };
    });

    localStorage.setItem(
      `--tdl-${project.name}`,
      JSON.stringify(storageObject[`--tdl-${project.name}`])
    );
  });

  const newActiveProject = getActiveProject();

  if (newActiveProject !== "none") {
    if (checkForProject(newActiveProject.name)) {
      localStorage.setItem("--tdl-activeProject", newActiveProject.name);
    } else {
      const allProjects = Object.values(
        getTaskManagerControl().getTaskManager()
      );
      const firstProjectInManager = allProjects[0];

      if (firstProjectInManager === undefined)
        localStorage.setItem("--tdl-activeProject", "");

      localStorage.setItem("--tdl-activeProject", firstProjectInManager.name);
    }
  }
}

function renderStorage() {
  const allProjects = {};

  // Render Projects

  Object.keys(localStorage).forEach((projectName) => {
    const projectPrefix = projectName.split("").splice(0, 6).join("");

    if (projectPrefix === "--tdl-") {
      const newProjectName = projectName.split("").slice(6).join("");

      if (newProjectName !== "activeProject") {
        allProjects[newProjectName] = { name: newProjectName };
        addProjectToManager(newProjectName);
      }
    }
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

  // Render activeProject

  switchActiveProject(localStorage.getItem("--tdl-activeProject"));

  UISwitchProjects(getActiveProject());
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

  // Add initial activeProject

  localStorage.setItem("--tdl-activeProject", codingProject.name);

  renderStorage();
} else {
  renderStorage();
}

//////////////////////////////
// I am using --tdl- prefix for our localStorage keys so that we know that that keys are for this project.
// I do that because I have more projects that are using localStorage on the same origin
// So all that projects are sharing all keys and values of localStorage
//////////////////////////////
