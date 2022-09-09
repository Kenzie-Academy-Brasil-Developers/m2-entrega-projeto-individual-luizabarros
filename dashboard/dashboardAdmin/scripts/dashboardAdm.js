import { MainHeader } from '../../../globalsrc/scripts/header.js'
import { DarkMode } from '../../../globalsrc/scripts/darkMode.js'
import { MainFooter } from '../../../globalsrc/scripts/footer.js'
import { Requests } from '../../../globalsrc/scripts/requests.js'
import { Cards } from '../../../globalsrc/scripts/cards.js'
import { Body } from '../../../globalsrc/scripts/body.js'
import { Navigate } from './navigate.js'

export class Dashboard {
    static async dashboardBody() {
        document.querySelector('body').innerHTML = ''
        Body.body(await this.header(), await this.main(), await MainFooter.footer())
    }

    static async header() {
        const header      = await MainHeader.mainHeader()[0]
        const container   = await MainHeader.mainHeader()[1]
        const navbar      = await MainHeader.mainHeader()[2]
        const divDarkmode = await DarkMode.darkmodeElements()      
        const ul          = document.createElement('ul')
        const items       = ['Setores', 'Empresas', 'Departamentos', 'Sair']  

        ul.classList.add('navigate')

        items.forEach((item, index) => {
            const li = document.createElement('li')
            li.innerText = item
            li.id = index
            ul.append(li)

            item == 'Setores' ? li.classList.add('bold') : undefined
            ul.addEventListener('click', (event) => this.bold(event, item, li, index))
        })

        Navigate.checkItem(ul)

        navbar.append(ul)
        container.append(navbar, divDarkmode)
        header.append(container)
        
        return header
    }

    static async main() {
        const sectors     = await Requests.getSectors()

        const main          = document.createElement('main')
        const title         = document.createElement('h2')
        const container     = document.createElement('div')   
        const allCards      = document.createElement('section')

        title.innerText = 'Setores'
        main.classList.add('showResults')
        container.classList.add('container')
        title.classList.add('showResults__title')
        allCards.classList.add('cards')

        sectors.forEach(async ({description}) => {
            let card = await Cards.card(description, 'sector')
            allCards.append(card)
        })
        
        allCards.insertAdjacentElement('afterbegin', title)
        container.append(allCards)
        main.append(container)

        return main
    }

    static async bold(event, item, li, index) {
        item == event.target.innerText && index == event.target.id
        ? li.classList.add('bold') 
        : li.classList.remove('bold')
    }
}
Dashboard.dashboardBody()