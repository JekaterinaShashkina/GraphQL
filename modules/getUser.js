const form = document.querySelector('.signin__form');
const submitBtn = document.querySelector('.form__submit');
const error = document.querySelector('.error');

export const getUser = () => {
  form.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = e.target;
    if (target === submitBtn) {
      const username = form.name.value;
      const password = form.password.value;
      const credentials = btoa(`${username}:${password}`);
      fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            error.textContent = data.error;
            console.log(data.error);
          } else {
            localStorage.setItem('JWT token', data);
            location.reload();
            console.log('GraphQL Response:', data);
          }
        })
        .catch((error) => console.warn('Error:', error.message));
    }
  });
};
