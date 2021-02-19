export class UserView {
    constructor(){
        this.appPage = document.getElementById("app")
        this.homePage = document.getElementById("home")

        this.loggedOutLinks = document.querySelectorAll('.logged-out');
        this.loggedInLinks = document.querySelectorAll('.logged-in');

        this.addLocationForm = document.getElementById("add-location-form")
        this.addLocationModal = document.getElementById("modal-add-location")

        this.searchLocationBtn = document.getElementById("searchBtn")
        this.removeLocationBtn = document.getElementById("removeBtnId")
    
        this.collectionLocation = document.getElementById("locationCollection")
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

    toggleHomeAndAppPage(user){
        if (user) {
            this.appPage.style.display = "block"
            this.homePage.style.display = "none"
        } else {
            this.appPage.style.display = "none"
            this.homePage.style.display = "block"
        }
    }

    createCollectionsLocation(locationArr){

        if (locationArr.length) {

            let html = '<li class="collection-header"><h4>Search Results</h4></li>';
            locationArr.forEach((value, i) => {
                let key = Object.keys(value)[0]
                const li = `
                <li class="collection-item">
                    <div>${Object.keys(value)[0]}
                        <button 
                            class="btn-floating secondary-content waves-effect waves-light btn-small"
                            data-index="${i}" 
                        >
                            <i class="material-icons">add</i>
                        </button>
                    </div>
                </li>
                `;
                html += li;
            });
            this.collectionLocation.innerHTML = html
        } else {
            this.collectionLocation.innerHTML = `
            <li class="collection-item">
                No Results Found! Try again with valid location Name.
            </li>`;
        }
        this.collectionLocation.style.display = 'block';
    }

    // Search and Add Location
    searchLocation(handler1, handler2){
        this.collectionLocation.style.display = 'none';

        this.searchLocationBtn.onclick = async(event) => {
            event.preventDefault();

            const locationName = this.addLocationForm["nameLocation"].value
            console.log(locationName)

            const result = await handler1(locationName)
            console.log(result)

            this.createCollectionsLocation(result)

            this.addLocationBtns = document.querySelectorAll('.secondary-content');

            this.addLocationBtns.forEach(value => {
                const data_index = value.dataset.index
                const selected_data = result[data_index]
                value.onclick = async(event) => {
                    event.preventDefault();
    
                    await handler2(selected_data)
                        .then(() => {
                            // close the create modal & reset form
                        
                            M.Modal.getInstance(this.addLocationModal).close();
        
                            this.addLocationForm.reset();
                            this.collectionLocation.style.display = 'none';
                        })
                        .catch(err => {
        
                            console.log(err.message);
        
                        });
                }
            })
        
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