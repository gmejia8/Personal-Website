var presets = window.chartColors;
var utils = Samples.utils;
var ctx = document.getElementById('chart').getContext('2d');
var options = {
    maintainAspectRatio: true,
    spanGaps: false,
    elements: {
        line: {
            tension: 1,
        }
    },
    scale: {
        gridLines: {
            color: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo']
        },
        ticks: {
            display: false
        }
    }
};
var data = {
    labels: ['danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence'],
    datasets: []
};

var chart = new Chart('chart', {
    type: 'radar',
    data: data,
    options: options,
});

function getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addDataset(result) {
    weeks = JSON.parse(result);
    var index = 0;
    var big_cycle = 0;
    var refreshId = setInterval(function () {
        data.datasets = [];
        var datapoint = {
            "label": "Week " + (index + 1),
            "backgroundColor": getColor(),
            "data": []
        }
        datapoint.data.push(weeks[index]['danceability'], weeks[index]['energy'], weeks[index]['instrumentalness'], weeks[index]['liveness'], weeks[index]['loudness'], weeks[index]['speechiness'], weeks[index]['valence']);
        data.datasets.push(datapoint);
        chart.update();
        index++;
        if (index == weeks.length) {
            index = 0;
            big_cycle++;
        }
        if (big_cycle > 2) {
            data.datasets = [];
            weeks.forEach(function (value, index) {
                var datapoint = {
                    "label": "Week " + (index + 1),
                    "backgroundColor": getColor(),
                    "data": []
                }
                datapoint.data.push(value['danceability'], value['energy'], value['instrumentalness'], value['liveness'], value['loudness'], value['speechiness'], value['valence'])
                data.datasets.push(datapoint);
                chart.update();
            });
            clearInterval(refreshId)
        }
    }, 2000)
}

$.ajax({
    url: "https://discovermeekly.azurewebsites.net/api/dataPipe?code=DnlLHUs5J0dSP3t9GHwu5nJfvSmz0z8T2l5f6CEXqTJTPMja90y6cA==&analysis=features",
    type: "GET",
    success: function (result) {
        addDataset(result)
    },
    error: function (error) {
        console.log(error);
    }
})