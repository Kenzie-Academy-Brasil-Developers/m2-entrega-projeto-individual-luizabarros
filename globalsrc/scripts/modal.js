import { Companies } from '../../dashboard/dashboardAdmin/scripts/companies.js'
import { Departments } from '../../dashboard/dashboardAdmin/scripts/departments.js'
import { Workers } from '../../dashboard/dashboardAdmin/scripts/workers.js'

export class Modal {
    static async modalForms(allInputs, title) {
        const modalWrapper  = document.createElement('div')
        const form          = document.createElement('form')
        const formTitle     = document.createElement('h2')
        const fillInWrapper = document.createElement('div')
        const btnSignHeader = document.createElement('button')
        const closeBtn      = document.createElement('div')

        modalWrapper.classList.add('modalWrapper')
        form.classList.add('modal')
        fillInWrapper.classList.add('fillInWrapper')
        closeBtn.classList.add('closeBtn')
        
        formTitle.innerText     = title
        btnSignHeader.innerText = 'Enviar'

        allInputs.forEach(element => {
            const input          = document.createElement('input')
            input.type           = Object.values(element)[0][0]
            input.placeholder    = Object.values(element)[0][1]
            fillInWrapper.append(input)
        })

        form.append(closeBtn, formTitle, fillInWrapper, btnSignHeader)
        modalWrapper.append(form)

        return modalWrapper
    }

    static async handleModal(modal, target, parentElement) {
        modal.addEventListener('click', (event) => {
            event.preventDefault()
            this.modalBtn(event, modal, target, parentElement)
        })
    }

    static async modalBtn(event, modal, target, parentElement) {
        const allCards = document.querySelector('.cards')
        const closeBtn = document.querySelector('.closeBtn')
        let inputs     = document.querySelectorAll('input')

        if (event.target.tagName == 'BUTTON' || event.target.classList[0] == closeBtn.classList[0]) {
            modal.classList.add('inactive')
            
            if (event.target.tagName == 'BUTTON') {
                if (target.innerText == 'Editar dados') {
                    Workers.getAnswers(inputs, parentElement)
                } else if (inputs[0].type == 'search') {
                    target.innerText == 'Pesquisar empresa' 
                    ? await Companies.handleSearch(inputs[0]) 
                    : target.innerText == 'Acessar departamentos de uma empresa'
                    ? await Departments.showDepartments(inputs[0], allCards)
                    : target.innerText.includes('Mostrar')
                    ? await Departments.handleSearch(inputs[0])
                    : target.innerText.includes('Deletar')
                    ? await Departments.delete(inputs[0], allCards)
                    : target.innerText.includes('Editar')
                    ? await Departments.edit(inputs[0], allCards)
                    : await Workers.manageWorkers(inputs, allCards)
                } else if (inputs[0].type == 'text') {
                    target.innerText == 'Adicionar nova empresa' ? await Companies.handleAdd(inputs) : await Departments.handleAdd(inputs)
                }
            }
            document.querySelector('.modalWrapper').remove()
        } else {
            modal.classList.remove('inactive')
        }
    }

    static async handleModalEdit(modal, departmentID, company) {
        modal.addEventListener('click', (event) => {
            event.preventDefault()
            this.modalBtnEdit(event, modal, departmentID, company)
        })
    }

    static async modalBtnEdit(event, modal, departmentID, company) {
        const allCards = document.querySelector('.cards')
        const closeBtn = document.querySelector('.closeBtn')
        let inputs     = document.querySelectorAll('input')

        if (event.target.tagName == 'BUTTON' || event.target.classList[0] == closeBtn.classList[0]) {
            document.querySelector('.modalWrapper').remove()
            Departments.getEditInfo(inputs, departmentID, company)
        } else {
            modal.classList.remove('inactive')
        }
    }
}