import { Homepage } from "../../globalsrc/scripts/homepage.js"

export class Login {
    static async loginElements(form, whichForm) {
        const allInputs = [
            {email: ['email', 'Digite seu email']},
            {password: ['password', 'Digite sua senha']},
        ]
        
        const result        = await Homepage.forms(['Entrar', 'Ainda não é cadastrado?', 'Cadastrar-se'], allInputs, whichForm)
        const fillInWrapper = result[0]
        const signUpWrapper = result[1]

        form.append(fillInWrapper, signUpWrapper)
        return form
    }
}