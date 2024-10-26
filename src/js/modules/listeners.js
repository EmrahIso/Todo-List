import { DOMProject } from "./Handlers/DOMproject.js";
import { DOMTask } from "./Handlers/DOMtask.js";
import { DOMTaskDialog } from "./Handlers/DOMtaskDialog.js";

///////////////
// For Projects
///////////////

// Open project Form (we need this form to add project)

DOMProject.openProjectFormBtnEl.addEventListener("click", DOMProject.openProjectFormBtnClickEventHandler);

// Add project

DOMProject.addProjectFormEl.addEventListener("submit", DOMProject.addProjectFormSubmitEventHandler);

// Cancel project (and close project form)

DOMProject.cancelProjectBtnEl.addEventListener("click", DOMProject.cancelProjectBtnClickEventHandler);

// Remove Project

DOMProject.removeProjectListEl.addEventListener("click", DOMProject.removeProjectBtnClickEventHandler);

// Show tasks of active project

DOMProject.projectButtonsContEl.addEventListener("click", DOMProject.switchActiveProjectsContClickEventHandler);

////////////
// For Tasks
////////////

// Open task Form (we need this form to add task and to gather data)

DOMTask.openTaskFormBtnEl.addEventListener("click", DOMTask.openTaskFormBtnClickEventHandler);

// Close task Form

DOMTask.closeTaskFormBtnEl.addEventListener("click", DOMTask.closeTaskFormBtnClickEventHandler);

// Add task to active project

DOMTask.addTaskFormEl.addEventListener("submit", DOMTask.addTaskFormSubmitEventHandler);

/////////////////////////

// Task control listeners

// We use this listener when user clicks at any button that control task behavior (e.g. deleteTaskBtn, editTaskBtn, detailsTaskBtn, checklist ...)

// Each task control button has different data attribute.

// Based on data attribute we add different listeners to target element every time when user clicks some of the control buttons (or the dataTasksContentEl).

// We use event delegation on container of all Tasks (dataTasksContentEl)

DOMTask.dataTasksContentEl.addEventListener("click", e => {
    const eventDataAttrObj = e.target.dataset;
    const eventDataAttr = Object.keys(eventDataAttrObj)[0];

    switch(eventDataAttr) {
        case "taskCheckbox":
            // Change "finished" status
            DOMTask.changeTaskChecklistElClickEventHandler(e);
        break;
        case "taskBtnDelete":
            // Delete Task
            DOMTask.removeTaskBtnClickEventHandler(e);
        break;
        case "taskBtnDetails":
            // Open task details [dialog]
            DOMTaskDialog.openTaskDetailsBtnClickEventHandler(e);
        break;
        case "taskBtnEdit":
            // Open task details (edit mode) [dialog]
            DOMTaskDialog.openTaskEditBtnClickEventHandler(e);
        break;
    }
});

/////////////////////////
// Task dialog listeners
/////////////////////////

// We need this listeners when user opens a dialog to see or edit task data

DOMTaskDialog.dialogEl.addEventListener("click", e => {
    const eventDataAttrObj = e.target.dataset;
    const eventElID = e.target.id;
    const eventDataAttr = Object.keys(eventDataAttrObj)[0];

    switch(eventDataAttr) {
        case "taskDialogClose":
            // Close dialog
            DOMTaskDialog.closeTaskDialogBtnClickEventHandler(e);
        break;
        case "taskDialogPropertyValue":
            // Checklist toggle
            if(eventElID == "dialogTaskChecklist") {
                DOMTaskDialog.changeDialogTaskChecklistElClickEventHandler(e);
            }
        break;
    }
})

DOMTaskDialog.taskDialogFormEl.addEventListener("submit", DOMTaskDialog.taskDialogFormSubmitEventHandler);