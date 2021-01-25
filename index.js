let labels = null;
let values = null;

var reDraw = function (lbs, vls) {
  const ctx = document.querySelector(".myCanvas").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: lbs,
      datasets: [
        {
          label: "",
          data: vls,
          backgroundColor: ["#FF1D00", "#FF9A01", "#FFFFFF", "#01FBFF"],

          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const data = {
  name: "Inkjet Printer",
  impacts: {
    climate_change: {
      production: 45,
      distribution: 23,
      use: 12,
      end_of_life: 5,
    },
    energy_use: {
      production: 32,
      distribution: 5,
      use: 28,
      end_of_life: 1,
    },
  },
};

const title = document.querySelector(".title");
const select = document.querySelector(".select");

title.textContent = data.name;

const { impacts: impact } = data;
const { climate_change: climate_change, energy_use: energy_use } = impact;
console.log(climate_change, energy_use);

for (const property in impact) {
  const option = document.createElement("option");
  option.setAttribute("value", property);
  option.appendChild(document.createTextNode(property));
  select.appendChild(option);
}

// satrting up the drawing function

function startup(type) {
  const redrawData = getBar(type);
  reDraw(redrawData.labels, redrawData.values);
}

// event listner to change thevalue of the select option

select.addEventListener("change", (event) => {
  event.preventDefault();
  startup(event.target.value);
});

function getBar(inputvalue) {
  const labelsNew = [];
  const valuesNew = [];
  if (inputvalue === "climate_change") {
    for (const item in climate_change) {
      labelsNew.push(item);
      valuesNew.push(climate_change[item]);
    }
  } else if (inputvalue === "energy_use") {
    for (const item in energy_use) {
      labelsNew.push(item);
      valuesNew.push(energy_use[item]);
    }
  }
  return { labels: labelsNew, values: valuesNew };
}

startup("climate_change");
