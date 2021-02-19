export class WeatherTabsView {
    constructor(){
        this.tabs = document.getElementById('tabs-swipe-demo')
        this.tabsContent = document.getElementById('tabs-content')
        this.tabs_instance = null
    }
    async render(data, 
           handler1, 
           handler2) {

        if(data.length){
            this.tabsContent.innerHTML = ""
            let html = '';

            if (this.tabs_instance) {
                this.tabs_instance.destroy();
            }
            
            // data.forEach(async(value, index) => {

            for (const [index, value] of data.entries()){

                // tab links

                let locationName = Object.keys(value)[0]
                console.log(locationName)
                if (locationName === 'default'){
                    locationName = "Current Location"
                }
                let li;
                if(index == 0){
                    li =`
                    <li class="tab col s3"><a class="active light-blue-text" href="#tab-${index}">${locationName}</a></li>
                    `
                } else {
                    li = `
                    <li class="tab col s3"><a href="#tab-${index}" class="light-blue-text">${locationName}</a></li>
                    `
                }

                html += li

                // tab contents
                
                let _tab_ = document.createElement("div")
                _tab_.classList.add("col", "s12")
                _tab_.id = `tab-${index}`

                let lat = String(value[Object.keys(value)[0]].lat)
                let lon = String(value[Object.keys(value)[0]].lon)
                
                let contents = await handler1(handler2, lat, lon)
                // _tab_.appendChild(contents)
                _tab_.innerHTML = contents.innerHTML
                this.tabsContent.appendChild(_tab_)

               
            }

            this.tabs.innerHTML = html

            var tabs = document.querySelector('#tabs-swipe-demo')
            this.tabs_instance = M.Tabs.init(tabs);
            this.tabs_instance.select("tab-0")
            this.tabs_instance.updateTabIndicator();
            // document.querySelector('.tabs-content.carousel').style.height = window.innerHeight + "px";
            // var slider= document.querySelector('.tabs-content.carousel.carousel-slider')
            
            // setTimeout(( )=> {
            //     var slider= document.querySelector('.tabs-content.carousel.carousel-slider')
            //     slider.style.height = "auto"
            // },1000)
            
            // console.log(slider)
            // $('.tabs-content.carousel.carousel-slider').css("height","auto");
            
        }
    }
}