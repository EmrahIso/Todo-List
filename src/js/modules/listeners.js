import { TaskManagerDOMControl } from "./DOMmanipulation.js";

///////////////
// For Projects
///////////////

// Open project Form (we need this form to add project)

TaskManagerDOMControl.openProjectFormBtnEl.addEventListener("click", TaskManagerDOMControl.openProjectFormBtnClickEventHandler);

// Add project

TaskManagerDOMControl.addProjectFormEl.addEventListener("submit", TaskManagerDOMControl.addProjectFormSubmitEventHandler);

// Cancel project (and close project form)

TaskManagerDOMControl.cancelProjectBtnEl.addEventListener("click", TaskManagerDOMControl.cancelProjectBtnClickEventHandler);

// Remove Project

TaskManagerDOMControl.removeProjectListEl.addEventListener("click", TaskManagerDOMControl.removeProjectBtnClickEventHandler);

// Show tasks of active project

TaskManagerDOMControl.projectButtonsContEl.addEventListener("click", TaskManagerDOMControl.switchActiveProjectsContClickEventHandler);

////////////
// For Tasks
////////////

// Open task Form (we need this form to add task and to gather data)

TaskManagerDOMControl.openTaskFormBtnEl.addEventListener("click", TaskManagerDOMControl.openTaskFormBtnClickEventHandler);

// Close task Form

TaskManagerDOMControl.closeTaskFormBtnEl.addEventListener("click", TaskManagerDOMControl.closeTaskFormBtnClickEventHandler);

// Add task to active project

TaskManagerDOMControl.addTaskFormEl.addEventListener("submit", TaskManagerDOMControl.addTaskFormSubmitEventHandler);

/////////////////////////
// Task control listeners
/////////////////////////

// We use this listener when user clicks at any button that control task behavior (e.g. deleteTaskBtn, editTaskBtn, detailsTaskBtn, checklist ...)

// Each task control button has different data attribute.

// Based on data attribute we add different listeners to target element every time when user clicks some of the control buttons (or the dataTasksContentEl).

// We use event delegation on container of all Tasks (dataTasksContentEl)

TaskManagerDOMControl.dataTasksContentEl.addEventListener("click", e => {
    const eventDataAttrObj = e.target.dataset;
    const eventDataAttr = Object.keys(eventDataAttrObj)[0];

    switch(eventDataAttr) {
        case "taskCheckbox":
            // Change "finished" status
            TaskManagerDOMControl.changeTaskChecklistElClickEventHandler(e);
        break;
        case "taskBtnDelete":
            // Delete Task
            TaskManagerDOMControl.removeTaskBtnClickEventHandler(e);
        break;
    }
});