export class DashboardUserRequests {
    static baseUrl   = 'http://localhost:6278/'
    static tokenUser =  localStorage.getItem('@Faiyaz:token')
    static isAdmin   =  localStorage.getItem('@Faiyaz:is_admin')
    static tokenAdm  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjM2MjMzZGUtZDY2My00OGI4LWFiZmYtZmQzNzgxMTU5Mjg4IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjE0NTk2MSwiZXhwIjoxNjYzMDA5OTYxLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.e2l3VxvLDDD8yDDcfLAXGi6pY6_X9AinAhuk673tkXs'
    static token     = this.isAdmin == 'true' ? this.tokenAdm : this.tokenUser
    static header    = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
    }

    static async getDepartments() {
        const departments = await fetch(`${this.baseUrl}users/departments`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${this.tokenAdm}`
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
                Authorization: `Bearer ${this.tokenAdm}`
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
                Authorization: `Bearer ${this.tokenAdm}`
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        return user
    }
}