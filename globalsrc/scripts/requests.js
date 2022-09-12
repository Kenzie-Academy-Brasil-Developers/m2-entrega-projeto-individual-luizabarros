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
            headers: this.header
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