//var dataGlobal;



//var datosCSV;

	//https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
	$.ajax({
		type: "GET",  
		url: "cindy/cindy_q1.csv",
		dataType: "text",       
		success: function(response)  
		{
			var dataCSV = $.csv.toArrays(response);
			generateHtmlTableData(dataCSV);
			pregunta1(dataCSV);
			// pregunta2(dataCSV);
			// pregunta3(dataCSV);
		}   
	});
	  
	  
	//https://stackoverflow.com/questions/30223361/js-filereader-read-csv-from-local-file-jquery-csv	
	/*function procesarArchivo(){		
		var file = document.getElementById("formFile").files[0];
		var name = document.getElementById("formFile").files[0].name;
		//document.getElementById('nombre_archivo').innerHTML="Datos del archivo "+name;		
		var contenido;		
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event){
			var csv = event.target.result;
			dataCSV = $.csv.toArrays(csv);
			generateHtmlTableData(dataCSV);
			pregunta1(dataCSV);
			pregunta2(dataCSV);
			pregunta3(dataCSV);
		 };  
	};*/
	function pregunta1(dataCSV){
		const ctx = document.getElementById("grafico1").getContext('2d');		
		// var estadisticaArray=[['Roblox',146],['Big Farm',135]];
		var estadisticaArray=[];
		var estadisticaArray2=[];
		var nombre;
		//estadisticaArray.push([(dataCSV[0])[0],(dataCSV[0])[1]]);
		
		//estadisticaArray.push(dataCSV);
		//estadisticaArray.push(dataCSV[0]);
		//estadisticaArray.push(dataCSV[1]);
		// arra=dataCSV[0]
		// estadisticaArray.push(arra);
		
		for (var i = 1; i <= 20; i++) {					 	
			//nombre='PS' + i.toString();
			//var res=dataCSV.filter ( (item) => item[0].toUpperCase().includes(nombre)) ;			
			 estadisticaArray.push(dataCSV[i]);
		}
		// for (var i = 1; i <= 20; i++) {					 	
		// 	nombre='PS' + i.toString();
		// 	//var res=dataCSV.filter ( (item) => item[0].toUpperCase().includes(nombre)) ;			
		// 	 estadisticaArray2.push(dataCSV[i]);
		// }
		generateHtmlTableEstadistica(estadisticaArray,"display1")		
		graficoBarra(ctx,estadisticaArray);
	}
	
	function pregunta2(dataCSV){
		const ctx = document.getElementById("grafico2").getContext('2d');		
		var estadisticaArray=[];		
		var result =dataCSV.map( (item) => [item[1]]).reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});				
		for (var item in result) {
			estadisticaArray.push([item, result[item]]);
		}
		estadisticaArray.sort(function(a, b) {
			return b[1] - a[1];
		});	
		estadisticaArray.splice(5,estadisticaArray.length-5);		
		generateHtmlTableEstadistica(estadisticaArray,"display2")		
		graficoPIE(ctx,estadisticaArray);		
	}
	
	function pregunta3(dataCSV){
		const ctx = document.getElementById("grafico3").getContext('2d');		
		var estadisticaArray=[];		
		for (var i = 2020; i <= 2022; i++) {						
			var res=dataCSV.filter ( (item) => item[3].toUpperCase().includes(i.toString())) ;			
			estadisticaArray.push(['Año'+i.toString(),res.length]);
		}
		generateHtmlTableEstadistica(estadisticaArray,"display3")		
		graficoLinea(ctx,estadisticaArray);	
	}
	

	
	
	//https://parzibyte.me/blog/2021/01/03/chart-js-tutorial-ejemplos-graficas-web/
	//https://parzibyte.me/blog/2018/05/03/reiniciar-limpiar-grafica-chart-js/
	function graficoBarra(ctx,array){	
		var dataEtiquetas=array.map(item => item[0]);
		var dataValores=array.map(item => item[1]);
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
				responsive: true,
				indexAxis: 'x',
				plugins: {
					legend: {display: false},
					datalabels:{
						color: 'black'	,
						align:'center',						
					}							
				}
			},
			plugins:[ChartDataLabels]			
			/*options: {
			legend: {display: false},
			  scales: {
				yAxes: [{
				  ticks: {
					beginAtZero: true,
				  }
				}]
			  }
			},*/
		});  
	};
	
	//https://stackoverflow.com/questions/59681505/chartjs-adding-percentages-to-pie-chart-legend
	//label porcentaje
	function graficoPIE(ctx,array){	
		var dataEtiquetas=array.map(item => item[0]);
		var dataValores=array.map(item => item[1]);	
		total = dataValores.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
		labelsvalues = dataValores.map(function(value,i){
			let p= Math.round((value / total) * 100) + '%';
				return dataEtiquetas[i]+' '+p;
			});						
		
		var pieColors = [
		  'rgb(255, 99, 132)',
		  'rgb(54, 162, 235)',
		  'rgb(255, 205, 86)',
		  'rgb(127, 17, 224)',
		  'rgb(244, 70, 17)',
		];
		const data = {
			labels: labelsvalues,
			datasets: [{		
				data: dataValores,
				backgroundColor: pieColors,
				//hoverOffset: 4
			}]
		};
		//https://www.youtube.com/watch?v=hyyIX_8Xe8w
		//label en el pie con plugins formatter
	
		window.grafica = new Chart(ctx, {
			type: 'pie',
			data: data,	
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'right',					
					},
					datalabels:{
						color: 'black'	,
						align:'center',
						formatter: (value, context) => {	
							/*if (value !=0 )
							  return context.chart.data.labels[context.dataIndex];
							else
								return "";*/
							const datapoints= context.chart.data.datasets[0].data;
							function totalsum(total,datapoint){
								return parseInt(total) +parseInt(datapoint);
							}
							const totalvalue=datapoints.reduce(totalsum,0);
							const percentajeValue=Math.round(parseInt(value)/parseInt(totalvalue)*100);
							const display =[`${percentajeValue}%`];
							if (value !=0 )
							  return display;
							else
								return "";						
						},					
					}				  
				},				
			  },
			plugins:[ChartDataLabels]
			/*options: {                    
                    legend: {
                        display: true, position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 27,
                            pieceLabel: { mode: 'percentage', render: 'value' }
                        }
                    },
					plugins: {
						legend: {
							display: true,
							labels: {
								color: 'rgb(255, 99, 132)'
							}
						}
					}			
                    
                }*/
		  });
	
	};
	
	function graficoLinea(ctx,array){			
		var dataEtiquetas=array.map(item => item[0]);
		var dataValores=array.map(item => item[1]);		
		var barColors = ["red", "green","blue","orange","brown"];	  
		window.grafica = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dataEtiquetas,
				datasets: [{            
					backgroundColor: barColors,//'rgba(161, 198, 247, 1)',
					borderColor: 'rgb(47, 128, 237)',
					data: dataValores,
				}]
			},
			options: {			
				responsive: true,
				plugins: {
					legend: {display: false},
					datalabels:{
						color: 'black'	,
						align:'top',					
					}						
				}
			},	
			plugins:[ChartDataLabels]			
			/*options: {
			legend: {display: false},
			  scales: {
				yAxes: [{
				  ticks: {
					beginAtZero: true,
				  }
				}]
			  }
			},*/
		});  
	};	
		
	function generateHtmlTableEstadistica(data,nombre) {
		var html = '<table  class="table table-condensed table-hover table-striped">';

		if(typeof(data[0]) === 'undefined') {
			return null;
		} else {
			html += '<thead>';
					html += '<tr>';
					
						html += '<th>';
						html += "NOMBRE";
						html += '</th>';
						html += '<th>';
						html += "VALOR";
						html += '</th>';
					
					html += '</tr>';
					html += '</thead>';
					html += '<tbody>';
			$.each(data, function( index, row ) {				
					html += '<tr>';
					$.each(row, function( index, colData ) {
						html += '<td>';
						html += colData;
						html += '</td>';				
					});
					html += '</tr>';				
			});
			//console.log(data);
			html += '</tbody>';
			html += '</table>';	
			document.getElementById(nombre).innerHTML = '';		
			$('#'+nombre).append(html);
		}		
	}
	
	function generateHtmlTableData(data) {
		var html = '<table  class="table table-condensed table-hover table-striped tablita">';
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
			document.getElementById("csv-data").innerHTML = '';		
			$('#csv-data').append(html);
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
	
	
	  