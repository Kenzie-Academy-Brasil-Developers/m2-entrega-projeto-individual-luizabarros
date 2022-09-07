export class Requests {
    static baseUrl = 'http://localhost:6278/'

    static async getCompanies() {
        const companies = await fetch(`${this.baseUrl}companies`)
        .then(data => data.json())
        return companies
    }
}