import { addUser } from './addUser.js';
import { showAuditGraphic, showProgressGraphic } from './graphics.js';

const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql';
const jwtToken = localStorage.getItem('JWT token');
const body = document.querySelector('.container');

export const showUserData = () => {
  // body.innerHTML = '';
  const query = `query User {
        user {
        id
        login
        firstName
        lastName
        auditRatio
        attrs
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
        addUser(data.data.user[0], body);
        showAuditGraphic(data.data.user[0], body);
      } else {
        console.error('User data is missing or undefined in the API response.');
      }
    })
    .catch((error) => console.error('Error:', error.message));
};

export const getLevel = async () => {
  const query = `  query{
        user {
            id
            }
        transaction (
            where: { type:{_eq: "level"}, object: {type: {_nregex: "exercise|raid"}}}
            limit: 1
            offset: 0
            order_by: {amount: desc}
            ) {
            amount
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

  const data = await response.json();
  const lvl = document.createElement('div');
  lvl.classList.add('lvl');
  lvl.textContent = `Current level ${data.data.transaction[0].amount}`;
  body.append(lvl);
  console.log(data.data.transaction[0].amount);
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
  const data = await response.json();
  const grade = data.data.progress.map((project) => project.grade);
  const sum = grade.reduce((acc, next) => acc + next, 0);
  const avg = (sum / grade.length).toFixed(2);
  // console.log(data.data.progress);
  const projects = data.data.progress.map((project) => {
    return showXPSum(project.object.name);
  });
  const res = await Promise.all(projects);
  // console.log(res);
  const totalXP = res.reduce((acc, xp) => acc + xp, 0);
  const xp = document.createElement('div');
  xp.classList.add('xp');
  xp.textContent = `Total XP ${Math.round(totalXP / 1000)}KB`;
  body.append(xp);
  showProgressGraphic(data.data.progress, res, totalXP, body);
  console.log(Math.round(totalXP / 1000));
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
  const data = await response.json();
  if (data.data.transaction[0]) {
    return data.data.transaction[0].amount;
  } else {
    return 0;
  }
};
