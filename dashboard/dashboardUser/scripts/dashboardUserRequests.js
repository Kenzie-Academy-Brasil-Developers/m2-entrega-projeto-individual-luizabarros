export class DashboardUserRequests {
    static baseUrl   = 'http://localhost:6278/'
    static token     =  localStorage.getItem('@Faiyaz:token')
    static isAdmin   =  localStorage.getItem('@Faiyaz:is_admin')
    static header    = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
    }

    static async getDepartments() {
        const departments = await fetch(`${this.baseUrl}users/departments`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        return departments
    }

    static async getCoworkers() {
        const coworkers = await fetch(`${this.baseUrl}users/departments/coworkers`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        return coworkers
    }

    static async editUser(body) {
        const user = await fetch(`${this.baseUrl}users`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        return user
    }
}