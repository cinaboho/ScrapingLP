questionOneAndThree('1','pie');
questionOneAndThree('3','bar');


$.ajax({
  url: 'munoz/vivianacsv/viviana_questions.csv',
  dataType: 'text',
}).done(successFunction);

function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var table = '<table class="table">';
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
    if (singleRow === 0) {
      table += '<thead>';
      table += '<tr>';
    } else {
      table += '<tr>';
    }
    var rowCells = allRows[singleRow].split(',');
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
      if (singleRow === 0) {
        table += '<th>';
        table += rowCells[rowCell];
        table += '</th>';
      } else {
        table += '<td>';
        table += rowCells[rowCell];
        table += '</td>';
      }
    }
    if (singleRow === 0) {
      table += '</tr>';
      table += '</thead>';
      table += '<tbody>';
    } else {
      table += '</tr>';
    }
  }
  table += '</tbody>';
  table += '</table>';
  $('.table-responsive').append(table);
}

function questionOneAndThree(numeroarchivo, chart) {
  validateQuestion = new Set();
  var labels_cantidad = new Object();
  const chartData = 'munoz/vivianacsv/'+numeroarchivo+'viviana_question.csv'
  Papa.parse(chartData, {
    download: true,
    step: function (row) {
      if (!validateQuestion.has(row.data[0]) && row.data[1] != "") {
        validateQuestion.add(row.data[0])
        if (!row.data[1] == undefined || isNaN(labels_cantidad[row.data[1]])) {
          labels_cantidad[row.data[1]] = 1;
        }
        else {
          valor = labels_cantidad[row.data[1]];
          valor += 1;
          labels_cantidad[row.data[1]] = valor;
        }
      }
    },
    complete: function () {
      for (let clave in labels_cantidad) {
        if (labels_cantidad[clave] < 10) {
          delete labels_cantidad[clave];
        }
      }
      console.log(labels_cantidad);
      var etiquetas = Object.keys(labels_cantidad);
      var cantidad = Object.values(labels_cantidad);
      console.log(etiquetas);
      const data = {
        labels: etiquetas,
        datasets: [{
          label: 'Cantidad',
          data: cantidad,
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
      const config = {
        type: chart,
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      const myChart = new Chart(
        document.getElementsByClassName('grafico'+numeroarchivo),
        config
      );
      console.log("All done!");
    }
  });
}


