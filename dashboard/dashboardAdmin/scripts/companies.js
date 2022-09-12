import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Requests } from '../../../globalsrc/scripts/requests.js'
import { DashboardRequests } from './dashboardRequests.js'
import { Dashboard } from './dashboardAdm.js'
import { Navigate } from './navigate.js'
import { Modal } from '../../../globalsrc/scripts/modal.js'
import { Toast } from '../../../globalsrc/scripts/toast.js'
import { ShowCards } from './showCards.js'


export class Companies {
    static async cards() {
        let allCards = document.createElement('section')
        let result   = null
        allCards.classList.add('cards')

        let companies   = await Requests.getCompanies()

        companies.forEach(async (company) => {
            result = this.companyDefault(company, allCards, 'company')
        })
        allCards = result
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
            ? this.searchCompanies(allCards, 'Busque por setor ou nome da empresa', event.target) : event.target.innerText == 'Adicionar nova empresa'
            ? this.addCompanies(allCards, 'company', event.target) : undefined
        })
    }

    static async accessCompanies(allCards) {
        const result    = await ShowCards.showCards(allCards, 'Empresas')
        const container = result[0]
        const title     = result[1]
        Navigate.manageCompanies(container, title)        
    }
    
    static async searchCompanies(allCards, placeholder, target) {
        const allInputs = [
            {search: ['search', placeholder]},
        ]

        this.form(allInputs, 'Pesquisar', target)
    }
    
    static async addCompanies(allCards, type='', target='') {
        let allInputs = null
        if (type == 'company') {
            allInputs = [
                {name: ['text', 'Nome da empresa']},
                {opening_hours: ['text', 'Horário de funcionamento']},
                {description: ['text', 'Descrição da empresa']},
                {sector: ['text', 'Digite o setor']},
            ]
        } else {
            allInputs = [
                {name: ['text', 'Nome do departamento']},
                {description: ['text', 'Descrição do departamento']},
                {company: ['text', 'Nome da empresa responsável pelo departamento']}
            ]
        }
        this.form(allInputs, 'Criar', target)
    }

    static async handleSearch(input) {
        const sectors     = await Requests.getSectors()
        const searchInput = input.value.trim()
        let companies     = 0

        let onlySectorsName = sectors.map(sector => (sector.description).toLowerCase())

        if (onlySectorsName.includes(searchInput.toLowerCase())) {
            const allCards  = document.querySelector('.cards')

            if (searchInput.toLowerCase() == 'ti') {
                companies = await Requests.getCompaniesFromSector(`${searchInput.toUpperCase()}`)
            } else {
                companies = await Requests.getCompaniesFromSector(`${searchInput[0].toUpperCase()}${searchInput.slice(1, searchInput.length)}`)
            }

            if (companies.length == 0) {
                ShowCards.showCards(allCards, 'Não encontramos a sua busca.')
            } else {
                companies.forEach(async (company) => {
                    let cardWrapper = await Cards.card(company, 'company')
                    allCards.append(cardWrapper)
                })
                ShowCards.showCards(allCards, 'Empresas')
            }

        } else {
            const allCards  = document.querySelector('.cards')
            let companies   = allCards.childNodes
            let found       = 0

            companies = Array.from(companies)
            companies.shift()

            companies.forEach(async (company) => {
                company.classList.remove('inactive')
                const companyName = company.childNodes[0].innerText.toLowerCase()
                if (!companyName.includes(searchInput.toLowerCase())) {
                    company.classList.add('inactive')
                } else {
                    found++
                }
            })
            if (found == 0) {
                ShowCards.showCards(allCards, 'Não encontramos a sua busca.')
                setTimeout(() => {
                    this.accessCompanies(allCards)
                }, 2000)
            }
        }
    }
    
    static async handleAdd(inputs) {
        const allCards            = document.querySelector('.cards')
        const companyName         = inputs[0].value.trim()
        const companyOpeningHours = inputs[1].value.trim()
        const companyDescription  = inputs[2].value.trim()
        const companySector       = inputs[3].value.trim()

        const sectors     = await Requests.getSectors()
        const foundSector = sectors.find(sector => {
            return sector.description.toLowerCase() == companySector.toLowerCase()
        })

        if (foundSector == undefined) {
            Toast.toast('Erro no cadastro da empresa', '#ff0844', '#ffb199')
        } else {
            const body = {
                name: companyName,
                opening_hours: companyOpeningHours,
                description: companyDescription,
                sector_uuid: foundSector.uuid
            }
    
            const response = await Requests.createCompany(body)
            
            if (Object.keys(response)[0] == 'error') {
                Toast.toast('Erro no cadastro da empresa', '#ff0844', '#ffb199')
            } else {
                Toast.toast('Empresa cadastrada com sucesso!', '#00b09b', '#96c93d')
            }
            this.accessCompanies(allCards)
        }
    }

    static async form(allInputs, type, target) {
        const body = document.querySelector('body')

        const modal = await Modal.modalForms(allInputs, type)
        body.append(modal)

        Modal.handleModal(modal, target)
    }

    static async companyDefault(company, allCards, type, user) {
        let id          = company.uuid
        let departments = await DashboardRequests.getDepartmentsFromCompany(id)

        if (type == 'company') {
            let card = await Cards.card(company, 'company', departments, 'departments')
            allCards.append(card)
        } else {
            let card = await Cards.card(departments, 'department', user)
            allCards.append(card)
        }

        return allCards
    }
}