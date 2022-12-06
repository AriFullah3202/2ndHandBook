export const setAuthToken = user => {
    console.log("the user is ", user)

    //   Save user in db & get token
    fetch(`http://localhost:5000/user/${user.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //Save token in LocalStorage
            localStorage.setItem('accessToken', data.token)
        })
        .catch(err => {
            console.log(err)
        })
}