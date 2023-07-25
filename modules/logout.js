export const logout = (token) => {
  const btn = document.querySelector('.logout');
  btn.addEventListener('click', (e) => {
    console.log(e);
    localStorage.removeItem(token);
    location.reload();
  });
};
