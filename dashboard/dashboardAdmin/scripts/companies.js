import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Requests } from '../../../globalsrc/scripts/requests.js'
import { DashboardRequests } from './dashboardRequests.js'
import { Dashboard } from './dashboardAdm.js'
import { Navigate } from './navigate.js'
import { Modal } from '../../../globalsrc/scripts/modal.js'


export class Companies {
    static async cards() {
        const allCards = document.createElement('section')
        allCards.classList.add('cards')

        const companies   = await Requests.getCompanies()

        companies.forEach(async (company) => {
            let id          = company.uuid
            let departments = await DashboardRequests.getDepartmentsFromCompany(id)

            let card = await Cards.card(company, 'company', departments, 'departments')
            allCards.append(card)
        })

        return allCards
    }

    static async aside() {
        const asideOptions      = document.createElement('aside')
        const companyManagement = document.createElement('ul')
        const options           = ['Acessar empresas', 'Pesquisar empresa', 'Adicionar nova empresa']

        asideOptions.classList.add('options')
        companyManagement.classList.add('optionWrapper')

        for (let index = 0; index < options.length ; index++) {
            const companyManagementOption     = document.createElement('li')
            
            companyManagementOption.innerText = options[index]
            companyManagementOption.classList.add('option')

            companyManagement.append(companyManagementOption)
        }
        this.handleOptions(companyManagement)
        
        asideOptions.append(companyManagement)
        return asideOptions
    }

    static async handleOptions(optionWrapper) {
        optionWrapper.addEventListener('click', (event) => {
            const allCards = document.querySelector('.cards')

            event.target.innerText == 'Acessar empresas'
            ? this.accessCompanies(allCards) : event.target.innerText == 'Pesquisar empresa'
            ? this.searchCompanies(allCards) : event.target.innerText == 'Adicionar nova empresa'
            ? this.addCompanies(allCards) : undefined
        })
    }

    static async accessCompanies(allCards) {
        const result    = await this.showCards(allCards, 'Empresas')
        const container = result[0]
        const title     = result[1]
        Navigate.manageCompanies(container, title)        
    }
    
    static async searchCompanies(allCards) {
        const allInputs = [
            {search: ['search', 'Busque por setor ou nome da empresa']},
        ]

        this.form(allInputs, 'Pesquisar')
    }
    
    static async addCompanies(allCards) {        
        const allInputs = [
            {name: ['text', 'Nome da empresa']},
            {opening_hours: ['text', 'Horário de funcionamento']},
            {description: ['text', 'Descrição da empresa']},
            {sector: ['text', 'Digite o setor']},
        ]

        this.form(allInputs, 'Criar')
    }

    static async handleSearch(input) {
        const sectors     = await Requests.getSectors()
        const searchInput = input.value.trim()

        let onlySectorsName = sectors.map(sector => (sector.description).toLowerCase())

        if (onlySectorsName.includes(searchInput.toLowerCase())) {
            const allCards  = document.querySelector('.cards')
            const companies = await Requests.getCompaniesFromSector(`${searchInput[0].toUpperCase()}${searchInput.slice(1, searchInput.length)}`)

            if (companies.length == 0) {
                this.showCards(allCards, 'Não encontramos a sua busca.')
            } else {
                companies.forEach(async (company) => {
                    let cardWrapper = await Cards.card(company, 'company')
                    allCards.append(cardWrapper)
                })
                this.showCards(allCards, 'Empresas')
            }

        } else {
            console.log('n inclui')
        }
    }
    
    static async handleAdd(inputs) {
    }

    static async form(allInputs, type) {
        const body = document.querySelector('body')

        const modal = await Modal.modalForms(allInputs, type)
        body.append(modal)

        Modal.handleModal(modal)
    }

    static async showCards(allCards, titleContent) {
        const container = document.querySelector('.showResults').childNodes[0]
        const title     = document.querySelector('.showResults__title')

        allCards.innerHTML = ''

        title.innerText    = titleContent
        allCards.insertAdjacentElement('afterbegin', title)

        return [container, title]
    }
}