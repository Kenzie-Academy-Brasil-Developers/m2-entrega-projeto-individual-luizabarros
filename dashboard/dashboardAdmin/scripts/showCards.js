export class ShowCards {
    static async showCards(allCards, titleContent) {
        const container = document.querySelector('.showResults').childNodes[0]
        const title     = document.querySelector('.showResults__title')

        allCards.innerHTML = ''

        title.innerText    = titleContent
        allCards.insertAdjacentElement('afterbegin', title)

        return [container, title]
    }
}