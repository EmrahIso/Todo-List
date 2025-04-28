import { getTaskManagerControl } from './TaskManager.js';
import { TaskCreator } from './task.js';

// Function that creates project Object

function TaskProjectCreator(name) {
  const taskProject = {};

  const getTaskProject = () => taskProject;

  const addTask = (task) => {
    taskProject[task.taskObj.title] = task;
  };

  const getTask = (taskName) => {
    return taskProject[taskName];
  };

  const changeTaskKey = (oldKeyValue, newKeyValue) => {
    Object.defineProperty(
      taskProject,
      newKeyValue,
      Object.getOwnPropertyDescriptor(taskProject, oldKeyValue),
    );

    if (oldKeyValue != newKeyValue) delete taskProject[oldKeyValue];
  };

  const removeTask = (taskName) => {
    const taskProjectTasks = Object.keys(taskProject);

    taskProjectTasks.forEach((key) => {
      if (key === taskName) {
        delete taskProject[key];
      }
    });
  };

  return { getTaskProject, addTask, name, getTask, removeTask, changeTaskKey };
}

/////////////////////////////////////////////

// Functions that are associated with the project Object

function addTaskToProject(projectName, taskData) {
  const project = getTaskManagerControl().getProject(projectName);

  const task = TaskCreator(taskData);
  project.addTask(task);
}

// We use the activeProject variable to display one project at a time on the board

let activeProject = null;

function getActiveProject() {
  return activeProject;
}

function switchActiveProject(projectName) {
  if (projectName === null) {
    activeProject = 'none';
  } else {
    activeProject = getTaskManagerControl().getProject(projectName);
  }
}

export {
  TaskProjectCreator,
  addTaskToProject,
  getActiveProject,
  switchActiveProject,
};
