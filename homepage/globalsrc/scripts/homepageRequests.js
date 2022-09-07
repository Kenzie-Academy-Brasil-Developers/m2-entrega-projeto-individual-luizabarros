export class HomepageRequests {
    static baseUrl = 'http://localhost:6278/'
    static token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjM2MjMzZGUtZDY2My00OGI4LWFiZmYtZmQzNzgxMTU5Mjg4IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjE0NTk2MSwiZXhwIjoxNjYzMDA5OTYxLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.e2l3VxvLDDD8yDDcfLAXGi6pY6_X9AinAhuk673tkXs'
    static header  = {
        "Content-type": "application/json",
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
}