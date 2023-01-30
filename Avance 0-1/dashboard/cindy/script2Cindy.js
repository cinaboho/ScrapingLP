$.ajax({
    type: "GET",  
    url: "cindy/cindy_q3N.csv",
    dataType: "text",       
    success: function(response)  
    {
        var dataCSV = $.csv.toArrays(response);
        pregunta2(dataCSV);
    }   
});

function pregunta2(dataCSV){
    const ctx = document.getElementById("grafico3").getContext('2d');
    var estadisticaArray=[];
    // for (var i = 0; i<dataCSV.length; i++) {
    //      mes = ((dataCSV[i])[0]);
    //      year = ((dataCSV[i])[1]);
    //      estadisticaArray.push([mes,year]);
    // }
     var arrayMeses =[];
     for (var i = 0; i<dataCSV.length; i++) {
         mes = ((dataCSV[i])[0]);
         arrayMeses.push(mes);
    }
    var repetidos = {};
    
    arrayMeses.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
      });
    
      for(const [key, value] of Object.entries(repetidos)){
        estadisticaArray.push([value,key,2022]);
      }


    generateHtmlTableEstadistica2(estadisticaArray,"display3")		
    graficoPIE(ctx,estadisticaArray);
}

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
    
function generateHtmlTableEstadistica2(data,nombre) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

    if(typeof(data[0]) === 'undefined') {
        return null;
    } else {
        html += '<thead>';
                html += '<tr>';
                
                    html += '<th>';
                    html += "CANTIDAD";
                    html += '</th>';
                    html += '<th>';
                    html += "MES";
                    html += '</th>';
                    html += '<th>';
                    html += "AÑO";
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
