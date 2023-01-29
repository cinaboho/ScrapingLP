const chartData = 'dashboard/cindy/cindy_q1.csv'
// parse the file from CSV to JSON

d3.csv(chartData).then(function(datapoints) {
console.log(datapoints)
const Juego =[];
const Preguntas =[];
for(i=0; i < datapoints.length; i++) {
  // Preprocesamiento = Eliminar los juegos que nunca tuvieron
  // numero de preguntas
  condition= datapoints[i].Preguntas!= 0
  if (condition) {
    Juego.push(datapoints[i].Juego)
    Preguntas.push(datapoints[i].Preguntas)
  }
}
// setup
const data = {
   labels: Juego,
  datasets: [{
    label: 'Pregunta 1',
    data: Preguntas,
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }]
};

// config
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
});