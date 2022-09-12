export class HomepageRequests {
    static baseUrl  = 'http://localhost:6278/'
    static token    =  localStorage.getItem('@Faiyaz:token')
    static header   = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
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