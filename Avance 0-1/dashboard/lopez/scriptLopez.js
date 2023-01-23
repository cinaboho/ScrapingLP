var dataGlobal,dataEtiquetas,dataValores;
const ctx = document.getElementById("grafico").getContext('2d');	 
var datosCSV;

//https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
    $.ajax({
      type: "GET",  
      url: "johanna_questions.csv",
      dataType: "text",       
      success: function(response)  
      {
        datosCSV = $.csv.toArrays(response);
        generateHtmlTable1(datosCSV);
      }   
    });
	  
	  
	//https://stackoverflow.com/questions/30223361/js-filereader-read-csv-from-local-file-jquery-csv
	
	function procesarArchivo(){		
		var file = document.getElementById("formFile").files[0];
		var name = document.getElementById("formFile").files[0].name;		
		var contenido;		
		const reader = new FileReader();
		reader.readAsText(file);
		 reader.onload = function(event){
			 var csv111 = event.target.result;
			 dataGlobal = $.csv.toArrays(csv111);			
			generateHtmlTable(dataGlobal);
			graficoBarra();
		 };
		
  
	};
	
	//https://parzibyte.me/blog/2021/01/03/chart-js-tutorial-ejemplos-graficas-web/
	//https://parzibyte.me/blog/2018/05/03/reiniciar-limpiar-grafica-chart-js/
		function graficoBarra(){					
			dataValores=dataGlobal.map(item => item[1]);
			dataEtiquetas=dataGlobal.map(item => item[0]);
			dataValores.splice(0, 1);
			dataEtiquetas.splice(0, 1);			
			if (window.grafica) {
				window.grafica.clear();
				window.grafica.destroy();
			}		
	  var barColors = ["red", "green","blue","orange","brown"];
	  
	  
      window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dataEtiquetas,
          datasets: [{            
            backgroundColor: barColors,//'rgba(161, 198, 247, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: dataValores,
          }]
        },
        options: {
		legend: {display: false},
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        },
      });  
	};
	//https://stackoverflow.com/questions/59681505/chartjs-adding-percentages-to-pie-chart-legend
	//label porcentaje
	function graficoPIE(){			
			dataValores=dataGlobal.map(item => item[1]);
			dataEtiquetas=dataGlobal.map(item => item[0]);			
			dataValores.splice(0, 1);
			dataEtiquetas.splice(0, 1);		
			total = dataValores.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));	
				console.log(total);
			total = dataValores.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
			labelsvalues = dataValores.map(function(value,i){
				let p= Math.round((value / total) * 100) + '%';
				return dataEtiquetas[i]+' '+p;
			});						
			if (window.grafica) {
				window.grafica.clear();
				window.grafica.destroy();
			}		
	
			const data = {
	  labels: labelsvalues,
	  datasets: [{
		label: 'My First Dataset',
		data: dataValores,
		backgroundColor: [
		  'rgb(255, 99, 132)',
		  'rgb(54, 162, 235)',
		  'rgb(255, 205, 86)',
		  'rgb(127, 17, 224)',
		  'rgb(244, 70, 17)',
		],
		hoverOffset: 4
	  }]
	};
		
	
		window.grafica = new Chart(ctx, {
			type: 'pie',
			data: data,	
			options: {                    
                    legend: {
                        display: true, position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 27,
                            pieceLabel: { mode: 'percentage', render: 'value' }
                        }
                    },				
                    
                }			
		  });
	
	};
	
	function generateHtmlTable(data) {
		var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';				
			});
			html += '</tr>';
		  }
		});
		//console.log(data);
		html += '</tbody>';
		html += '</table>';	
		document.getElementById("csv-display").innerHTML = '';		
		$('#csv-display').append(html);
	  }
		//data.forEach(element => console.log(element));
	}
	
	function generateHtmlTable1(data) {
		var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';				
			});
			html += '</tr>';
		  }
		});
		//console.log(data);
		html += '</tbody>';
		html += '</table>';	
		document.getElementById("csv-base").innerHTML = '';		
		$('#csv-base').append(html);
	  }
		//data.forEach(element => console.log(element));
	}
	
	//var result = $.csv.toArray('johanna_estadisticas_ps.csv');
	//var data = $.csv.toObjects('johanna_estadisticas_ps.csv'):
	/*$.get( "johanna_questions.csv", function( CSVdata) {
     // CSVdata is populated with the file contents...
     // ...ready to be converted into an Array
      data2 = $.csv.toArrays(CSVdata);
      console.log(data2)
  });*/
  
  /*var datosCSV;
    $.ajax({
      type: "GET",  
      url: "johanna_estadisticas_ranking.csv",
      dataType: "text",       
      success: function(response)  
      {
        datosCSV = $.csv.toArrays(response);
        generateHtmlTable(datosCSV);
      }   
    });*/
	
	
	  