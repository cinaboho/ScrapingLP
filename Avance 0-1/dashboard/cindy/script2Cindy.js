$.ajax({
    type: "GET",  
    url: "cindy/cindy_q2.csv",
    dataType: "text",       
    success: function(response)  
    {
        var dataCSV = $.csv.toArrays(response);
        pregunta2(dataCSV);
    }   
});

function pregunta2(dataCSV){
    const ctx = document.getElementById("grafico2").getContext('2d');
    const ctx2 = document.getElementById("grafico2a").getContext('2d');
    //const ctx3 = document.getElementById("grafico2b").getContext('2d');
    var estadisticaArray=[];

    for (let i = 0; i < dataCSV.length; i++) {
        id = "P"+i;
        tema = (dataCSV[i])[0];
        NumResp = (dataCSV[i])[1];
        NumVista = (dataCSV[i])[2];
        estadisticaArray.push([id,tema, NumResp, NumVista]);
    }

    //generateHtmlTableEstadistica3(estadisticaArray,"display2")
    //graficoBarra3(ctx,estadisticaArray);

     sortedRespuestas = estadisticaArray.sort((a, b) => b[2] - a[2]);
     Los3Resp = [];
     for (let i = 0; i < 3; i++) {
        Los3Resp.push((sortedRespuestas[i]));
        //console.log(Los3Resp.length);
     }
    generateHtmlTableEstadistica3(Los3Resp,"display2")
    graficoBarra3(ctx,Los3Resp);
    /////
    sortedVistas = estadisticaArray.sort((a, b) => b[3] - a[3]);
    Las3Vistas = [];
    for (let i = 0; i < 3; i++) {
        Las3Vistas.push((sortedVistas[i]));
     }
     generateHtmlTableEstadistica3(Las3Vistas,"display2a")
     graficoBarra3(ctx2,Las3Vistas);
}

function generateHtmlTableEstadistica3(data,nombre) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

    if(typeof(data[0]) === 'undefined') {
        return null;
    } else {
        html += '<thead>';
                html += '<tr>';
                    html += '<th>';
                    html += "ID.TEMA";
                    html += '</th>';
                    html += '<th>';
                    html += "TEMA";
                    html += '</th>';
                    html += '<th>';
                    html += "CANT. RESP.";
                    html += '</th>';
                    html += '<th>';
                    html += "CANT. VISTA";
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

function graficoBarra3(ctx,array){	
    var dataIdTema=array.map(item => item[0]);
    var dataResp=array.map(item => item[2]);
    var dataVistas=array.map(item => item[3]);
    const datosRespuestas = {
        label: "Cantidad de Respuestas - 2022",
        data: dataResp, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(255, 159, 64, 0.5)',// Color de fondo
        borderColor: 'rgba(255, 159, 64, 1)',// Color del borde
        borderWidth: 1,// Ancho del borde
    
    };
    const datosVistas = {
        label: "Cantidad de Vistas - 2022s",
        data: dataVistas, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    };

    window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataIdTema,
            datasets: [
                
                datosRespuestas,
                datosVistas,
            ]
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
            },
            
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