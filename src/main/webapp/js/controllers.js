//inject the $scope service into the controller
app.controller('ChartController', function($scope) {

    $scope.chart = new CanvasJS.Chart("chartContainer", {
        theme: 'theme1',
        title:{
            text: "Nintendo Console Sales"              
        },
        axisY: {
            title: "million units",
            labelFontSize: 16,
        },
        axisX: {
            labelFontSize: 16,
        },
        data: [              
            {
                type: "bar",
                dataPoints: [
                    { label: "Wii U", y: 6.17 },
                    { label: "Wii", y: 101.06 },
                    { label: "GameCube", y: 21.74 },
                    { label: "64", y: 32.93 },
                    { label: "SNES", y: 49.10 },
                    { label: "NES", y: 61.91 },
                    { label: "3DS", y: 43.33 },
                    { label: "DS", y: 153.99 },
                    { label: "Advance", y: 81.51 },
                    { label: "GameBoy", y: 118.69 },
                ]
            }
        ]
    });

    $scope.chart.render(); //render the chart for the first time
            
    $scope.changeChartType = function(chartType) {
        $scope.chart.options.data[0].type = chartType;
        $scope.chart.render(); //re-render the chart to display the new layout
    }

});