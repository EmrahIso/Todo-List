// Logic imports

import { getTaskManagerControl } from "../logic/TaskManager.js";
import { getActiveProject } from "../logic/project.js";
import { getPropertiesOfSpecificProjectsTask, updatePropertiesOfSpecificProjectsTask } from "../logic/task.js";

// UI imports 

import { UIRenderTasks } from "../UI/UITask.js";


const DOMTaskDialog = (function() {

    // Handler to open task dialog

    const dialogEl = document.querySelector("[data-modal-task-dialog]");
    
    const openTaskDetailsBtnClickEventHandler = (e) => {
        dialogEl.showModal();

        dialogEl.querySelector("[data-task-dialog-save]").style.display = "none";

        const closestTaskEl = e.target.closest("[data-task]");
        const closestProjectEl = e.target.closest("[data-project-id]");

        const taskName = closestTaskEl.getAttribute("data-task");
        const projectName = closestProjectEl.getAttribute("data-project-id");

        // Take all properties and values

        const taskPropertiesObj = getPropertiesOfSpecificProjectsTask(projectName, taskName);

        dialogEl.querySelector("[data-dialog-task-name]").textContent = `// ${taskPropertiesObj.title}`;
        dialogEl.querySelector("[data-dialog-task-name]").setAttribute("data-dialog-task-name", taskPropertiesObj.title);

        dialogEl.querySelectorAll("[data-task-dialog-property]").forEach(n => {
            const dataAttrValue = n.getAttribute("data-task-dialog-property");

            n.querySelector("[data-task-dialog-property-value]").value  = taskPropertiesObj[dataAttrValue];
            
            if(n.querySelector("[data-task-dialog-property-value]").getAttribute("id") === "dialogTaskChecklist") {
                if(taskPropertiesObj[dataAttrValue]) {
                    n.querySelector("[data-task-dialog-property-value]").checked = true;
                    n.querySelector("[data-task-dialog-property-value]").checked = true;
                } else {
                    n.querySelector("[data-task-dialog-property-value]").checked = false;
                    n.querySelector("[data-task-dialog-property-value]").checked = false;
                }
            }
        })

        // (view only mode)

        dialogEl.querySelectorAll("[data-task-dialog-property-value]").forEach(n => {
            if(n.id === "dialogTaskPriority" || n.id === "dialogTaskChecklist") {
                n.setAttribute("disabled", "");
            } else {
                n.setAttribute("readonly", "");
            }
        })
    }  

    // Handler to open task dialog (edit mode)

    const openTaskEditBtnClickEventHandler = (e) => {
        dialogEl.showModal();

        dialogEl.querySelector("[data-task-dialog-save]").style.display = "inline-block";

        const closestTaskEl = e.target.closest("[data-task]");
        const closestProjectEl = e.target.closest("[data-project-id]");

        const taskName = closestTaskEl.getAttribute("data-task");
        const projectName = closestProjectEl.getAttribute("data-project-id");

        // Take all properties and values

        const taskPropertiesObj = getPropertiesOfSpecificProjectsTask(projectName, taskName);

        dialogEl.querySelector("[data-dialog-task-name]").textContent = `// ${taskPropertiesObj.title}`;
        dialogEl.querySelector("[data-dialog-task-name]").setAttribute("data-dialog-task-name", taskPropertiesObj.title);

        dialogEl.querySelectorAll("[data-task-dialog-property]").forEach(n => {
            const dataAttrValue = n.getAttribute("data-task-dialog-property");
            
            if(n.querySelector("[data-task-dialog-property-value]").getAttribute("id") === "dialogTaskChecklist") {
                if(taskPropertiesObj[dataAttrValue]) {
                    n.querySelector("[data-task-dialog-property-value]").value = true;
                    n.querySelector("[data-task-dialog-property-value]").checked = true;
                } else {
                    n.querySelector("[data-task-dialog-property-value]").value = false;
                    n.querySelector("[data-task-dialog-property-value]").checked = false;
                }
            } else {
                n.querySelector("[data-task-dialog-property-value]").value  = taskPropertiesObj[dataAttrValue];
            }
        })

        // (edit only mode)

        dialogEl.querySelectorAll("[data-task-dialog-property-value]").forEach(n => {
            if(n.id === "dialogTaskPriority" || n.id === "dialogTaskChecklist") {
                n.removeAttribute("disabled");
            } else {
                n.removeAttribute("readonly");
            }
        })
    }

    // Handler to close task dialog

    const closeTaskDialogBtnClickEventHandler = (e) => {
        dialogEl.close();
    }

    // Handler to update values of task properties when edit form is submitted

    const taskDialogFormEl = document.querySelector("[data-task-dialog-form]");

    const taskDialogFormSubmitEventHandler = (e) => {

        // Disable form submitting 
        e.preventDefault();

        const projectName = getActiveProject().name;
        const taskName = e.target.previousElementSibling.getAttribute("data-dialog-task-name");

        const newValueTaskData = {};

        // Update task property values in the dialog

        dialogEl.querySelectorAll("[data-task-dialog-property]").forEach(n => {
            const dataAttrValue = n.getAttribute("data-task-dialog-property");

            if(dataAttrValue == "checklist") {
                if(n.querySelector("[data-task-dialog-property-value]").value == "false") {
                    newValueTaskData[dataAttrValue] = false;
                } else {
                    newValueTaskData[dataAttrValue] = true;
                }
            } else {
                newValueTaskData[dataAttrValue] = n.querySelector("[data-task-dialog-property-value]").value;
            }
        })

        // Update task property values in the logic

        updatePropertiesOfSpecificProjectsTask(projectName, taskName, newValueTaskData);

        // Update task object key value in the project object.

        getTaskManagerControl().getProject(projectName).changeTaskKey(taskName, newValueTaskData.title);

        // Change task name on taskEl

        const taskEl = document.querySelector(`[data-task="${taskName}"]`);

        taskEl.setAttribute("data-task", newValueTaskData.title);

        // Update task property values in the task board (visible tasks of the active project)

        UIRenderTasks(projectName, getActiveProject().getTaskProject());
        
        dialogEl.close();
    }

    const changeDialogTaskChecklistElClickEventHandler = (e) => {

        const currentBooleanValue = e.target.value === "true" ? true : false;

        if(currentBooleanValue) {
            e.target.value = false;
        } else {
            e.target.value = true;
        }
    }

    return {
        dialogEl,
        openTaskDetailsBtnClickEventHandler,
        openTaskEditBtnClickEventHandler,
        closeTaskDialogBtnClickEventHandler,
        taskDialogFormEl,
        taskDialogFormSubmitEventHandler,
        changeDialogTaskChecklistElClickEventHandler
    }

})()

export { DOMTaskDialog }