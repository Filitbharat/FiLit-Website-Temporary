let overlay = document.getElementById('overlay');
let overlayButton = document.getElementById('navbar-overlay-button');

function openOverlay() {
    overlay.style.transform = "translateX(0)";
}

function closeOverlay() {
    overlay.style.transform = "translateX(100%)";
}

overlayButton.addEventListener('click', function() {
    if (overlay.style.transform == "translateX(0px)"){
        closeOverlay();
    }
    else{
        openOverlay();
    }
})

const coinObserver1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('pop-out-coin1');
        }
    });
});

const coinObserver2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('pop-out-coin2');
        }
    });
});

document.querySelectorAll('.how-it-works-coin-type1').forEach(coin => {
    coinObserver1.observe(coin);
});

document.querySelectorAll('.how-it-works-coin-type2').forEach(coin => {
    coinObserver2.observe(coin);
})