const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql';
const jwtToken = localStorage.getItem('JWT token');
const body = document.querySelector('.container');

export const showUserData = () => {
  const query = `query User {
        user {
        id
        login
        firstName
        lastName
        auditRatio
        xps {
            amount
            path
            }
        totalUp
        totalDown
      }
    }`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  console.log('showUserData() function called');
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log('GraphQL Response:', data);
      if (data && data.data && data.data.user) {
        const { firstName, lastName, login, auditRatio } = data.data.user[0];
        console.log('User Data:', { firstName, lastName, login, auditRatio });
        addUser(data.data.user[0]);
      } else {
        console.error('User data is missing or undefined in the API response.');
      }
    })
    .catch((error) => console.error('Error:', error.message));
};

const addUser = (data) => {
  const { firstName, lastName, login, auditRatio } = data;
  console.log(firstName, lastName, login);
  const user = document.createElement('div');
  user.classList.add('user');
  const first = document.createElement('p');
  first.classList.add('username');
  first.textContent = `You firstname is ${firstName}`;
  const last = document.createElement('p');
  last.classList.add('username');
  last.textContent = `You lastname is ${lastName}`;
  const log = document.createElement('p');
  log.classList.add('username');
  log.textContent = `You login is ${login}`;
  const audit = document.createElement('p');
  audit.classList.add('username');
  audit.textContent = `You audit rating is ${Math.round(auditRatio * 10) / 10}`;
  user.append(first, last, log, audit);
  body.textContent = '';
  body.append(user);
};
export const getTransactions = () => {
  const query = `query Transaction($where: {"type": {"_in": ["up", "down", "xp"] }}) {
        transaction(where:$where) {
        amount
      type
      createdAt
    }
    }`;
};

export const showProgress = async () => {
  const query = `query {
        progress(where: {
          object: {
            type: {_nregex: "exercise|raid|exam|module|games|administration"}
          }
          grade: {_is_null: false}
        }, order_by: {updatedAt: asc}) {
          id
          objectId
          updatedAt
          grade
          object {
            type
            name
          }
        }
      }`;
  const response = await fetch(
    'https://01.kood.tech/api/graphql-engine/v1/graphql',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    },
  );
  const data = response.json();
  data.then((data) => {
    const grade = data.data.progress.map((project) => project.grade);
    const sum = grade.reduce((acc, next) => acc + next, 0);
    const avg = (sum / grade.length).toFixed(2);
    console.log(data.data.progress[0].object.name);
    let sumxp = 0;
    const projects = data.data.progress.map((project) => {
      return showXPSum(project.object.name);
    });
    const results = Promise.all(projects.then());
    console.log(results);
  });
};

const showXPSum = async (projectName) => {
  const query = `
    query {
        transaction(
            where: { 
                object: {name: {_eq : "${projectName}"}}}
                order_by: {amount: desc},
                limit: 1)
            {
            object {
            name
            progresses (
                where : {
                    isDone: {_eq: true}
                }){
                    updatedAt
                }
            }
            amount
        }
    }`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const data = response.json();
  data.then((data) => {
    if (data.data.transaction[0]) {
      console.log(data.data.transaction[0].amount);

      return data.data.transaction[0].amount;
    }
  });
};
