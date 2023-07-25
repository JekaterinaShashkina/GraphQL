import { getUser } from './modules/getUser.js';
import { logout } from './modules/logout.js';
import { getLevel, showProgress, showUserData } from './modules/showData.js';

const init = async () => {
  if (!localStorage.getItem('JWT token')) {
    getUser();
  } else {
    showUserData();
    showProgress();
    getLevel();
    // logout(jwtToken);
  }
};

init();
