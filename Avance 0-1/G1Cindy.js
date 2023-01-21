d3.csv('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/atp_wta.csv')
  .then(makeChart);

function makeChart(players) {
  var chart = new Chart('chart', {
    type: 'horizontalBar',
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [10, 20, 30]
        }
      ]
    }
  });
}
var chart = new Chart('chart', {
  type: 'horizontalBar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [10, 20, 30]
      }
    ]
  }
});