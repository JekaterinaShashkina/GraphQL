export const addUser = (data, body) => {
  const { firstName, lastName, login, attrs, createdAt } = data;
  const date = new Date(Date.parse(createdAt)).toLocaleString('us-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const user = document.createElement('div');
  user.classList.add('user');
  const name = document.createElement('h2');
  name.classList.add('user__title');
  name.textContent = `Welcome ${firstName} ${lastName}`;
  const userWrapper = document.createElement('div');
  userWrapper.classList.add('user__wrapper');
  const log = document.createElement('p');
  log.classList.add('username');
  log.textContent = `Login: ${login}`;
  const joined = document.createElement('p');
  joined.classList.add('username');
  joined.textContent = `Joined on ${date}`;
  const mail = document.createElement('p');
  mail.classList.add('username');
  mail.innerHTML = `
  <span>Friends can write you to </span><a href=mailto:${attrs.email}>${attrs.email}</a> `;
  userWrapper.append(log, joined, mail);
  const img = new Image();
  img.classList.add('user__avatar');
  img.src = `${attrs.image}`;
  const logoutBtn = document.createElement('button');
  logoutBtn.classList.add('logout');
  logoutBtn.textContent = 'Log out';
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('JWT token');
    location.reload();
  });
  user.append(name, img, userWrapper, logoutBtn);
  body.textContent = '';
  body.append(user);
};
