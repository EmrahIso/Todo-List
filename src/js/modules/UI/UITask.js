import deleteIcon from "../../../../assets/images/icons/trash.svg";
import editIcon from "../../../../assets/images/icons/note-pencil.svg";
import detailsIcon from "../../../../assets/images/icons/dots-three-bold.svg";

// import from date-fns

import { formatDistance } from 'date-fns';

// We use this function to show tasks of some specified project when needed (update tasks board)

function UIRenderTasks(projectName, allTasks) {
    const allTasksArray = Object.values(allTasks);

    const contentEl = document.querySelector("[data-tasks-content]");

    const projectWrapperEl = contentEl.querySelector(`[data-project-id="${projectName}"]`);

    // Remove all tasks
    projectWrapperEl.querySelectorAll("*").forEach(n => n.remove());

    // We go through allTasksArray array and display all tasks from a specific project

    allTasksArray.forEach(task => {
        const taskData = task.taskObj;     

        const taskEl = document.createElement("div");
        taskEl.dataset.task = taskData.title;
        taskEl.classList.add("task");

        if(taskData.checklist) taskEl.setAttribute("disabled", "");

        projectWrapperEl.appendChild(taskEl);

        const taskCheckedEl = document.createElement("div");
        taskCheckedEl.classList.add("task__cell");
        taskEl.appendChild(taskCheckedEl);

        const taskCheckedInputEl = document.createElement("input");
        taskCheckedInputEl.type = "checkbox";
        taskCheckedInputEl.dataset.taskCheckbox = "";
        taskCheckedInputEl.classList.add("form__input--checkbox");

        if(taskData.checklist) taskCheckedInputEl.checked = true;

        taskCheckedEl.appendChild(taskCheckedInputEl);

        const taskPriorityEl = document.createElement("div");
        taskPriorityEl.classList.add("task__cell", "task__cell--priority", `task__cell--priority-${taskData.priority}`);
        taskEl.appendChild(taskPriorityEl);

        const taskTitleEl = document.createElement("div");
        taskTitleEl.textContent = taskData.title;
        taskTitleEl.classList.add("task__cell"); 
        taskEl.appendChild(taskTitleEl);

        const taskDateEl = document.createElement("div");
        taskDateEl.classList.add("task__cell", "task__cell--flex-wrapper");

        // Data task date

        const dataYear = taskData["due date"].split("-")[0];
        const dataMonth = taskData["due date"].split("-")[1];
        const dataDay = taskData["due date"].split("-")[2];

        const dataDate = new Date(dataYear, dataMonth, dataDay);

        // Current Date

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentDay = new Date().getDate();

        const currentDate = new Date(currentYear, currentMonth, currentDay);

        const taskDateValue = formatDistance(dataDate, currentDate, { addSuffix: true });
        
        taskDateEl.textContent = taskDateValue === "less than a minute ago" ? "Today" : taskDateValue;

        taskEl.appendChild(taskDateEl);

        const taskDeleteEl = document.createElement("div");
        taskDeleteEl.classList.add("task__cell");
        taskEl.appendChild(taskDeleteEl);

        const taskDeleteBtnEl = document.createElement("button");
        taskDeleteBtnEl.classList.add("button", "button--task-control", "button--task-control--delete");
        taskDeleteBtnEl.type = "button";
        taskDeleteBtnEl.dataset.taskBtnDelete = "";
        taskDeleteEl.appendChild(taskDeleteBtnEl);

        const taskDeleteBtnDeleteIconEl = document.createElement("img");
        taskDeleteBtnDeleteIconEl.src = deleteIcon;
        taskDeleteBtnDeleteIconEl.style.pointerEvents = "none";
        taskDeleteBtnEl.appendChild(taskDeleteBtnDeleteIconEl);

        const taskEditEl = document.createElement("div");
        taskEditEl.classList.add("task__cell");
        taskEl.appendChild(taskEditEl);

        const taskEditBtnEl = document.createElement("button");
        taskEditBtnEl.classList.add("button", "button--task-control");
        taskEditBtnEl.type = "button";
        taskEditBtnEl.dataset.taskBtnEdit = "";
        taskEditEl.appendChild(taskEditBtnEl);

        const taskEditBtnEditIconEl = document.createElement("img");
        taskEditBtnEditIconEl.src = editIcon;
        taskEditBtnEl.appendChild(taskEditBtnEditIconEl);

        const taskDetailsEl = document.createElement("div");
        taskDetailsEl.classList.add("task__cell");
        taskEl.appendChild(taskDetailsEl);

        const taskDetailsBtnEl = document.createElement("button");
        taskDetailsBtnEl.classList.add("button", "button--task-control");
        taskDetailsBtnEl.type = "button";
        taskDetailsBtnEl.dataset.taskBtnDetails = "";
        taskDetailsEl.appendChild(taskDetailsBtnEl);

        const taskDetailsBtnDetailsIconEl = document.createElement("img");
        taskDetailsBtnDetailsIconEl.src = detailsIcon;
        taskDetailsBtnEl.appendChild(taskDetailsBtnDetailsIconEl);
    });
} 

export { UIRenderTasks }

console.log(new Date(2024, 0, 11));
console.log(new Date(2024, 0, 11));