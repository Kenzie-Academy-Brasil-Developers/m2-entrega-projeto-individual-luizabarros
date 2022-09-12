import { HomepageRequests } from '../../globalsrc/scripts/homepageRequests.js'
import { Homepage } from '../../globalsrc/scripts/homepage.js'
import { Toast } from '../../../globalsrc/scripts/toast.js'
import { MainFooter } from '../../../globalsrc/scripts/footer.js'
import { Body } from '../../../globalsrc/scripts/body.js'

export class Login {
    static async homepageBody() {
        Body.body(await Homepage.header(), await Login.main(), await MainFooter.footer())
    }

    static async loginElements(form, whichForm) {
        const title = document.createElement('h2')

        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
        ]
        
        const result        = await Homepage.forms(['Entrar', 'Ainda não é cadastrado?', 'Cadastrar-se'], allInputs, whichForm)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        title.innerText = 'Login'

        form.append(title, fillInWrapper, signUpWrapper)
        return form
    }

    static async main() {
        const main          = document.createElement('main')
        const container     = document.createElement('div')            
        const divIMGWrapper = document.createElement('div')
        const img           = document.createElement('img')
        let form            = document.createElement('form')
        
        img.src    = './homepage/globalsrc/assets/company.png'
        form       = await this.loginElements(form, 'login')
        img.alt = 'Pessoas trabalhando em uma empresa'
        main.classList.add('access')
        container.classList.add('container')

        divIMGWrapper.append(img)
        container.append(divIMGWrapper, form)
        main.append(container)

        return main
    }

    static async signin(btnSignHeader) {
        const token   = localStorage.getItem('@Faiyaz:token')
        const isAdmin = localStorage.getItem('@Faiyaz:is_admin')
        
        if (token != 'undefined' && token != null) {
            isAdmin == 'true'
            ? window.location.replace('../../dashboard/dashboardAdmin/dashboardAdm.html') 
            : window.location.replace('../../dashboard/dashboardUser/dashboardUser.html')
        } 

        btnSignHeader.addEventListener('click', async (event) => {
            event.preventDefault()

            const emailInput    = document.querySelectorAll('input')[0]
            const passwordInput = document.querySelectorAll('input')[1]

            const body = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            }

            const userLogin = await HomepageRequests.login(body)

            if (Object.keys(userLogin)[0] == 'error') {
                Toast.toast('Usuário não encontrado', '#ff0844', '#ffb199')

                emailInput.value    = ''
                passwordInput.value = ''
            } else {
                Toast.toast('Usuário encontrado! Redirecionando para Dashbaord...', '#00b09b', '#96c93d')
                
                setTimeout(() => {
                    userLogin.is_admin 
                    ? window.location.replace('../../dashboard/dashboardAdmin/dashboardAdm.html') 
                    : window.location.replace('../../dashboard/dashboardUser/dashboardUser.html')                    
                }, 3000)
            }
        })
    }

    static async handleBtnFooter(btnSignBody) {
        btnSignBody.addEventListener('click', (event) => {
            event.preventDefault()

            window.location.replace('./homepage/signup/signup.html') 
        })
    }
}
Login.homepageBody()