let overlay = document.getElementById("overlay");
let overlayButton = document.getElementById("navbar-overlay-button");
let navbarOverlayContainer = document.getElementById(
  "navbar-overlay-container"
);

function openOverlay() {
  overlay.style.display = "flex";
  setTimeout(function () {
    overlay.style.width = "60%";
    navbarOverlayContainer.style.backdropFilter = "saturate(180%) blur(2px)";
  }, 10);
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  overlay.style.display = "none";
  overlay.style.width = "0%";
  // overlay.style.transform = "translateX(100%)";
  navbarOverlayContainer.style.backdropFilter = "";
  document.body.style.overflow = "";
}

window.addEventListener("resize", function () {
  if (this.window.innerWidth > 1400) {
    closeOverlay();
  }
});

navbarOverlayContainer.addEventListener("click", function (e) {
  if (overlay.style.width == "60%") {
    if (
      !overlay.contains(e.target) | e.target.classList.contains("overlay-link")
    ) {
      closeOverlay();
    }
  }
});

// window.addEventListener("click", function (e) {
//   if (overlay.style.transform == "translateX(100%)") {
//     if (!overlay.contains(e.target)) {
//       closeOverlay();
//     }
//   }
//   else{

//   }
// });

overlayButton.addEventListener("click", function () {
  if (overlay.style.width == "60%") {
    closeOverlay();
  } else {
    openOverlay();
  }
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

updateSlider = (event) => {
  const { value, min, max, step, parentElement: parent } = event.target;
  event.currentTarget.style.setProperty("--p", `${(value / max) * 100}%`);
  // console.log(event.currentTarget.style.background);
  event.currentTarget.previousElementSibling.lastElementChild.textContent =
    Number(value).toLocaleString();
};

var xValues = []; //years
var investValues = []; //Investment Yields
var baseValues = []; //Base Values
const maturityValueBox = document.getElementById("maturity-value-box");
const investedValueBox = document.getElementById("invested-value-box");
const profitValueBox = document.getElementById("profit-value-box");
var years = parseInt(
  document.getElementById("investment-calculator-years").value
);
var baseInvestment = parseInt(
  document.getElementById("investment-calculator-base-amount").value
);
for (var i = 1; i <= years; i++) {
  xValues.push(i + "Y");
  baseValues.push(12 * baseInvestment * i);
  investValues.push(
    (baseInvestment * ((Math.pow(1.01, 12 * i) - 1) * 1.01)) / 0.01 -
      baseValues[i - 1]
  );
}
maturityValueBox.innerText =
  "₹" + indianconversion(investValues[years - 1] + baseValues[years - 1]);
investedValueBox.innerText = "₹" + indianconversion(baseValues[years - 1]);
profitValueBox.innerText = "₹" + indianconversion(investValues[years - 1]);
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
          display: false,
        },
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value, index, ticks) {
            return indianconversion(value);
          },
        },
      },
    },
  },
});
document
  .getElementById("investment-calculator-years")
  .addEventListener("input", newGraph);
document
  .getElementById("investment-calculator-base-amount")
  .addEventListener("input", newGraph);
function newGraph() {
  var years = parseInt(
    document.getElementById("investment-calculator-years").value
  );
  var baseInvestment = parseInt(
    document.getElementById("investment-calculator-base-amount").value
  );
  xValues = [];
  baseValues = [];
  investValues = [];
  for (var i = 1; i <= years; i++) {
    xValues.push(i + "Y");
    baseValues.push(12 * baseInvestment * i);
    investValues.push(
      (baseInvestment * ((Math.pow(1.01, 12 * i) - 1) * 1.01)) / 0.01 -
        baseValues[i - 1]
    );
  }
  maturityValueBox.innerText =
    "₹" + indianconversion(investValues[years - 1] + baseValues[years - 1]);
  investedValueBox.innerText = "₹" + indianconversion(baseValues[years - 1]);
  profitValueBox.innerText = "₹" + indianconversion(investValues[years - 1]);
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
            display: false,
          },
          stacked: true,
        },
        y: {
          stacked: true,
          ticks: {
            callback: function (value, index, ticks) {
              return indianconversion(value);
            },
          },
        },
      },
    },
  });
}

function indianconversion(val) {
  if (val >= 10000000) val = (val / 10000000).toFixed(2) + " Cr";
  else if (val >= 100000) val = (val / 100000).toFixed(2) + " Lac";
  else if (val >= 1000) val = (val / 1000).toFixed(2) + " K";
  return val;
}

const faqButtons = Array.from(document.getElementsByClassName("faq-heading"));
for (let i = 0; i < faqButtons.length; i++) {
  faqButtons[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    let icon = this.lastElementChild;
    let open = panel.style.maxHeight;
    faqButtons.forEach(closeAnswer);
    if (open) {
      panel.style.maxHeight = null;
      panel.style.marginTop = "0px";
      icon.textContent = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.marginTop = "10px";
      icon.textContent = "-";
    }
  });
}

function closeAnswer(element) {
  let panel = element.nextElementSibling;
  let icon = element.lastElementChild;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    panel.style.marginTop = "0px";
    icon.textContent = "+";
  }
}
