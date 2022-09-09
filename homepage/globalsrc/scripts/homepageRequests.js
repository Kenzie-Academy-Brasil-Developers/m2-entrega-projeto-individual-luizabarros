export class HomepageRequests {
    static baseUrl  = 'http://localhost:6278/'
    static tokenAdm = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjM2MjMzZGUtZDY2My00OGI4LWFiZmYtZmQzNzgxMTU5Mjg4IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjE0NTk2MSwiZXhwIjoxNjYzMDA5OTYxLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.e2l3VxvLDDD8yDDcfLAXGi6pY6_X9AinAhuk673tkXs'
    static header   = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.tokenAdm}`
    }

    static async login(body) {
        const userLogin = await fetch(`${this.baseUrl}auth/login`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(res => {
            localStorage.setItem('@Faiyaz:token', res.token)
            localStorage.setItem('@Faiyaz:is_admin', res.is_admin)
            localStorage.setItem('@Faiyaz:uuid', res.uuid)

            return res
        })
        return userLogin
    }

    static async signup(body) {
        const userSignUp = await fetch(`${this.baseUrl}auth/register/user`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        return userSignUp
    }
}