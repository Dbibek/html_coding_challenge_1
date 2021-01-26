(function () {
  const title = document.querySelector("#title");
  const select = document.querySelector("#select");
  const canvasElement = document.querySelector("#myCanvas");

  title.textContent = data.name;

  const { impacts: impact } = data;
  const { climate_change: climate_change, energy_use: energy_use } = impact;

  const initializeOptions = function () {
    for (const property in impact) {
      const option = document.createElement("option");
      option.setAttribute("value", property);
      option.appendChild(document.createTextNode(property));
      select.appendChild(option);
    }
  };

  const reDraw = function (lbs, vls) {
    const ctx = canvasElement.getContext("2d");
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
            borderColor: "#816161",
            barThickness: 50,
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
                padding: 30,
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

  const startDraw = function (type) {
    const redrawData = getBar(type);
    reDraw(redrawData.labels, redrawData.values);
  };

  const getBar = function (inputvalue) {
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
  };

  const initialize = function () {
    // START Attach Event Listener
    document.addEventListener("DOMContentLoaded", function () {
      // event listner to change the value of the select option
      select.addEventListener("change", (event) => {
        event.preventDefault();
        startDraw(event.target.value);
      });
    });
    // END Attach Event Listener

    initializeOptions();
    startDraw("climate_change");
  };

  initialize();
})();
