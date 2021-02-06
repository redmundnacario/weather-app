
/// ====================================================== //
// INDEX.JS
// ====================================================== //

// materializs css
document.addEventListener('DOMContentLoaded', function() {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
})

// App
const app = new Controller()
app.run()