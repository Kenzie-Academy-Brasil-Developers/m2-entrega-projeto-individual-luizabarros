import { Companies } from '../../dashboard/dashboardAdmin/scripts/companies.js'

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

    static async handleModal(modal) {
        modal.addEventListener('click', (event) => {
            event.preventDefault()
            this.modalBtn(event, modal)
        })
    }

    static async modalBtn(event, modal) {
        const closeBtn = document.querySelector('.closeBtn')
        let inputs     = document.querySelectorAll('input')

        if (event.target.tagName == 'BUTTON' || event.target.classList[0] == closeBtn.classList[0]) {
            modal.classList.add('inactive')

            if (event.target.tagName == 'BUTTON') {
                if (inputs[inputs.length - 1].type == 'search') {
                    Companies.handleSearch(inputs[inputs.length - 1])
                } else {
                    Companies.handleAdd(inputs)
                }

            }
        } else {
            modal.classList.remove('inactive')
        }
    }
}