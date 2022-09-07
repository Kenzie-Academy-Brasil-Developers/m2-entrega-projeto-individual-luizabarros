import { Homepage } from "../../globalsrc/scripts/homepage.js"

export class SignUp {
    static async signupElements(form) {
        const title = document.createElement('h2')

        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
            {username: ['text', 'Digite seu nome de usuário']},
            {level: ['text', 'Digite seu nível de senioridade']}
        ]
        
        const result        = await Homepage.forms(['Cadastrar-se', 'Já é cadastrado?', 'Fazer o login'], allInputs)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        title.innerText = 'Cadastro'

        form.append(title, fillInWrapper, signUpWrapper)
        return form
    }
}