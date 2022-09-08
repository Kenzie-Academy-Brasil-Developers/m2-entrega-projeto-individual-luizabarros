import { HomepageRequests } from "../../globalsrc/scripts/homepageRequests.js"
import { Toast } from "../../globalsrc/scripts/toast.js"
import { Homepage } from "../../globalsrc/scripts/homepage.js"

export class SignUp {
    static async signupElements(form, whichForm) {
        const title = document.createElement('h2')

        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
            {username: ['text', 'Digite seu nome de usuário']},
            {level: ['text', 'Digite seu nível de senioridade']}
        ]
        
        const result        = await Homepage.forms(['Cadastrar-se', 'Já é cadastrado?', 'Fazer o login'], allInputs, whichForm)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        title.innerText = 'Cadastro'

        form.append(title, fillInWrapper, signUpWrapper)
        return form
    }

    static async signup(btnSignHeader) {
        btnSignHeader.addEventListener('click', async (event) => {
            event.preventDefault()

            const emailInput    = document.querySelectorAll('input')[0]
            const passwordInput = document.querySelectorAll('input')[1]
            const usernameInput = document.querySelectorAll('input')[2]
            const levelInput    = document.querySelectorAll('input')[3]

            const body = {
                password: passwordInput.value.trim(),
                email: emailInput.value.trim(),
                professional_level: levelInput.value.trim(),
                username: usernameInput.value.trim()
            }

            const userSignUp = await HomepageRequests.signup(body)

            console.log(userSignUp)
            console.log(Object.keys(userSignUp)[0] == 'error')

            if (Object.keys(userSignUp)[0] == 'error') {
                Toast.toast('Erro no cadastro. Tente novamente!', '#ff0844', '#ffb199')

                emailInput.value    = ''
                passwordInput.value = ''
                levelInput.value = ''
                usernameInput.value = ''
            } else {
                Toast.toast('Usuário cadastrado!', '#00b09b', '#96c93d')
            }
            setTimeout(() => {
                window.location.replace('../../index.html') 
            }, 3000)
        })
    }

    static async handleBtnFooter(btnSignBody) {
        btnSignBody.addEventListener('click', (event) => {
            event.preventDefault()

            window.location.replace('../../../index.html') 
        })
    }
}