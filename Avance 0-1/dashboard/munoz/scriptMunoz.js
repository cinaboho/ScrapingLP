questions('1', 'line');
questions('2', 'pie');
questions('3', 'bar');

$.ajax({
  url: 'munoz/vivianacsv/viviana_questions.csv',
  dataType: 'text',
}).done(successFunction);

function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var table = '<table class="table table-condensed table-hover table-striped" >';
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
  $('#csv-data').append(table);
}

function questions(numeroarchivo, chart) {
  var validateQuestion = new Set();
  var labels_cantidad = new Object();
  var elementosTotales = -1;
  const chartData = 'munoz/vivianacsv/' + numeroarchivo + 'viviana_question.csv'
  Papa.parse(chartData, {
    download: true,
    step: function (row) {
      elementosTotales += 1;
      clave = row.data[0];
      elementoContar = row.data[1];
      if (numeroarchivo == '2') {
        var juegos = question2(elementoContar);
        for (let juego in juegos) {
          validate(validateQuestion, labels_cantidad, clave, (juegos[juego]).split(" ")[0]);
        }
      }
      else {
        validate(validateQuestion, labels_cantidad, clave, elementoContar);
      }
    },
    complete: function () {
      if (numeroarchivo == 3) {
        for (let clave in labels_cantidad) {
          if (labels_cantidad[clave] < 10) {
            delete labels_cantidad[clave];
          }
        }
      } else if (numeroarchivo == 1) {
        for (let clave in labels_cantidad) {
          if (labels_cantidad[clave] <= 1) {
            delete labels_cantidad[clave];
          }
        }
      } else if (numeroarchivo == 2) {
        for (let clave in labels_cantidad) {
          if (labels_cantidad[clave] < 15) {
            delete labels_cantidad[clave];
          }
        }
      }
      console.log(labels_cantidad);

      plantilla = `
      <h4>${elementosTotales}</h4>`;
      document.getElementById('datos0').innerHTML = plantilla;

      let sum = 0;
      for (let key in labels_cantidad) {
        sum += labels_cantidad[key];
      }

      plantillaDinamica = `
      <h4>${sum}</h4>`;
      document.getElementById('datos' + numeroarchivo).innerHTML = plantillaDinamica;

      if(numeroarchivo==2){
      plantillaPie = ``;
      let claves = Object.keys(labels_cantidad);
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        let porcentaje=(((labels_cantidad[clave])/sum)*100).toFixed(2);
        plantillaPie += `
  <tr>
    <td>${clave}</td>
    <td>${porcentaje}%</td>
  </tr>`
      }
      document.getElementById('porcentajes').innerHTML = plantillaPie;
    }
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
        document.getElementsByClassName('grafico' + numeroarchivo),
        config
      );
      console.log("All done!");
    }
  });
}


var question2 = function (arregloJuegos) {
  if (arregloJuegos != undefined) {
    if ((arregloJuegos.length) > 1) {
      const arreglo = arregloJuegos.split("|");
      arreglo.pop();
      return arreglo;
    }
  }
}

function validate(validateQuestion, labels_cantidad, clave, elementoContar) {
  if (!validateQuestion.has(clave) && elementoContar != "") {
    validateQuestion.add(clave);
    if (!elementoContar == undefined || isNaN(labels_cantidad[elementoContar])) {
      labels_cantidad[elementoContar] = 1;
    }
    else {
      valor = labels_cantidad[elementoContar];
      valor += 1;
      labels_cantidad[elementoContar] = valor;

    }
  }
}
