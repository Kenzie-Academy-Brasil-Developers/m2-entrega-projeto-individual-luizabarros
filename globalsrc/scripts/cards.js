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
            cardSection.innerText     = info.sectors == undefined ? null : info.sectors.description

            if (extraType == 'departments' && extraInfo.length != 0) {
                const carrosel = await this.departments(extraInfo)                                
                cardWrapper.append(cardTitle, carrosel, cardHour, cardDescription, cardSection)
            } else {
                cardWrapper.append(cardTitle, cardHour, cardDescription, cardSection)
            }

        } else if (type == 'sector') {
            cardTitle.innerText = info
            cardWrapper.append(cardTitle)
        } else if (type == 'person') {
            const cardUsername = document.createElement('h2')
            const cardEmail    = document.createElement('p')
            const cardLevel    = document.createElement('span')
            const cardWork     = document.createElement('span')

            cardUsername.innerText = info.username
            cardEmail.innerText    = info.email
            cardLevel.innerText    = info.professional_level
            cardWork.innerText     = info.kind_of_work
                
            cardWrapper.append(cardUsername, cardEmail, cardLevel, cardWork)
        } else if (type == 'department') {
            const carrosel            = await this.departments(info)                                
            cardWrapper.append(carrosel)
 
        } else if (type == 'worker') {
            const carrosel             = document.createElement('ul')
            const carrosselMainTitle   = document.createElement('h2')
            const carroselItem         = document.createElement('li')
            const carrosselTitle       = document.createElement('h2')
            const carrosselLevel       = document.createElement('p')
            const carrosselWorkType    = document.createElement('p')
            const carrosselEdit        = document.createElement('span')
            
            carrosselMainTitle.innerText    = 'Funcionários'
            carrosselTitle.innerText        = info.username
            carrosselLevel.innerText        = info.professional_level
            carrosselWorkType.innerText     = info.kind_of_work
            carrosselEdit.innerText         = 'Editar dados'
            carrosselEdit.classList.add('editData')
            
            carroselItem.append(carrosselTitle, carrosselLevel, carrosselWorkType, carrosselEdit)
            carrosel.append(carroselItem)
            carrosel.insertAdjacentElement('afterbegin', carrosselMainTitle)
            cardWrapper.append(carrosel)
        }
        return cardWrapper
    }

    static async departments(info) {
        const carrosel                  = document.createElement('ul')
        const carrosselMainTitle        = document.createElement('h2')
        carrosselMainTitle.innerText    = 'Departamentos'
        
        info.forEach((department) => {
            const carroselItem         = document.createElement('li')
            const carrosselTitle       = document.createElement('h2')
            const carrosselDescription = document.createElement('p')
            
            carrosselTitle.innerText        = department.name
            carrosselDescription.innerText  = department.description
            
            carroselItem.append(carrosselTitle, carrosselDescription)
            carrosel.append(carroselItem)
        })
        carrosel.insertAdjacentElement('afterbegin', carrosselMainTitle)
        return carrosel
    }
}