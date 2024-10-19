// Logic imports

import { addProjectToManager, removeProjectFromManager, checkForProject, getTaskManagerControl } from "./logic/TaskManager.js";
import { addTaskToProject, getActiveProject, switchActiveProject } from "./logic/project.js";
import { switchTaskChecklist, removeTaskFromProject } from "./logic/task.js";

// UI imports 

import { UIRenderProjects, UISwitchProjects } from "./UI/UIProject.js";
import { UIRenderTasks } from "./UI/UITask.js";


const TaskManagerDOMControl = (function() {

    //////////////
    // For Project
    //////////////

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

    // Handler to show tasks of active project (switching project board's (container of tasks)) 

    const projectButtonsContEl = document.querySelector("[data-dynamic-projects-cont]");

    const switchActiveProjectsContClickEventHandler = (e) => {
        const eventTargetEl = e.target;

        if(eventTargetEl.getAttribute("data-project") === null) return 

        switchActiveProject(eventTargetEl.getAttribute("data-project"));
        UISwitchProjects(getActiveProject());
    }

    ///////////
    // For Task
    ///////////

    const addTaskFormEl = document.querySelector("[data-task-form]");

    // Handler for opening the task form

    const openTaskFormBtnEl = document.querySelector("[data-open-task-form]");

    const openTaskFormBtnClickEventHandler = (e) => {
        addTaskFormEl.style.transition = ".3s";
        addTaskFormEl.style.opacity = 1;
        addTaskFormEl.style.pointerEvents = "all";
        addTaskFormEl.style.visibility = "visible";
        addTaskFormEl.style.height = "auto";
        addTaskFormEl.style.transform = "scaleY(1)";
    }

    // Handler for closing the task form

    const closeTaskFormBtnEl = document.querySelector("[data-task-cancel-btn]");

    const closeTaskFormBtnClickEventHandler = (e) => {
        // close task form
        
        addTaskFormEl.style.transition = "none";
        addTaskFormEl.style.opacity = 0;
        addTaskFormEl.style.pointerEvents = "none";
        addTaskFormEl.style.visibility = "hidden";
        addTaskFormEl.style.height = "0";
        addTaskFormEl.style.transform = "scaleY(.75)";

        // empty form fields

        document.querySelector("[data-input-task-title]").value = "";
        document.querySelector("[data-input-task-date]").value = "";
        document.querySelector("[data-textarea-task-desc]").value = "";
        document.querySelector("[data-textarea-task-notes]").value = "";
    }

    // Handler for submitting the task form (adding task)

    const addTaskFormSubmitEventHandler = (e) => {

        // Disable form submitting 
        e.preventDefault();

        // getAllProjects
        if(Object.keys(getTaskManagerControl().getTaskManager()).length < 1 ||
            getActiveProject().name in getTaskManagerControl().getTaskManager() === false) {

            alert("There is no project selected");
            return
        }

        const projectName = getActiveProject().name;

        // Take User Input

        const taskTitleInputEl = document.querySelector("[data-input-task-title]");
        const taskTitle = taskTitleInputEl.value;

        const taskDueDateInputEl = document.querySelector("[data-input-task-date]");
        const taskDueDate = taskDueDateInputEl.value;

        const taskDescriptionTextareaEl = document.querySelector("[data-textarea-task-desc]");
        const taskDescription = taskDescriptionTextareaEl.value;

        const taskNotesTextareaEl = document.querySelector("[data-textarea-task-notes]");
        const taskNotes = taskNotesTextareaEl.value;

        const taskPriorityRadioEls = document.querySelectorAll("[data-radio-task-priority]");

        const taskPriorityRadioEl = Array.from(taskPriorityRadioEls).find(el => el.checked === true ? el : null);
        
        const taskPriority = taskPriorityRadioEl.value;

        const userInputTaskData = {
            title: taskTitle,
            description: taskDescription,
            ["due date"]: taskDueDate,
            priority: taskPriority,
            notes: taskNotes,
            checklist: false,
        }

        addTaskToProject(projectName, userInputTaskData);
        UIRenderTasks(projectName, getActiveProject().getTaskProject());

        // Close form 

        addTaskFormEl.style.transition = "none";
        addTaskFormEl.style.opacity = 0;
        addTaskFormEl.style.pointerEvents = "none";
        addTaskFormEl.style.visibility = "hidden";
        addTaskFormEl.style.height = "0";
        addTaskFormEl.style.transform = "scaleY(.75)";
        
        // empty form fields 

        taskTitleInputEl.value = "";
        taskDueDateInputEl.value = "";
        taskDescriptionTextareaEl.value = "";
        taskNotesTextareaEl.value = "";

        // Add Task Dynamic Listeners
    }

    const dataTasksContentEl = document.querySelector("[data-tasks-content]");

    // Handler to change specific task checklist ("finished") 

    const changeTaskChecklistElClickEventHandler = (e) => {
        const closestTaskEl = e.target.closest("[data-task]");
        switchTaskChecklist(closestTaskEl.getAttribute("data-task"));

        if(closestTaskEl.getAttribute("disabled") != null) {
            closestTaskEl.removeAttribute("disabled");
        } else {
            closestTaskEl.setAttribute("disabled", "");
        }
    }

    // Handler to remove specific task

    const removeTaskBtnClickEventHandler = (e) => {
        const closestProjectEl = e.target.closest("div[data-project-id]");
        const closestTaskEl = e.target.closest("[data-task]");

        // Remove from Logic
        removeTaskFromProject(closestProjectEl.getAttribute("data-project-id"), closestTaskEl.getAttribute("data-task"));

        // Remove from UI

        UIRenderTasks(closestProjectEl.getAttribute("data-project-id"), getActiveProject().getTaskProject());
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
        switchActiveProjectsContClickEventHandler,
        openTaskFormBtnEl,
        openTaskFormBtnClickEventHandler,
        closeTaskFormBtnEl,
        closeTaskFormBtnClickEventHandler,
        addTaskFormEl,
        addTaskFormSubmitEventHandler,
        dataTasksContentEl,
        changeTaskChecklistElClickEventHandler,
        removeTaskBtnClickEventHandler
    }
})() 

export { TaskManagerDOMControl }