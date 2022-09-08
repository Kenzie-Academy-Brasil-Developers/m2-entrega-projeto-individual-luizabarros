import { HomepageRequests } from "./homepageRequests.js"
import { Cards } from "../../../globalsrc/scripts/cards.js"

export class Filter {
    static async companiesFromSection(select) {
        const allCards  = document.createElement('section')
        const h2        = document.createElement('h2')
        allCards.classList.add('cards')
        allCards.classList.add('animate__bounceIn')
        h2.classList.add('animate__bounceIn')
        
        select.addEventListener('click', async () => {

            const img       = document.querySelector('img')
            const main      = document.querySelector('.access')
            const container = main.childNodes[0]
            
            const companies = await HomepageRequests.getCompaniesFromSector(select.value)

            await this.checkDisplay(select.value, img, allCards, h2)
            await this.insert(companies, select.value, allCards, container, h2)
        })
    }

    static async checkDisplay(value, img, allCards, h2) {
        if (value == 'Setores') {
            img.parentElement.style.display = 'block'
            allCards.classList.add('inactive')
            h2.classList.add('inactive')
        } else {
            allCards.classList.remove('inactive')
            h2.classList.remove('inactive')
            img.parentElement.style.display = 'none'
        }
        allCards.innerHTML     = ''
        h2.innerHTML           = ''
    }

    static async insert(companies, value, allCards, container, h2) {
        if (companies.length != 0 && value != 'Setores') {
            companies.forEach(async (company) => {
                let card = await Cards.card(company)
                
                allCards.append(card)
                container.insertAdjacentElement('afterbegin', allCards)
            })

        } else if (companies.length == 0 && value != 'Setores') {
            h2.innerText = 'Ainda não temos empresas nessa seção.'
            container.insertAdjacentElement('afterbegin', h2)
        }
    }
}