const form = document.querySelector('.signin__form')
const submitBtn = document.querySelector('.form__submit')
const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql'

form.addEventListener('click',async (e)=>{
    e.preventDefault()
    const target = e.target
    if (target === submitBtn) {
       const username = form.name.value;
       const password = form.password.value
       console.log(username, password);
    const credentials  = btoa(`${username}:${password}`)
    console.log(credentials);

    const result = await fetchRequest('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
        callback: (err, data) => {
            if (err) {
                console.warn(err, data)
              return
            }
            return data
        }
    })
    console.log(result);
    localStorage.setItem('JWT token', result)


    }
})
const makeRequest = async (query, result) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Autorization': `Bearer ${result}`,
    },
    body: JSON.stringify({query})
  })
  return await res.json()
} 
makeRequest(`query {
    user {
      firstName
      lastName
      login
    }
  };`, localStorage.getItem('JWT token')).then(console.log)


export const fetchRequest = async (url,{
    method = 'GET',
    callback,
    body,
    headers,
}) => {
    try {
        const options = {
            method,
        }
        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;
        const response = await fetch(url, options)

        if (response.ok) {
            const data = await response.json()
            if (callback) return callback(null, data)
            return
        } 
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
    } catch (error) {
       return callback(error);
    }
}