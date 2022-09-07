import { Homepage } from "../../globalsrc/scripts/homepage.js"

export class SignUp {
    static async signupElements(form, whichForm) {
        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
            {username: ['text', 'Digite seu nome de usuário']},
            {level: ['text', 'Digite seu nível de senioridade']}
        ]
        
        const result        = await Homepage.forms(['Cadastrar-se', 'Já é cadastrado?', 'Fazer o login'], allInputs, whichForm)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        form.append(fillInWrapper, signUpWrapper)
        return form
    }
}