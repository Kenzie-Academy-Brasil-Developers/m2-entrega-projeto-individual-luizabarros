export class Requests {
    static baseUrl  = 'http://localhost:6278/'
    static token    =  localStorage.getItem('@Faiyaz:token')
    static header   = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
    }

    static async getSectors() {
        const sectors = await fetch(`${this.baseUrl}sectors`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjM2MjMzZGUtZDY2My00OGI4LWFiZmYtZmQzNzgxMTU5Mjg4IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjE0NTk2MSwiZXhwIjoxNjYzMDA5OTYxLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.e2l3VxvLDDD8yDDcfLAXGi6pY6_X9AinAhuk673tkXs`
            }
        })
        .then(data => data.json())
        return sectors
    }

    static async getCompanies() {
        const companies = await fetch(`${this.baseUrl}companies`)
        .then(data => data.json())
        return companies
    }

    static async getCompaniesFromSector(sector) {
        const companies = await fetch(`${this.baseUrl}companies/${sector}`)
        .then(data => data.json())
        return companies
    }

    static async createCompany(company) {
        const response = await fetch(`${this.baseUrl}companies`, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(company)
        })
        .then(data => data.json())
        return response        
    }
}