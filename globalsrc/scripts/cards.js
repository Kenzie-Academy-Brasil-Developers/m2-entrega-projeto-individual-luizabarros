export class Cards {
    static async card(companyInfo) {
        const cardWrapper     = document.createElement('div')
        const cardTitle       = document.createElement('h2')
        const cardHour        = document.createElement('p')
        const cardDescription = document.createElement('span')
        const cardSection     = document.createElement('span')

        cardWrapper.classList.add('card')
        cardTitle.innerText       = companyInfo.name
        cardHour.innerText        = companyInfo.opening_hours
        cardDescription.innerText = companyInfo.description
        cardSection.innerText     = companyInfo.sectors.description

        cardWrapper.append(cardTitle, cardHour, cardDescription, cardSection)
        return cardWrapper
    }
}