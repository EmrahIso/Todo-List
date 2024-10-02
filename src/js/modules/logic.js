function TaskManagerCreator() {
    const taskManager = {};

    const getTaskManager = () => taskManager;

    const dropProject = (project, projectName) => {
        taskManager[projectName] = project;
    }

    return { getTaskManager, dropProject }
}

function TaskProjectCreator() {
    const taskProject = [];

    const getTaskProject = () => taskProject;

    const dropTask = (task) => {
        taskProject.push(task);
    }

    return { getTaskProject, dropTask }
}

function TaskCreator(title, description, dueDate, priority, notes, checklist) {

    return { title, description, dueDate, priority, notes, checklist }
}

const taskManagerControl = TaskManagerCreator();

const getTaskManagerControl = () => taskManagerControl;


function addProjectToManager(projectName) {
    const project = TaskProjectCreator();
    taskManagerControl.dropProject(project, projectName);
}

function addTaskToProject(project) { 
    const title = window.prompt("title");
    const description = window.prompt("description");
    const dueDate = window.prompt("dueDate");
    const priority = window.prompt("priority");
    const notes = window.prompt("notes"); // ...notes
    const checklist = window.prompt("checklist");

    const task = TaskCreator(title, description, dueDate, priority, notes, checklist);
    project.dropTask(task);
}


function checkProjectAvailability(projectName) {
    console.log(taskManagerControl.getTaskManager());
    if(taskManagerControl.getTaskManager().hasOwnProperty(projectName)) {
        return false;
    } else {
        return true;
    }
}

export { getTaskManagerControl, addProjectToManager, addTaskToProject, checkProjectAvailability }