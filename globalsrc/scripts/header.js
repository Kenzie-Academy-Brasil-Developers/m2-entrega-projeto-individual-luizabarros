export class MainHeader {
    static mainHeader() {
        const header       = document.createElement('header')
        const title        = document.createElement('h1')
        const container    = document.createElement('div')            
        const navbar       = document.createElement('nav')
        const iconsWrapper = document.createElement('div')            
        const iconClose    = document.createElement('i')            
        const iconOpen     = document.createElement('i')            

        header.classList.add('menu')
        container.classList.add('container')
        navbar.classList.add('menu__navbar')
        iconsWrapper.classList.add('menu__overview__icons')

        const classesIcons = [
            {closeMenu: ['fa', 'fa-close', 'inactive', 'dropdownControll']},
            {openMenu: ['fa', 'fa-bars', 'dropdownControll']}
        ]

        classesIcons.forEach(element => {
            Object.keys(element)[0] == 'closeMenu' 
            ? element.closeMenu.forEach((value, index) => iconClose.classList.add(element.closeMenu[index]))
            : element.openMenu.forEach((value, index) => iconOpen.classList.add(element.openMenu[index]))
        })

        title.innerText = 'Faiyaz'

        iconsWrapper.append(iconOpen, iconClose)
        container.append(title, iconsWrapper)
        
        return [header, container, navbar]
    }
}