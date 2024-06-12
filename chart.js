import Chart from "chart.js/auto";

let instance = null;

export function renderChart(carbs, protein, fat) {
  instance?.destroy();

  const ctx = document.querySelector("#app-chart").getContext("2d");

  instance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [carbs, protein, fat],
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
