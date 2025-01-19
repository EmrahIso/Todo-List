import deleteIcon from "../../../../assets/images/icons/trash.svg";

// We use this function every time a user creates or removes a project (update projects board)

function UIRenderProjects(allProjects) {
  const allProjectsArray = Object.values(allProjects);

  const dynamicProjectsNavigationListEl = document.querySelector(
    "[data-nav-projects] [data-dynamic-projects-cont]"
  );

  dynamicProjectsNavigationListEl
    .querySelectorAll("*")
    .forEach((n) => n.remove());

  // First we add heading

  const headingContNavigationListItemEl = document.createElement("li");
  headingContNavigationListItemEl.classList.add("navigation__list-item");
  dynamicProjectsNavigationListEl.appendChild(headingContNavigationListItemEl);

  const headingEl = document.createElement("h3");
  headingEl.classList.add("tertiary-heading");
  headingEl.textContent = "Projects: ";
  headingContNavigationListItemEl.appendChild(headingEl);

  // We go through allProjects array and display all projects

  allProjectsArray.forEach((project) => {
    const dynamicProjectNavigationListItemEl = document.createElement("li");
    dynamicProjectNavigationListItemEl.classList.add("navigation__list-item");
    dynamicProjectsNavigationListEl.appendChild(
      dynamicProjectNavigationListItemEl
    );

    const projectButtonEl = document.createElement("button");
    projectButtonEl.classList.add(
      "button",
      "button--navigation",
      "button--navigation-project"
    );
    projectButtonEl.type = "button";
    projectButtonEl.dataset.project = project.name;
    dynamicProjectNavigationListItemEl.appendChild(projectButtonEl);

    const projectButtonIconSpanEl = document.createElement("span");
    projectButtonIconSpanEl.textContent = "//";
    projectButtonEl.appendChild(projectButtonIconSpanEl);

    const projectButtonTextSpanEl = document.createElement("span");
    projectButtonTextSpanEl.textContent = project.name;
    projectButtonEl.appendChild(projectButtonTextSpanEl);

    const projectButtonDeleteButtonEl = document.createElement("button");
    projectButtonDeleteButtonEl.dataset.projectDeleteBtn;
    projectButtonDeleteButtonEl.dataset.projectId = project.name;
    projectButtonDeleteButtonEl.type = "button";
    projectButtonDeleteButtonEl.classList.add(
      "button",
      "button--navigation",
      "button--navigation-delete"
    );

    const projectButtonDeleteButtonIconEl = document.createElement("img");
    projectButtonDeleteButtonIconEl.src = deleteIcon;
    projectButtonDeleteButtonIconEl.setAttribute("alt", "icon");
    projectButtonDeleteButtonIconEl.style.pointerEvents = "none";
    projectButtonDeleteButtonEl.appendChild(projectButtonDeleteButtonIconEl);
    projectButtonEl.appendChild(projectButtonDeleteButtonEl);

    if (
      document.querySelector(
        `[data-tasks-content] [data-project-id="${project.name}"]`
      ) != null
    ) {
      return;
    } else {
      // Add container for tasks
      const contentEl = document.querySelector("[data-tasks-content]");

      const projectTasksWrapperEl = document.createElement("div");
      projectTasksWrapperEl.dataset.projectId = project.name;
      projectTasksWrapperEl.classList.add("task__cont");
      projectTasksWrapperEl.style.display = "none";

      contentEl.appendChild(projectTasksWrapperEl);
    }
  });
}

// We use this function to switch between all our projects and to display its tasks

function UISwitchProjects(activeProject) {
  // Remove .selected class from all projects
  document
    .querySelectorAll("[data-project]")
    .forEach((n) => n.classList.remove("selected"));

  if (typeof activeProject !== "object") {
    document.querySelector("[data-active-project-heading]").textContent =
      activeProject;
    return;
  }

  const activeProjectBtnEl = document.querySelector(
    `[data-project="${activeProject.name}"]`
  );
  activeProjectBtnEl.classList.add("selected");

  // Show active Project Tasks

  document.querySelector("[data-active-project-heading]").textContent =
    activeProject.name;

  const projectTaskContainerEls = document.querySelectorAll(
    ".task__board div[data-project-id]"
  );

  projectTaskContainerEls.forEach((el) => {
    if (el.getAttribute("data-project-id") !== activeProject.name) {
      el.style.display = "none";
    } else {
      el.style.display = "grid";
    }
  });

  document.querySelector("[data-sort-board]").style.display = "none";
}

export { UIRenderProjects, UISwitchProjects };
