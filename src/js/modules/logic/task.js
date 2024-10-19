import { getTaskManagerControl } from "./TaskManager";
import { getActiveProject } from "./project";

// Function that creates Task Object

function TaskCreator(taskData) {

    const taskObj =  { ...taskData };

    const changeCheckList = () => {
        if(taskObj.checklist) {
            taskObj.checklist = false;
        } else {
            taskObj.checklist = true;
        }
    }

    return { taskObj, changeCheckList }
}

/////////////////////////////////////////////

// Functions that control the properties of the task object

function switchTaskChecklist(taskName) {
    const targetTask = getActiveProject().getTask(taskName);
    targetTask.changeCheckList();
}

function removeTaskFromProject(projectName, taskName) {
    getTaskManagerControl().getProject(projectName).removeTask(taskName);
}

export { TaskCreator, switchTaskChecklist, removeTaskFromProject }