import { Homepage } from "../../globalsrc/scripts/homepage.js"

export class Login {
    static async loginElements(form) {
        const title = document.createElement('h2')

        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
        ]
        
        const result        = await Homepage.forms(['Entrar', 'Ainda não é cadastrado?', 'Cadastrar-se'], allInputs)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        title.innerText = 'Login'

        form.append(title, fillInWrapper, signUpWrapper)
        return form
    }
}