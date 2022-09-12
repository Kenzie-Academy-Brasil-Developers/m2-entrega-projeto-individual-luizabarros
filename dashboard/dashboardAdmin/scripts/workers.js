import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Modal } from '../../../globalsrc/scripts/modal.js'
import { DashboardRequests } from './dashboardRequests.js'

export class Workers {
    static async manageWorkers(inputs, allCards) {
        this.changeVisibility(allCards)        
        
        const users       = await DashboardRequests.getUsers()
        const departments = await DashboardRequests.getDepartments()

        await users.forEach(async (user) => {
            await departments.forEach(async (department) => {

                if (user.department_uuid == department.uuid && inputs[1].value == department.name && department.companies.name == inputs[0].value) {
                    let cardWrapper = await Cards.card(user, 'worker')
                    allCards.append(cardWrapper)
                }

            })
        })
        this.handleEdit()
    }

    static async handleEdit() {
        const edit = document.querySelectorAll('.editData')
        edit.forEach(element => {
            element.addEventListener('click', async (event) => await this.workerModalForm(event.target, event.target.parentElement))
        })
    }

    static async workerModalForm(target, parentElement) {
        const body = document.querySelector('body')

        const allInputs = [
            {professionalLevel: ['text', 'Cargo']},
            {kindOfWork: ['text', 'Tipo de trabalho']},
            {contractualSituation: ['text', 'Demitir ou contratar']}
        ]

        const modal = await Modal.modalForms(allInputs, 'Editar dados')
        body.append(modal)

        Modal.handleModal(modal, target, parentElement)
    }

    static async getAnswers(answers, parentElement) {
        const username = parentElement.childNodes[0]
        const users    = await DashboardRequests.getUsers()

        await users.forEach(async (user) => {
            if (user.username == username.innerText) {
                const id = user.uuid

                const body = {
                    kind_of_work: answers[1].value.trim(),
                    professional_level: answers[0].value.trim()
                }

                DashboardRequests.editWorkerInfo(body, id)

                if (answers[2].value.toLowerCase() == 'demitir') {
                    DashboardRequests.dismissWorker(id)
                } 
            }
        })
        alert('É necessário atualizar a página para que as atualizações façam efeito.')
    }

    static async changeVisibility(allCards) {
        if (allCards.childNodes.length > 1) {
            allCards.childNodes.forEach((element, index) => {
                if (index != 0) {
                    element.style.display = 'none'
                }
            }) 
        }
    }
}