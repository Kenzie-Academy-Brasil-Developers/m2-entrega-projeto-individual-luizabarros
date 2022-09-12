import { MainHeader } from '../../../globalsrc/scripts/header.js'
import { DarkMode } from '../../../globalsrc/scripts/darkMode.js'
import { MainFooter } from '../../../globalsrc/scripts/footer.js'
import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Body } from '../../../globalsrc/scripts/body.js'
import { DashboardUserRequests } from './dashboardUserRequests.js'

class DashboardUser {
    static async dashboardBody() {
        document.querySelector('body').innerHTML = ''
        Body.body(await this.header(), await this.main(), await MainFooter.footer())
    }

    static async header() {
        const header       = await MainHeader.mainHeader()[0]
        const container    = await MainHeader.mainHeader()[1]
        const navbar       = await MainHeader.mainHeader()[2]
        const divDarkmode  = await DarkMode.darkmodeElements()      
        const ul           = document.createElement('ul')
        const items        = ['Editar meus dados', 'Sair']
        ul.classList.add('navigate')

        items.forEach((item, index) => {
            const li = document.createElement('li')
            li.innerText = item
            li.id = index
            ul.append(li)

            item == 'Editar dados' ? li.classList.add('bold') : undefined
            ul.addEventListener('click', (event) => this.bold(event, item, li, index))
        })

        ul.addEventListener('click', (event) => {
            const container     = document.querySelector('.showResults').childNodes[0]
            const title         = document.querySelector('.showResults__title')

            container.innerHTML = ''

            event.target.innerText == 'Editar meus dados'
            ? this.edit(event.target) : this.logout()
        })

        navbar.append(ul)
        container.append(navbar, divDarkmode)
        header.append(container)
        
        return header
    }

    static async main() {
        const departments   = await DashboardUserRequests.getDepartments()
        const coworkers     = await DashboardUserRequests.getCoworkers()  

        const main          = document.createElement('main')
        const title         = document.createElement('h2')
        const container     = document.createElement('div')   
        const allCards      = document.createElement('section')

        main.classList.add('showResults')
        container.classList.add('container')
        title.classList.add('showResults__title')
        allCards.classList.add('cards')

        if (Object.keys(departments)[0] == 'error') {
            title.innerText = 'Você não pertence a nenhum departamento.'
        } else {
            title.innerText = 'Minhas informações empresariais'
            let card = await Cards.card(departments, 'company', departments.departments, 'departments')
            allCards.append(card)

            coworkers.forEach(async (info) => {
                const titleCoworkers     = document.createElement('h2')
                titleCoworkers.innerText = `Colegas de trabalho do departamento de ${info.name}`
                allCards.append(titleCoworkers)

                info.users.forEach(async (user) => {
                    let card = await Cards.card(user, 'worker')
                    allCards.append(card)
                })
            })
        }
        
        allCards.insertAdjacentElement('afterbegin', title)
        container.append(allCards)
        main.append(container)

        return main
    }

    static async edit(target) {
        const body = document.querySelector('body')

        const allInputs = [
            {password: ['password', 'Senha']},
            {email: ['email', 'Email']},
            {username: ['text', 'Nome de usuário']}
        ]

        const modal = await this.modalForms(allInputs, 'Editar dados')
        body.append(modal)

        this.handleModal(modal, target)
    }

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

    static async handleModal(modal, target) {
        modal.addEventListener('click', (event) => {
            event.preventDefault()
            this.modalBtn(event, modal, target)
        })
    }

    static async modalBtn(event, modal, target) {
        const allCards = document.querySelector('.cards')
        const closeBtn = document.querySelector('.closeBtn')
        let inputs     = document.querySelectorAll('input')

        if (event.target.tagName == 'BUTTON' || event.target.classList[0] == closeBtn.classList[0]) {
            modal.classList.add('inactive')
            
            if (event.target.tagName == 'BUTTON') {
                this.getAnswers(inputs)
            }
            document.querySelector('.modalWrapper').remove()
        } else {
            modal.classList.remove('inactive')
        }
    }

    static async getAnswers(inputs) {
        const body = {
            username: inputs[2].value.trim(),
            email: inputs[1].value.trim(),
            password: inputs[0].value.trim()
        }

        DashboardUserRequests.editUser(body)
    }

    static async logout() {
        localStorage.removeItem('@Faiyaz:token')
        localStorage.removeItem('@Faiyaz:is_admin')
        localStorage.removeItem('@Faiyaz:uuid')
        window.location.replace('../../index.html')
    }
}
DashboardUser.dashboardBody()