import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Requests } from '../../../globalsrc/scripts/requests.js'
import { Toast } from '../../../globalsrc/scripts/toast.js'
import { Companies } from './companies.js'
import { DashboardRequests } from './dashboardRequests.js'
import { ShowCards } from './showCards.js'
import { Modal } from '../../../globalsrc/scripts/modal.js'

export class Departments {
    static async cards() {
        const allCards = document.createElement('section')
        allCards.classList.add('cards')

        return allCards
    }

    static async aside() {
        const asideOptions         = document.createElement('aside')
        const departmentManagement = document.createElement('ul')
        const options              = ['Acessar departamentos de uma empresa', 'Acessar funcionários do departamento de uma empresa','Acessar usuários sem departamento']

        asideOptions.classList.add('options')
        departmentManagement.classList.add('optionWrapper')

        for (let index = 0; index < options.length ; index++) {
            const departmentManagementOption     = document.createElement('li')
            
            departmentManagementOption.innerText = options[index]
            departmentManagementOption.classList.add('option')

            departmentManagement.append(departmentManagementOption)
        }
        this.handleOptions(departmentManagement)
        
        asideOptions.append(departmentManagement)
        return asideOptions
    }

    static async handleOptions(optionWrapper) {
        optionWrapper.addEventListener('click', (event) => {
            const allCards = document.querySelector('.cards')

            event.target.innerText == 'Acessar departamentos de uma empresa'
            ? this.accessDeparments(allCards, event.target) : event.target.innerText == 'Acessar usuários sem departamento'
            ? this.accessUnemployed(allCards) : this.accessWorkers(allCards, event.target)
        })
    }

    static async accessDeparments(allCards, target) {
        allCards.childNodes.forEach((element, index) => {
            if (index != 0) {
                element.style.display = 'none'
            } else {
                element.innerText = 'Você está na seção de departamentos.'
            }
        })
        Companies.searchCompanies(allCards, 'Busque pelo nome da empresa', target)
    }

    static async showDepartments(companyInput, allCards) {
        companyInput = companyInput.value == undefined ? companyInput : companyInput.value

        const mainTitle                          = allCards.childNodes[0]
        const titleWrapper                       = document.createElement('div')
        const createDepartmentsFromCompany       = document.createElement('h3')
        const showSpecificDepartmentsFromCompany = document.createElement('h3')
        const editDepartmentFromCompany          = document.createElement('h3')
        const deleteDepartmentFromCompany        = document.createElement('h3')

        mainTitle.innerText                           = `Departamentos da empresa ${companyInput}`
        createDepartmentsFromCompany.innerText        = `Criar departamentos para a empresa ${companyInput}`
        showSpecificDepartmentsFromCompany.innerText  = `Mostrar departamento específico da empresa ${companyInput}`
        editDepartmentFromCompany.innerText           = `Editar departamento específico da empresa ${companyInput}`
        deleteDepartmentFromCompany.innerText         = `Deletar departamento específico da empresa ${companyInput}`
        titleWrapper.classList.add('titleWrapper')

        let companies      = await Requests.getCompanies()
        const foundCompany = companies.find(company => {
            return company.name.toLowerCase() == companyInput.toLowerCase()
        })
        this.getTitles(titleWrapper, allCards)

        titleWrapper.append(createDepartmentsFromCompany, showSpecificDepartmentsFromCompany, editDepartmentFromCompany, deleteDepartmentFromCompany)
        allCards.append(titleWrapper)
        Companies.companyDefault(foundCompany, allCards, 'department')
    }

    static async getTitles(titleWrapper, allCards) {
        titleWrapper.addEventListener('click', (event) => {
            event.target.innerText.includes('Criar') ? this.addNewDepartment(allCards, event.target) : this.showSpecificDepartment(allCards, event.target)
        })
    }

    static async addNewDepartment(allCards, target) {
        Companies.addCompanies(allCards, 'department', target)
    }

    static async showSpecificDepartment(allCards, target) {
        Companies.searchCompanies(allCards, 'Busque pelo nome do departamento', target)
    }

    static async handleSearch(input) {
        const searchInput = input.value.trim()
        const allCards    = document.querySelector('.cards')
        let departments   = document.querySelectorAll('ul')[1].childNodes
        let found         = 0

        departments = Array.from(departments)
        departments.shift()

        departments.forEach(async (department) => {
            department.classList.remove('inactive')
            const departmentName = department.childNodes[0].innerText.toLowerCase()
            if (!departmentName.includes(searchInput.toLowerCase())) {
                department.classList.add('inactive')
            } else {
                found++
            }
        })
        if (found == 0) {
            ShowCards.showCards(allCards, 'Não encontramos a sua busca.')
        }
    }

    static async delete(input, allCards) {
        const departments = await DashboardRequests.getDepartments()
        const foundDepartment = departments.find(department => {
            return department.name.toLowerCase() == input.value.toLowerCase()
        })
        DashboardRequests.deleteDepartment(foundDepartment.uuid)
        document.querySelector('.card').remove()
        document.querySelector('.titleWrapper').remove()
        this.showDepartments(foundDepartment.companies.name, allCards)
    }

    static async edit(input, allCards) {
        const body = document.querySelector('body')

        const departments     = await DashboardRequests.getDepartments()
        const foundDepartment = departments.find(department => {
            return department.name.toLowerCase() == input.value.toLowerCase()
        })

        if (foundDepartment == undefined) {
            Toast.toast('Erro na busca', '#ff0844', '#ffb199')
        } else {
            const allInputs = [
                {name: ['text', 'Editar nome do departamento']},
                {description: ['text', 'Editar descrição do departamento']},
            ]
    
            const modal = await Modal.modalForms(allInputs, 'Editar dados')
            body.append(modal)
    
            Modal.handleModalEdit(modal, foundDepartment.uuid, foundDepartment.companies.name)
        }
    }

    static async getEditInfo(inputs, departmentID, company) {
        const allCards    = document.querySelector('.cards')       

        const body = {
            name: inputs[0].value.trim(),
            description: inputs[1].value.trim()
        }
        
        DashboardRequests.editDepartment(body, departmentID)

        document.querySelector('.card').remove()
        document.querySelector('.titleWrapper').remove()
        this.showDepartments(company, allCards)
    }

    static async handleAdd(inputs) {
        const allCards               = document.querySelector('.cards')
        const departmentName         = inputs[0].value.trim()
        const departmentDescription  = inputs[1].value.trim()
        const departmentFromCompany  = inputs[2].value.trim()

        let companies      = await Requests.getCompanies()
        const foundCompany = companies.find(company => {
            return company.name.toLowerCase() == departmentFromCompany.toLowerCase()
        })

        if (foundCompany == undefined) {
            Toast.toast('Erro no cadastro do departamento', '#ff0844', '#ffb199')
        } else {
            const body = {
                name: departmentName,
                description: departmentDescription,
                company_uuid: foundCompany.uuid
            }
    
            const response = await DashboardRequests.createDepartment(body)
            
            if (Object.keys(response)[0] == 'error') {
                Toast.toast('Erro no cadastro do departamento', '#ff0844', '#ffb199')
            } else {
                Toast.toast('Departamento cadastrado com sucesso!', '#00b09b', '#96c93d')
            }
            document.querySelector('.card').remove()
            document.querySelector('.titleWrapper').remove()
            this.showDepartments(inputs[2], allCards)
        }
    }

    static async accessUnemployed(allCards) {
        const unemployed = await DashboardRequests.getUnemployed()
        
        unemployed.forEach(async (person) => {
            let cardWrapper = await Cards.card(person, 'person')
            allCards.append(cardWrapper)
        })
        
        ShowCards.showCards(allCards, 'Usuários sem departamento')
        
        allCards.addEventListener('click', (event) => this.hire(event))
    }

    static async hire(event) {
        if (event.target.innerText == 'Contratar') {
            const allInputs = [
                {searchName: ['search', 'Nome do funcionário']},
                {searchDepartment: ['search', 'Nome do departamento']},
            ]
    
            Companies.form(allInputs, 'Pesquisar', event.target)
        }
    }

    static async getInfoToHire(inputs, allCards) {
        const worker     = inputs[0].value.trim()
        const department = inputs[1].value.trim()

        const unemployed  = await DashboardRequests.getUnemployed()
        const departments = await DashboardRequests.getDepartments()

        await unemployed.forEach(async (user) => {
            await departments.forEach(async (element) => {
                if (element.name == department && user.username == worker) {
                    const body = {
                        user_uuid: user.uuid,
                        department_uuid: element.uuid
                    }
                    await DashboardRequests.hire(body)
                }
            })
        })
        alert('É necessário atualizar a página para que as alterações façam efeito.')
    }

    static async accessWorkers(allCards, target) {
        const body      = document.querySelector('body')
        const allInputs = [
            {companyName: ['search', 'Nome da empresa']},
            {departmentName: ['search', 'Nome do departamento']},
        ]

        const modal = await Modal.modalForms(allInputs, 'Pesquisar')
        body.append(modal)

        Modal.handleModal(modal, target)
    }
}