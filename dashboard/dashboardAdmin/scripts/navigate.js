import { Dashboard } from './dashboardAdm.js'
import { Companies } from './companies.js'

export class Navigate {
    static async checkItem(ul) {
        ul.addEventListener('click', (event) => {
            const container     = document.querySelector('.showResults').childNodes[0]
            const title         = document.querySelector('.showResults__title')
            container.innerHTML = ''

            event.target.innerText == 'Empresas'
            ? this.manageCompanies(container, title) : event.target.innerText == 'Departamentos'
            ? this.manageDepartments() : event.target.innerText == 'Sair'
            ? this.logout() : this.sectors()
        })
    }

    static async sectors() {
        Dashboard.dashboardBody()
    }

    static async manageCompanies(container, title) {
        const allCards       = await Companies.cards()
        const asideOptions   = await Companies.aside()

        container.innerHTML = ''
        title.innerText     = 'Empresas'

        allCards.insertAdjacentElement('afterbegin', title)
        container.append(allCards, asideOptions)
    }
    
    static async manageDepartments() {
    }
    
    static async logout() {
    }
}