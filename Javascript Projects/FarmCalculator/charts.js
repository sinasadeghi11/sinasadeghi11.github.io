// NET PROFIT CHART
update()

function drawYieldGraph() {

years = generateYears(maxYears+1)
data = []

var ctx = document.getElementById('chart').getContext('2d');
    var data = {
  "labels": years,
  "datasets": [
    {
      "label": "",
      "backgroundColor": "",
      "fill": true,
      "data": yield,
      "lineTension": 0
    }
  ]
};
    var options = {
  "title": {
    "display": true,
    "text": "Net Profit",
    "position": "top",
    "fullWidth": true
  },
  "legend": {
    "display": false,
    "position": "bottom"
  },
  "scales": {
    "yAxes": [
      {
        "ticks": {
          "beginAtZero": true
        },
        "scaleLabel": {
          "labelString": "Profit $",
          "display": true
        }
      }
    ],
    "xAxes": {
      "0": {
        "scaleLabel": {
          "labelString": "Years",
          "display": true
        }
      }
    }
  },
  "tooltips": {
    "enabled": false
  },
  "animation": {
    "duration": "3"
  },
  "elements": {
    "arc": {
      "backgroundColor": "#e13e6f"
    },
    "line": {
      "lineTension": 1,
      "backgroundColor": "#1a9a03",
      "borderWidth": 1,
      "borderColor": "#000000",
      "borderCapStyle": "round",
      "fill": false
    }
  }
};

    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    
  }