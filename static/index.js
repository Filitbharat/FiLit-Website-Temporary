let overlay = document.getElementById('overlay');
let overlayButton = document.getElementById('navbar-overlay-button');

overlayButton.addEventListener('click', function() {
    if (overlay.style.transform == "translateX(0px)"){
        closeOverlay();
    }
    else{
        openOverlay();
    }
})

function openOverlay() {
    overlay.style.transform = "translateX(0)";
}

function closeOverlay() {
    overlay.style.transform = "translateX(100%)";
}
