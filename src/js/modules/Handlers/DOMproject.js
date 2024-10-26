// Logic imports

import { addProjectToManager, removeProjectFromManager, checkForProject, getTaskManagerControl } from "../logic/TaskManager.js";
import { getActiveProject, switchActiveProject } from "../logic/project.js";

// UI imports 

import { UIRenderProjects, UISwitchProjects } from "../UI/UIProject.js";


const DOMProject = (function() {

    const openProjectFormBtnEl = document.querySelector("[data-open-project-form]");

    // Handler for opening the project form 

    const openProjectFormBtnClickEventHandler = (e) => {
        addProjectFormEl.style.transition = ".3s";
        addProjectFormEl.style.opacity = 1;
        addProjectFormEl.style.pointerEvents = "all";
        addProjectFormEl.style.visibility = "visible";
        addProjectFormEl.style.height = "auto";
        addProjectFormEl.style.transform = "scaleY(1)";
    } 

    // Handler for submitting project form (adding project)

    const addProjectFormEl = document.querySelector("[data-project-form]");

    const addProjectFormSubmitEventHandler = (e) => {
        e.preventDefault();

        const projectNameInputEl = document.querySelector("[data-input-project-name]");
        const projectName = projectNameInputEl.value;

        if(checkForProject(projectName)) {
            return;
        } else {
            addProjectToManager(projectName);
            UIRenderProjects(getTaskManagerControl().getTaskManager());
            projectNameInputEl.value = "";
            switchActiveProject(projectName);
            UISwitchProjects(getActiveProject());
        }
    }

    // Handler for canceling project form (cancel adding project)

    const cancelProjectBtnEl = document.querySelector("[data-project-cancel-btn]");

    const cancelProjectBtnClickEventHandler = (e) => {
        document.querySelector("[data-input-project-name]").value = "";

        // Close Form

        addProjectFormEl.style.opacity = 0;
        addProjectFormEl.style.pointerEvents = "none";
        addProjectFormEl.style.visibility = "hidden";
        addProjectFormEl.style.height = "0";
        addProjectFormEl.style.transform = "scaleY(0)";
    }

    // Handler for removing project

    const removeProjectListEl = document.querySelector("[data-dynamic-projects-cont]");

    const removeProjectBtnClickEventHandler = (e) => { 
        const targetEl = e.target;

        if(targetEl.getAttribute("data-project-id") == null || !targetEl.getAttribute("class").includes("button--navigation-delete")) return 
        
        const targetProjectID = targetEl.getAttribute("data-project-id");
        removeProjectFromManager(targetProjectID);
        
        const contentEl = document.querySelector("[data-tasks-content]");

        const tasksWrapperEl = contentEl.querySelector(`[data-project-id="${targetProjectID}"]`);
        tasksWrapperEl.remove();

        UIRenderProjects(getTaskManagerControl().getTaskManager());
    }

    const projectButtonsContEl = document.querySelector("[data-dynamic-projects-cont]");

    const switchActiveProjectsContClickEventHandler = (e) => {
        const eventTargetEl = e.target;

        if(eventTargetEl.getAttribute("data-project") === null) return 

        switchActiveProject(eventTargetEl.getAttribute("data-project"));
        UISwitchProjects(getActiveProject());
    }

    return {
        openProjectFormBtnEl,
        openProjectFormBtnClickEventHandler,
        addProjectFormEl,
        addProjectFormSubmitEventHandler,
        cancelProjectBtnEl,
        cancelProjectBtnClickEventHandler,
        removeProjectListEl, 
        removeProjectBtnClickEventHandler,
        projectButtonsContEl,
        switchActiveProjectsContClickEventHandler
    }

})()

export { DOMProject }