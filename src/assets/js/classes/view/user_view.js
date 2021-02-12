export class UserView {
    constructor(){
        this.loggedOutLinks = document.querySelectorAll('.logged-out');
        this.loggedInLinks = document.querySelectorAll('.logged-in');
    }
    navigationChange(handler){
        console.log(handler)
        if (handler) {
            // toggle user UI elements
            this.loggedInLinks.forEach(item => item.style.display = 'block');
            this.loggedOutLinks.forEach(item => item.style.display = 'none');
          } else {
            // toggle user elements
            this.loggedInLinks.forEach(item => item.style.display = 'none');
            this.loggedOutLinks.forEach(item => item.style.display = 'block');
          }
    }
}