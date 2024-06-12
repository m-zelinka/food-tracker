import Chart from "chart.js/auto";

let chartInstance = null;

export function renderChart(appData) {
  chartInstance?.destroy();

  const context = document.querySelector("#app-chart").getContext("2d");

  chartInstance = new Chart(context, {
    type: "doughnut",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [appData.totalCarbs, appData.totalProtein, appData.totalFat],
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
