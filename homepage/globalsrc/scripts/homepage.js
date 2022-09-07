import { HomepageRequests } from "./homepageRequests.js"
import { MainHeader } from "../../../globalsrc/scripts/header.js"
import { DarkMode } from "../../../globalsrc/scripts/darkMode.js"
import { Login } from "../../login/scripts/login.js"
import { SignUp } from "../../signup/scripts/signup.js"
import { MainFooter } from "../../../globalsrc/scripts/footer.js"

export class Homepage {
    static async body() {
        const body   = document.querySelector('body')
        const header = await this.header()
        const main   = await this.main()
        const footer = await MainFooter.footer()
        
        body.append(header, main, footer)
    }

    static async header() {
        const sectors     = await HomepageRequests.getSectors()
        const header      = await MainHeader.mainHeader()[0]
        const container   = await MainHeader.mainHeader()[1]
        const navbar      = await MainHeader.mainHeader()[2]
        const divDarkmode = await DarkMode.darkmodeElements()

        const select            = document.createElement('select')
        const mainOption        = document.createElement('option')
        mainOption.innerText = 'Setores'
        
        select.append(mainOption)
        sectors.forEach(({description}) => {
            const option     = document.createElement('option')
            option.value     = description.toLowerCase()
            option.innerText = description
            select.append(option)
        })

        navbar.append(select)
        container.append(navbar, divDarkmode)
        header.append(container)
        
        return header
    }

    static async main() {
        const main          = document.createElement('main')
        const container     = document.createElement('div')            
        const divIMGWrapper = document.createElement('div')
        const img           = document.createElement('img')
        let form            = document.createElement('form')
        
        if (window.location.pathname == '/index.html') {
            img.src    = './homepage/globalsrc/assets/company.png'
            form       = await Login.loginElements(form, 'login')
        } else {
            img.src    = '../globalsrc/assets/company.png'
            form       = await SignUp.signupElements(form, 'signin')
        }
        img.alt = 'Pessoas trabalhando em uma empresa'
        main.classList.add('access')
        container.classList.add('container')

        divIMGWrapper.append(img)
        container.append(divIMGWrapper, form)
        main.append(container)

        return main
    }

    static async forms(innerTexts, allInputs, whichForm) {
        const fillInWrapper = document.createElement('div')
        const btnSignHeader = document.createElement('button')
        const signUpWrapper = document.createElement('div')
        const span          = document.createElement('span')
        const btnSignBody   = document.createElement('button')
        const redirect      = document.createElement('a')

        btnSignHeader.innerText = innerTexts[0]
        span.innerText          = innerTexts[1]
        redirect.innerText      = innerTexts[2]

        if (whichForm == 'login') {
            redirect.href           = './homepage/signup/signup.html'
        } else {
            redirect.href           = '../../index.html'
        }

        allInputs.forEach(element => {
            const input          = document.createElement('input')
            input.type           = Object.values(element)[0][0]
            input.placeholder    = Object.values(element)[0][1]
            input.required       = true
            fillInWrapper.append(input)
        })

        fillInWrapper.append(btnSignHeader)
        btnSignBody.append(redirect)
        signUpWrapper.append(span, btnSignBody)

        return [fillInWrapper, signUpWrapper]
    }
}
Homepage.body()