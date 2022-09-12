import { Dashboard } from './dashboardAdm.js'
import { Companies } from './companies.js'
import { Departments } from './departments.js'

export class Navigate {
    static async checkItem(ul) {
        ul.addEventListener('click', (event) => {
            const container     = document.querySelector('.showResults').childNodes[0]
            const title         = document.querySelector('.showResults__title')

            container.innerHTML = ''

            event.target.innerText == 'Empresas'
            ? this.manageCompanies(container, title) : event.target.innerText == 'Departamentos'
            ? this.manageDepartments(container, title) : event.target.innerText == 'Sair'
            ? this.logout() : this.sectors()
        })
    }

    static async sectors() {
        Dashboard.dashboardBody()
    }

    static async manageCompanies(container, title) {
        const allCards       = await Companies.cards()
        const asideOptions   = await Companies.aside()
        const titleContent   = 'Empresas'
        this.handleMain(container, title, allCards, asideOptions, titleContent)
    }
    
    static async manageDepartments(container, title) {
        const allCards       = await Departments.cards()
        const asideOptions   = await Departments.aside()
        const titleContent   = 'Você está na seção de departamentos.'
        this.handleMain(container, title, allCards, asideOptions, titleContent)
    }
    
    static async logout() {
        localStorage.removeItem('@Faiyaz:token')
        localStorage.removeItem('@Faiyaz:is_admin')
        localStorage.removeItem('@Faiyaz:uuid')
        window.location.replace('../../index.html')
    }

    static async handleMain(container, title, allCards, asideOptions, titleContent) {
        container.innerHTML = ''
        title.innerText     = titleContent

        allCards.insertAdjacentElement('afterbegin', title)
        container.append(allCards, asideOptions)
    }
}