const title = document.querySelector("#title");
const select = document.querySelector("#select");

title.textContent = data.name;

const { impacts: impact } = data;
const { climate_change: climate_change, energy_use: energy_use } = impact;

for (const property in impact) {
  const option = document.createElement("option");
  option.setAttribute("value", property);
  option.appendChild(document.createTextNode(property));
  select.appendChild(option);
}

let labels = null;
let values = null;

var reDraw = function (lbs, vls) {
  const ctx = document.querySelector("#myCanvas").getContext("2d");
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
            ticks: {
              fontSize: 20,
              fontColor: "white",
              display: true,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });
};

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
  if (inputvalue in impact) {
    let RenderingData = impact[inputvalue];
    for (const item in RenderingData) {
      labelsNew.push(item.split("")[0].toLocaleUpperCase());
      valuesNew.push(RenderingData[item]);
    }
  }

  return { labels: labelsNew, values: valuesNew };
}

startup("climate_change");
