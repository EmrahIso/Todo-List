import { taskManagerControl, addTaskToProject, addProjectToManager, switchActiveProject } from "./logic.js";

import { UIProjectButtonCreator, UITaskCreator, UISwitchProjects } from "./UI.js";

const TaskManagerDOMControl = (function() {

    const addProjectBtnEl = document.querySelector("#projectBtn");

    const addTaskBtnEl = document.querySelector("#taskBtn");

    const projectButtonsWrapperEl = document.querySelector("#contentProjectWrapper");

    const addProjectBtnClickEventHandler = (e) => {
        const projectNameInputEl = document.querySelector("input#project");
        const projectName = projectNameInputEl.value;

        if(taskManagerControl.hasProject(projectName)) {
            return;
        } else {
            addProjectToManager(projectName);
            UIProjectButtonCreator(projectName);
        }

    }
    
    const addTaskBtnClickEventHandler = (e) => {
        const projectNameInputEl = document.querySelector("input#taskProject");
        const projectName = projectNameInputEl.value;

        const taskTitleInputEl = document.querySelector("input#task");
        const taskTitle = taskTitleInputEl.value;

        const userInputTaskData = {
            title: taskTitle,
            description: "m",
            ["due date"]: "r",
            priority: "a",
            notes: "h",
            checklist: "x"
        }

        addTaskToProject(projectName, userInputTaskData);
        UITaskCreator(projectName, userInputTaskData);
    }

    const projectButtonsClickEventHandler = (e) => {
        const eventTargetEl = e.target;

        if(eventTargetEl.getAttribute("data-project") === null) return 

        switchActiveProject(eventTargetEl.getAttribute("data-project"));
        UISwitchProjects();
    }
    
    return {
        addProjectBtnEl,
        addTaskBtnEl,
        addProjectBtnClickEventHandler,
        addTaskBtnClickEventHandler,
        projectButtonsWrapperEl,
        projectButtonsClickEventHandler
    }
})() 

export { TaskManagerDOMControl }