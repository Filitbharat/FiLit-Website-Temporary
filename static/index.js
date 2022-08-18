let overlay = document.getElementById("overlay");
let overlayButton = document.getElementById("navbar-overlay-button");

function openOverlay() {
  overlay.style.transform = "translateX(0)";
}

function closeOverlay() {
  overlay.style.transform = "translateX(100%)";
}

overlayButton.addEventListener("click", function () {
  if (overlay.style.transform == "translateX(0px)") {
    closeOverlay();
  } else {
    openOverlay();
  }
});

const coinObserver1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("pop-out-coin1");
    }
  });
});

const coinObserver2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("pop-out-coin2");
    }
  });
});

document.querySelectorAll(".how-it-works-coin-type1").forEach((coin) => {
  coinObserver1.observe(coin);
});

document.querySelectorAll(".how-it-works-coin-type2").forEach((coin) => {
  coinObserver2.observe(coin);
});

// function unfadeflex(element) {
//   console.log(element);
//   var op = 0.1; // initial opacity
//   element.style.opacity = op;
//   element.style.display = "flex";
//   var timer = setInterval(function () {
//     if (op >= 1) {
//       clearInterval(timer);
//     }
//     element.style.opacity = op;
//     element.style.filter = "alpha(opacity=" + op * 100 + ")";
//     op += op * 0.1;
//   }, 10);
// }

$("body").delegate(".c-faq", "click", function () {
  let r = 0;
  let w = $(window).width();
  if ($(this).hasClass("c-faq--active")) {
    r = 1;
  }
  $(".c-faq").removeClass("c-faq--active");
  if (r != 1 || w > 768) {
    $(this).addClass("c-faq--active");
  }
});

//  cursor animation

let cursor = document.getElementById("cursor");
let cursorOuter = document.getElementById("cursor-outer");

if ("ontouchstart" in window) {
  cursor.style.display = "none";
  cursorOuter.style.display = "none";
}

let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;

window.addEventListener('mousemove', function (e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - 4 + "px";
  cursor.style.top = document.documentElement.scrollTop +  e.clientY - 4 + "px";
});

function lerp(x, y, f) {
  return (1 - f) * x + f * y;
}

function loop() {
  cursorX = lerp(cursorX, pageX, .16);
  cursorY = lerp(cursorY, pageY, .16);
  cursorOuter.style.top = document.documentElement.scrollTop + cursorY - 16 + 'px';
  cursorOuter.style.left = cursorX - 16 + 'px';
  requestAnimationFrame(loop);
}

loop();


