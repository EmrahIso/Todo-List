import { getTaskManagerControl } from './TaskManager.js';
import { getActiveProject } from './project.js';

// Function that creates Task Object

function TaskCreator(taskData) {
  const taskObj = { ...taskData };

  const changeTitle = (newValue) => {
    taskObj.title = newValue;
  };

  const changeDescription = (newValue) => {
    taskObj.description = newValue;
  };

  const changeDueDate = (newValue) => {
    taskObj['due date'] = newValue;
  };

  const changePriority = (newValue) => {
    taskObj.priority = newValue;
  };

  const changeNotes = (newValue) => {
    taskObj.notes = newValue;
  };

  // Checklist type must be Boolean

  const changeCheckList = (newValue) => {
    taskObj.checklist = newValue;
  };

  return {
    taskObj,
    changeTitle,
    changeDescription,
    changeDueDate,
    changePriority,
    changeNotes,
    changeCheckList,
  };
}

/////////////////////////////////////////////

// Functions that control the properties of the task object

function switchTaskChecklist(taskName, newValue) {
  const targetTask = getActiveProject().getTask(taskName);
  targetTask.changeCheckList(newValue);
}

function removeTaskFromProject(projectName, taskName) {
  getTaskManagerControl().getProject(projectName).removeTask(taskName);
}

function getPropertiesOfSpecificProjectsTask(projectName, taskName) {
  const project = getTaskManagerControl().getProject(projectName);
  const task = project.getTask(taskName);

  return { ...task.taskObj };
}

// Function that that runs when edited task details are submitted (update value of every task property)

function updatePropertiesOfSpecificProjectsTask(
  projectName,
  taskName,
  newTaskData,
) {
  const project = getTaskManagerControl().getProject(projectName);

  const task = project.getTask(taskName);

  // Run all update methods
  task.changeTitle(newTaskData.title);
  task.changeDescription(newTaskData.description);
  task.changeDueDate(newTaskData['due date']);
  task.changePriority(newTaskData.priority);
  task.changeNotes(newTaskData.notes);
  task.changeCheckList(newTaskData.checklist);
}

export {
  TaskCreator,
  switchTaskChecklist,
  removeTaskFromProject,
  getPropertiesOfSpecificProjectsTask,
  updatePropertiesOfSpecificProjectsTask,
};
