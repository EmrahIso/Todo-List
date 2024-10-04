import { getActiveProject } from "./logic.js";

function UIProjectButtonCreator(projectName) {
    const contentProjectWrapperEl = document.querySelector("#contentProjectWrapper");

    const projectButtonEl = document.createElement("button");
    projectButtonEl.textContent  = projectName;
    projectButtonEl.dataset.project = projectName;
    contentProjectWrapperEl.appendChild(projectButtonEl);
}

function UITaskCreator(projectName, taskData) {
    const contentEl = document.querySelector("#contentTaskWrapper");

    const contentBoxEl = document.createElement("div");
    contentBoxEl.classList.add("contentBox");
    contentBoxEl.dataset.projectId = projectName;
    contentEl.appendChild(contentBoxEl);

    const taskWrapperEl = document.createElement("div");
    taskWrapperEl.classList.add("task");
    contentBoxEl.appendChild(taskWrapperEl);

    const taskPropertiesList = ["title", "description", "due date", "priority", "notes", "checklist"];

    taskPropertiesList.forEach(property => {
        const taskPropertyEl = document.createElement("div");
        taskPropertyEl.classList.add("taskProperty");

        taskWrapperEl.appendChild(taskPropertyEl);

        const propertyTextArray = property.split("");
        propertyTextArray.splice(0, 1, propertyTextArray[0].toUpperCase());

        taskPropertyEl.textContent = `${propertyTextArray.join("")}: `;

        const taskPropertyValueEl = document.createElement("span");
        taskPropertyValueEl.classList.add("taskPropertyValue");
        taskPropertyValueEl.textContent = taskData[property];
        taskPropertyEl.appendChild(taskPropertyValueEl);
    })
}

function UISwitchProjects() {
    const activeProject = getActiveProject();

    const contentEl = document.querySelector("#contentTaskWrapper");

    // Hide board
    contentEl.querySelectorAll('.contentBox').forEach(n => n.style.display = "none");

    // Show active Project Tasks

    contentEl.querySelectorAll(`[data-project-id = "${activeProject.name}"]`).forEach(n => n.style.display = "block");
}

export { UIProjectButtonCreator, UITaskCreator, UISwitchProjects }