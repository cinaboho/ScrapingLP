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
			pregunta1(dataCSV);
		}   
	});

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

	function graficoBarra(ctx,array){	
		var dataEtiquetas=array.map(item => item[0]);
		var dataValores=array.map(item => item[1]);
		// if (window.grafica) {
		// 	window.grafica.clear();
		// 	window.grafica.destroy();
		// }
		var barColors = ["red", "green","blue","orange","brown"];	  
		window.grafica = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: dataEtiquetas,
				datasets: [{
					label: "Num. Preguntas",          
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
						html += "NUM. PREGUNTAS";
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
			html += '</tbody>';
			html += '</table>';	
			document.getElementById(nombre).innerHTML = '';		
			$('#'+nombre).append(html);
		}		
	}
	
