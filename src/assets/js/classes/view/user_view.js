export class UserView {
    constructor(){
        this.loggedOutLinks = document.querySelectorAll('.logged-out');
        this.loggedInLinks = document.querySelectorAll('.logged-in');

        this.addLocationForm = document.getElementById("add-location-form")
        this.addLocationModal = document.getElementById("modal-add-location")

        this.removeLocationBtn = document.getElementById("removeBtnId")
    }

    navigationChange(handler){
        // console.log(handler)
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
    
    addLocationUserData(handler){

      this.addLocationForm.onsubmit = async(event) => {
          event.preventDefault();

          await handler()
              .then(() => {
                  // close the create modal & reset form
              
                  M.Modal.getInstance(this.addLocationModal).close();

                  this.addLocationForm.reset();

              })
              .catch(err => {

                  console.log(err.message);

            });
      }

    }

    removeLocationUserData(handler){
        
        this.removeLocationBtn.onclick = async(event) => {
            event.preventDefault();
            console.log("here")
            await handler()
                .then(() =>{

                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
}