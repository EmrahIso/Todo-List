import { getTaskManagerControl, addTaskToProject, addProjectToManager, checkProjectAvailability } from "./logic.js";

const TaskManagerDOMControl = (function() {
    const addProjectBtnEl = document.querySelector("#projectBtn");

    const addTaskBtnEl = document.querySelector("#taskBtn");


    const addProjectBtnClickEventHandler = (e) => {
        const projectNameInputEl = document.querySelector("input#project");
        const projectName = projectNameInputEl.value;

        if(!checkProjectAvailability(projectName)) {
            return;
        } else {
            addProjectToManager(projectName);
        }

    }
    
    const addTaskBtnClickEventHandler = (e) => {
        const projectNameInputEl = document.querySelector("input#taskProject");
        const projectName = projectNameInputEl.value;

        const taskTitleInputEl = document.querySelector("input#task");
        const taskTitle = taskTitleInputEl.value;

        addTaskToProject(getTaskManagerControl().getTaskManager()[projectName], taskTitle, "m", "r", "a", "h", "x");
    }
    
    return {
        addProjectBtnEl,
        addTaskBtnEl,
        addProjectBtnClickEventHandler,
        addTaskBtnClickEventHandler
    }
})() 

export { TaskManagerDOMControl }