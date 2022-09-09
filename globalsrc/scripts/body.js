export class Body {
    static async body(header, main, footer) {
        const body   = document.querySelector('body')
        body.append(header, main, footer)
    }
}