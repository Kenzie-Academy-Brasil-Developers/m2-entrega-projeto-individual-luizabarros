export class Toast {
    static async toast(message, color1, color2) {
        Toastify({
            text: message,
            gravity: 'top', 
            position: 'right', 
            style: {
              background: `linear-gradient(to right, ${color1}, ${color2})`,
              fontSize: '16px'
            },
            onClick: function(){} 
        }).showToast()
    }
}