import { TaskProjectCreator } from "./project";

// Function that creates main TaskManager Object

function TaskManagerCreator() {
    const taskManager = {};

    const getTaskManager = () => taskManager;

    const addProject = (project, projectName) => {
        taskManager[projectName] = project;
    }

    const removeProject = (projectName) => {
        const taskManagerProjects = Object.keys(taskManager);

        taskManagerProjects.forEach(key => {
            if(key === projectName) {
                delete taskManager[key];
            }
        })
    }

    const getProject = (name) => {
        return taskManager[name];
    }

    const hasProject = (name) => {
        let returnValue = null;

        const taskManagerKeys = Object.keys(taskManager);
        const taskManagerLowerCaseKeys = taskManagerKeys.map(key => key.toLowerCase());

        taskManagerLowerCaseKeys.forEach(key => {
            if(key === name.toLowerCase()) returnValue = true;
        })

        return returnValue;
    }

    return { getTaskManager, addProject, getProject, hasProject, removeProject }
}


/////////////////////////////////////////////

// Functions that control main workflow of the TaskManager Object

function addProjectToManager(projectName) {
    const project = TaskProjectCreator(projectName);
    taskManagerControl.addProject(project, projectName);
}

function removeProjectFromManager(projectName) {
    taskManagerControl.removeProject(projectName);
}

function checkForProject(projectName) {
    return taskManagerControl.hasProject(projectName);
}

// Initial usage of the object

const taskManagerControl = TaskManagerCreator();

const getTaskManagerControl = () => taskManagerControl;


export { addProjectToManager, removeProjectFromManager, checkForProject, getTaskManagerControl }