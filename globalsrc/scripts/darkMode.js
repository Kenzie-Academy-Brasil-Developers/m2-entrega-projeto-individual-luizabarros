export class DarkMode {
    static async darkmodeElements() {
        const divDarkmode       = document.createElement('div')
        const divDarkmodeCircle = document.createElement('div')
        const darkmodeMoon      = document.createElement('i')
        const darkmodeSun       = document.createElement('i')

        divDarkmode.classList.add('darkmode')
        darkmodeMoon.classList.add('fa')
        darkmodeMoon.classList.add('fa-moon-o')
        darkmodeSun.classList.add('fa')
        darkmodeSun.classList.add('fa-sun-o')

        divDarkmode.append(divDarkmodeCircle, darkmodeMoon, darkmodeSun)
        return divDarkmode
    }
}