import { getUser } from './modules/getUser.js';
import { getLevel, showProgress, showUserData } from './modules/showData.js';

const init = () => {
  if (!localStorage.getItem('JWT token')) {
    getUser();
  } else {
    showUserData();
    showProgress();
    getLevel();
  }
};

init();
