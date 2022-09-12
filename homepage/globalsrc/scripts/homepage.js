import { HomepageRequests } from "./homepageRequests.js"
import { MainHeader } from "../../../globalsrc/scripts/header.js"
import { Filter } from "./filterBySection.js"
import { DarkMode } from "../../../globalsrc/scripts/darkMode.js"
import { Login } from "../../login/scripts/login.js"
import { SignUp } from "../../signup/scripts/signup.js"
import { MainFooter } from "../../../globalsrc/scripts/footer.js"
import { Requests } from "../../../globalsrc/scripts/requests.js"
import { Body } from "../../../globalsrc/scripts/body.js"

export class Homepage {
    static async header() {
        const sectors     = await Requests.getSectors()
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
            option.value     = description
            option.innerText = description
            select.append(option)
        })
        Filter.companiesFromSection(select)
    
        navbar.append(select)
        container.append(navbar, divDarkmode)
        header.append(container)
        
        return header
    }

    static async forms(innerTexts, allInputs, whichForm) {
        const fillInWrapper = document.createElement('div')
        const btnSignHeader = document.createElement('button')
        const signUpWrapper = document.createElement('div')
        const span          = document.createElement('span')
        const btnSignBody   = document.createElement('button')

        fillInWrapper.classList.add('access__fillinHeader')
        signUpWrapper.classList.add('access__fillinFooter')

        btnSignHeader.innerText = innerTexts[0]
        span.innerText          = innerTexts[1]
        btnSignBody.innerText   = innerTexts[2]

        allInputs.forEach(element => {
            const input          = document.createElement('input')
            input.type           = Object.values(element)[0][0]
            input.placeholder    = Object.values(element)[0][1]
            fillInWrapper.append(input)
        })

        if (whichForm == 'login') {
            Login.signin(btnSignHeader)
            Login.handleBtnFooter(btnSignBody)
        } else {
            SignUp.signup(btnSignHeader)
            SignUp.handleBtnFooter(btnSignBody)
        }

        fillInWrapper.append(btnSignHeader)
        signUpWrapper.append(span, btnSignBody)

        return [fillInWrapper, signUpWrapper]
    }
}