// Logic imports

import { getTaskManagerControl } from "../logic/TaskManager.js";
import { addTaskToProject, getActiveProject } from "../logic/project.js";
import { switchTaskChecklist, removeTaskFromProject,  } from "../logic/task.js";

// UI imports 

import { UIRenderTasks } from "../UI/UITask.js";


const DOMTask = (function() {

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
        addTaskFormEl.style.padding = "32px 0 48px 0";
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
        addTaskFormEl.style.padding = "16px 0 16px 0";

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

        if(closestTaskEl.getAttribute("disabled") != null) {
            closestTaskEl.removeAttribute("disabled");
            switchTaskChecklist(closestTaskEl.getAttribute("data-task"), false);
            document.querySelector("[data-task-dialog-property-value]#dialogTaskChecklist").value = false;
        } else {
            closestTaskEl.setAttribute("disabled", "");
            switchTaskChecklist(closestTaskEl.getAttribute("data-task"), true);
            document.querySelector("[data-task-dialog-property-value]#dialogTaskChecklist").value = true;
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
        openTaskFormBtnEl,
        openTaskFormBtnClickEventHandler,
        closeTaskFormBtnEl,
        closeTaskFormBtnClickEventHandler,
        addTaskFormEl,
        addTaskFormSubmitEventHandler,
        dataTasksContentEl,
        changeTaskChecklistElClickEventHandler,
        removeTaskBtnClickEventHandler,
    }

})()

export { DOMTask } 