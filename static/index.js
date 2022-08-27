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


var xValues = []; //years
var investValues = []; //Investment Yields
var baseValues = []; //Base Values
var myct = new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        type: "bar",
        label: ["Initial Investment"],
        data: baseValues,
        stack: "1",
        backgroundColor: ["gray"],
      },
      {
        type: "bar",
        label: ["Profit"],
        data: investValues,
        stack: "1",
        backgroundColor: ["blue"],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
});
document.getElementById("investment-calculator-years").addEventListener('input', newGraph);
function newGraph() {
  let canvas = document.getElementById("myChart");
  var years = parseInt(document.getElementById("investment-calculator-years").value);
  var baseInvestment = parseInt(document.getElementById("investment-calculator-base-amount").value);
  xValues = [];
  baseValues = [];
  investValues = [];
  for(var i = 1; i <= years; i++){
    xValues.push(i+"Y");
    baseValues.push(12*baseInvestment);
    if(i > 1){
      baseValues[i-1] += baseValues[i-2];
    }
    investValues.push(0.15*baseValues[i-1]);
    if(i > 1){
      investValues[i-1] = 0.15*(baseValues[i-2]+investValues[i-2]);
    }
  }
  
  myct.destroy();
  myct = new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          type: "bar",
          label: ["Initial Investment"],
          data: baseValues,
          stack: "1",
          backgroundColor: ["lightgray"],
        },
        {
          type: "bar",
          label: ["Profit"],
          data: investValues,
          stack: "1",
          backgroundColor: ["#004aad"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      barThickness: "20",
      scales: {
        xAxes: {
          grid: {
            display: false
          },
          stacked: true,
        },
        y: {
          stacked: true,
          ticks: {
            callback: function(value, index, ticks) {
              return indianconversion(value);
            }
          }
        },
      },
    },
  });
}

function indianconversion(val) {
  if (val >= 10000000) val = (val / 10000000).toFixed(1) + ' Cr';
  else if (val >= 100000) val = (val / 100000).toFixed(1) + ' Lac';
  else if (val >= 1000) val = (val / 1000).toFixed(1  ) + ' K';
  return val;
}