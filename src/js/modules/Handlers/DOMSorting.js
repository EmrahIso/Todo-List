// Logic imports
import {
  sortBoardInbox,
  sortBoardCompleted,
  sortBoardWeek,
} from '../logic/TaskManager.js';
import { switchActiveProject } from '../logic/project.js';

// UI imports
import { UISwitchProjects } from '../UI/UIProject.js';
import { UIRenderTasks } from '../UI/UITask.js';

const DOMSort = (function () {
  const sortNavigationEl = document.querySelector('[data-sort-projects]');

  const sortInboxBtnClickEventHandler = (e) => {
    UIRenderTasks('sort', sortBoardInbox());
    switchActiveProject(null);
    UISwitchProjects('Inbox');
  };

  const sortCompletedBtnClickEventHandler = (e) => {
    UIRenderTasks('sort', sortBoardCompleted());
    switchActiveProject(null);
    UISwitchProjects('Completed');
  };

  const sortWeekBtnClickEventHandler = (e) => {
    UIRenderTasks('sort', sortBoardWeek());
    switchActiveProject(null);
    UISwitchProjects('Week');
  };

  return {
    sortNavigationEl,
    sortInboxBtnClickEventHandler,
    sortCompletedBtnClickEventHandler,
    sortWeekBtnClickEventHandler,
  };
})();

export { DOMSort };
