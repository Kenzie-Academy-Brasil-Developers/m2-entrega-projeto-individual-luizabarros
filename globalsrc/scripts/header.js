export class MainHeader {
    static mainHeader() {
        const header    = document.createElement('header')
        const title     = document.createElement('h1')
        const container = document.createElement('div')            
        const navbar    = document.createElement('nav')

        header.classList.add('menu')
        container.classList.add('container')
        navbar.classList.add('menu__navbar')

        title.innerText = 'Faiyaz'
        container.append(title)
        
        return [header, container, navbar]
    }
}