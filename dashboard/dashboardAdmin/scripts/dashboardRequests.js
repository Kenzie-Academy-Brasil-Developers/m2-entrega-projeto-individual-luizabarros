export class DashboardRequests {
    static baseUrl   = 'http://localhost:6278/'
    static token     =  localStorage.getItem('@Faiyaz:token')
    static isAdmin   =  localStorage.getItem('@Faiyaz:is_admin')
    static header    = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
    }

    static async getDepartmentsFromCompany(id) {
        const departments = await fetch(`${this.baseUrl}departments/${id}`, {
            method: 'GET',
            headers: this.header
        })
        .then(response => response.json())
        return departments
    }
    
    static async getUnemployed() {
        const unemployed = await fetch(`${this.baseUrl}admin/out_of_work`, {
            method: 'GET',
            headers: this.header
        })
        .then(response => response.json())
        return unemployed
    }

    static async createDepartment(department) {
        const response = await fetch(`${this.baseUrl}departments`, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(department)
        })
        .then(data => data.json())
        return response        
    }

    static async getDepartments() {
        const departments = await fetch(`${this.baseUrl}departments`, {
            method: 'GET',
            headers: this.header
        })
        .then(response => response.json())
        return departments        
    }

    static async deleteDepartment(id) {
        const response = await fetch(`${this.baseUrl}departments/${id}`, {
            method: 'DELETE',
            headers: this.header
        })
    }
    
    static async editDepartment(body, id) {
        const departments = await fetch(`${this.baseUrl}departments/${id}`, {
            method: 'PATCH',
            headers: this.header,
            body: JSON.stringify(body)
        })
    }

    static async getUsers() {
        const users = await fetch(`${this.baseUrl}users`, {
            method: 'GET',
            headers: this.header
        })
        .then(response => response.json())
        return users        
    }

    static async editWorkerInfo(body, id) {
        const user = await fetch(`${this.baseUrl}admin/update_user/${id}`, {
            method: 'PATCH',
            headers: this.header,
            body: JSON.stringify(body)
        })        
    }

    static async dismissWorker(id) {
        const user = await fetch(`${this.baseUrl}departments/dismiss/${id}`, {
            method: 'PATCH',
            headers: this.header
        })        
    }

    static async hire(body) {
        const user = await fetch(`${this.baseUrl}departments/hire`, {
            method: 'PATCH',
            headers: this.header,
            body: JSON.stringify(body)
        })        
        return user
    }
}