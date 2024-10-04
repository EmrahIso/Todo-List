// Factories

function TaskManagerCreator() {
    const taskManager = {};

    const getTaskManager = () => taskManager;

    const addProject = (project, projectName) => {
        taskManager[projectName] = project;
    }

    const getProject = (name) => {
        return taskManager[name];
    }

    const hasProject = (name) => {
        return taskManager.hasOwnProperty(name);
    }

    return { getTaskManager, addProject, getProject, hasProject }
}

function TaskProjectCreator(name) {
    const taskProject = {};

    const getTaskProject = () => taskProject;

    const addTask = (task) => {
        taskProject[task.title] = task;
    }

    return { getTaskProject, addTask, name }
}

function TaskCreator(taskData) {

    return { ...taskData }
}

// Functions

function addProjectToManager(projectName) {
    const project = TaskProjectCreator(projectName);
    taskManagerControl.addProject(project, projectName);
}

function addTaskToProject(projectName, taskData) { 
    const project = taskManagerControl.getProject(projectName);
    const task = TaskCreator(taskData);
    
    project.addTask(task);
}

let activeProject = null;

function getActiveProject() {
    return activeProject;
}

function switchActiveProject(projectName) {
    activeProject = taskManagerControl.getProject(projectName);
}

// Usage

const taskManagerControl = TaskManagerCreator();

export { taskManagerControl, addProjectToManager, addTaskToProject, getActiveProject, switchActiveProject }
