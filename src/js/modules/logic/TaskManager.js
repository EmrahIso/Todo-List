import { TaskProjectCreator } from "./project";

// import from date-fns

import { formatDistanceStrict } from "date-fns";

// Function that creates main TaskManager Object

function TaskManagerCreator() {
  const taskManager = {};

  const getTaskManager = () => taskManager;

  const addProject = (project, projectName) => {
    taskManager[projectName] = project;
  };

  const removeProject = (projectName) => {
    const taskManagerProjects = Object.keys(taskManager);

    taskManagerProjects.forEach((key) => {
      if (key === projectName) {
        delete taskManager[key];
      }
    });
  };

  const getProject = (name) => {
    return taskManager[name];
  };

  const hasProject = (name) => {
    let returnValue = null;

    const taskManagerKeys = Object.keys(taskManager);
    const taskManagerLowerCaseKeys = taskManagerKeys.map((key) =>
      key.toLowerCase()
    );

    taskManagerLowerCaseKeys.forEach((key) => {
      if (key === name.toLowerCase()) returnValue = true;
    });

    return returnValue;
  };

  const getAllManagerTasks = () => {
    const taskManagerProjects = Object.values(taskManager);

    // All focus is on getting allTasks into one Array
    const allTasksArray = [];

    taskManagerProjects.forEach((project) => {
      const allProjectsArray = Object.values(project.getTaskProject());

      allProjectsArray.forEach((task) => allTasksArray.push(task));
    });

    return allTasksArray;
  };

  const sortInbox = () => {
    const tasks = getAllManagerTasks();

    return tasks;
  };

  const sortCompleted = () => {
    const tasks = getAllManagerTasks();

    const completedTasks = [];

    tasks.forEach((task) => {
      if (task.taskObj.checklist) completedTasks.push(task);
    });

    return completedTasks;
  };

  const sortWeek = () => {
    const tasks = getAllManagerTasks();

    const weekTasks = [];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    const currentDate = new Date(currentYear, currentMonth, currentDay);

    tasks.forEach((task) => {
      const taskDateValue = formatDistanceStrict(
        task.taskObj["due date"],
        currentDate,
        { addSuffix: true }
      );

      if (taskDateValue.split(" ")[0] === "in") {
        // durationValueType === hour/ hours / day / days / month / months
        const durationValueType = taskDateValue.split(" ")[2];

        if (durationValueType == "hour" || durationValueType == "hours") {
          weekTasks.push(task);
        } else if (durationValueType == "day" || durationValueType == "days") {
          const durationValue = Number(taskDateValue.split(" ")[1]);

          if (durationValue < 8) weekTasks.push(task);
        }
      }
    });

    return weekTasks;
  };

  return {
    getTaskManager,
    addProject,
    getProject,
    hasProject,
    removeProject,
    sortInbox,
    sortCompleted,
    sortWeek,
  };
}

/////////////////////////////////////////////

// Functions that control main workflow of the TaskManager Object

function addProjectToManager(projectName) {
  const project = TaskProjectCreator(projectName);
  taskManagerControl.addProject(project, projectName);
}

function removeProjectFromManager(projectName) {
  taskManagerControl.removeProject(projectName);
}

function checkForProject(projectName) {
  return taskManagerControl.hasProject(projectName);
}

function sortBoardInbox() {
  return taskManagerControl.sortInbox();
}

function sortBoardCompleted() {
  return taskManagerControl.sortCompleted();
}

function sortBoardWeek() {
  return taskManagerControl.sortWeek();
}

// Initial usage of the object

const taskManagerControl = TaskManagerCreator();

const getTaskManagerControl = () => taskManagerControl;

export {
  addProjectToManager,
  removeProjectFromManager,
  checkForProject,
  getTaskManagerControl,
  sortBoardInbox,
  sortBoardCompleted,
  sortBoardWeek,
};
