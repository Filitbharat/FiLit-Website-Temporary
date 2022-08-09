let overlay = document.getElementById('overlay');
let overlayButton = document.getElementById('navbar-overlay-button');

overlayButton.addEventListener('click', function() {
    if (overlay.style.height == "100%"){
        closeOverlay();
    }
    else{
        openOverlay();
    }
})

function openOverlay() {
    overlay.style.height = "100%";
}

function closeOverlay() {
    overlay.style.height = "0";
}
