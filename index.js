import { fetchRequest } from './modules/fetchRequest.js';
import { showProgress, showUserData } from './modules/showData.js';

const form = document.querySelector('.signin__form');
const submitBtn = document.querySelector('.form__submit');
const jwtToken = localStorage.getItem('JWT token');
const body = document.querySelector('.container');

const getUser = () => {
  form.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = e.target;
    if (target === submitBtn) {
      const username = form.name.value;
      const password = form.password.value;
      console.log(username, password);
      const credentials = btoa(`${username}:${password}`);
      console.log(credentials);

      const result = await fetchRequest(
        'https://01.kood.tech/api/auth/signin',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          callback: (err, data) => {
            if (err) {
              console.warn(err, data);
              return;
            }
            return data;
          },
        },
      );
      console.log(result);
      localStorage.setItem('JWT token', result);
      showUserData();
    }
  });
};

if (jwtToken) {
  showUserData();
  showProgress();
} else {
  getUser();
}
