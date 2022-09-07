import { Requests } from "./requests.js"

export class MainFooter {
    static async footer() {
        const companies = await Requests.getCompanies()

        const footer    = document.createElement('footer')            
        const container = document.createElement('div')  
        const ul        = document.createElement('ul') 
        
        footer.classList.add('companies')
        container.classList.add('container')

        companies.forEach((company) => {
            const li = document.createElement('li')
            li.innerText = company.name
            ul.append(li) 
        })

        container.append(ul)
        footer.append(container)

        return footer
    }
}