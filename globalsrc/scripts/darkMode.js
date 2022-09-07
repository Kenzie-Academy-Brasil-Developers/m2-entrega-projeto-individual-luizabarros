export class DarkMode {
    static async darkmodeElements() {
        const divDarkmode       = document.createElement('div')
        const divDarkmodeCircle = document.createElement('div')
        const darkmodeMoon      = document.createElement('i')
        const darkmodeSun       = document.createElement('i')

        divDarkmode.classList.add('darkmode')
        divDarkmodeCircle.classList.add('circle')
        darkmodeMoon.classList.add('fa')
        darkmodeMoon.classList.add('fa-moon-o')
        darkmodeSun.classList.add('fa')
        darkmodeSun.classList.add('fa-sun-o')

        divDarkmode.append(divDarkmodeCircle, darkmodeMoon, darkmodeSun)

        divDarkmodeCircle.addEventListener('click', () => {
            const html = document.querySelector('html')

            html.classList.toggle('darkmodeActive')   
            if (html.classList.contains('darkmodeActive')) {
                divDarkmodeCircle.style.transform = 'translateX(-100%)' 
            } else {
                divDarkmodeCircle.style.transform = 'translateX(0%)'
            }

        })

        return divDarkmode
    }
}