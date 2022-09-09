export class Cards {
    static async card(info, type, extraInfo='', extraType='') {
        const cardWrapper     = document.createElement('div')
        const cardTitle       = document.createElement('h2')
        const cardHour        = document.createElement('p')
        const cardDescription = document.createElement('span')
        const cardSection     = document.createElement('span')

        cardWrapper.classList.add('card')

        if (type == 'company') {
            cardTitle.innerText       = info.name
            cardHour.innerText        = info.opening_hours
            cardDescription.innerText = info.description
            cardSection.innerText     = info.sectors.description

            if (extraType == 'departments' && extraInfo.length != 0) {
                const carrosel             = document.createElement('ul')
                const carrosselMainTitle   = document.createElement('h2')
                carrosselMainTitle.innerText    = 'Departamentos'
                
                extraInfo.forEach((department) => {
                    const carroselItem         = document.createElement('li')
                    const carrosselTitle       = document.createElement('h2')
                    const carrosselDescription = document.createElement('p')
                    
                    carrosselTitle.innerText        = department.name
                    carrosselDescription.innerText  = department.description
                    
                    carroselItem.append(carrosselTitle, carrosselDescription)
                    carrosel.append(carroselItem)
                })
                
                carrosel.insertAdjacentElement('afterbegin', carrosselMainTitle)
                cardWrapper.append(cardTitle, carrosel, cardHour, cardDescription, cardSection)
            } else {
                cardWrapper.append(cardTitle, cardHour, cardDescription, cardSection)
            }

        } else if (type == 'sector') {
            cardTitle.innerText = info
            cardWrapper.append(cardTitle)
        }         
        return cardWrapper
    }
}