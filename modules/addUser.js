export const addUser = (data, body) => {
  const { firstName, lastName, login, attrs, createdAt } = data;
  console.log(firstName, lastName, login, attrs.image, createdAt);
  const date = new Date(Date.parse(createdAt)).toLocaleString('us-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log(date);
  const user = document.createElement('div');
  user.classList.add('user');
  const name = document.createElement('h2');
  name.classList.add('username');
  name.textContent = `Welcome ${firstName} ${lastName}`;
  const log = document.createElement('p');
  log.classList.add('username');
  log.textContent = `Login: ${login}`;
  const joined = document.createElement('p');
  joined.classList.add('username');
  joined.textContent = `Joined on ${date}`;
  const mail = document.createElement('p');
  mail.classList.add('username');
  mail.textContent = `Friends can write you to ${attrs.email}`;
  const img = new Image();
  img.classList.add('avatar');
  img.src = `${attrs.image}`;
  const logoutBtn = document.createElement('button');
  logoutBtn.classList.add('logout');
  logoutBtn.textContent = 'Log out';
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    localStorage.removeItem('JWT token');
    location.reload();
  });
  user.append(name, log, joined, mail, img, logoutBtn);
  body.textContent = '';
  body.append(user);
};
