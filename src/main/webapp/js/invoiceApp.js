window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Invoice Timeline"
            },
            axisX:{
                title: "timeline",
                gridThickness: 2
            },
            axisY: {
                title: "face value"
            },
            data: [
                {
                    type: "scatter",
                    dataPoints: [

                        {x: new Date(2017, 01, 1), y: 1100},
                        {x: new Date(2017, 01, 2), y: 1200},
                        {x: new Date(2017, 01, 2), y: 1250},
                        {x: new Date(2017, 01, 3), y: 1280},
                        {x: new Date(2017, 01, 4), y: 1600},

                        {x: new Date(2017, 01, 5), y: 2200},
                        {x: new Date(2017, 01, 6), y: 2200},
                        {x: new Date(2017, 01, 7), y: 2200},
                        {x: new Date(2017, 01, 8), y: 2200},
                        {x: new Date(2017, 01, 9), y: 2530},
                        {x: new Date(2017, 01, 11), y: 3040},

                        {x: new Date(2017, 01, 13), y: 4030},
                        {x: new Date(2017, 01, 14), y: 3040},
                        {x: new Date(2017, 01, 18), y: 4060},
                        {x: new Date(2017, 01, 20), y: 4040},
                        {x: new Date(2017, 01, 22), y: 5100},
                        {x: new Date(2017, 01, 23), y: 4200},
                        {x: new Date(2017, 01, 23), y: 3030},
                        {x: new Date(2017, 01, 23), y: 3020},

                        {x: new Date(2017, 01, 28), y: 8210},
                        {x: new Date(2017, 01, 31), y: 8040},
                        {x: new Date(2017, 02, 1), y: 9060},
                        {x: new Date(2017, 02, 4), y: 8300},
                        {x: new Date(2017, 02, 5), y: 9300},
                        {x: new Date(2017, 02, 7), y: 6300},
                        {x: new Date(2017, 02, 11), y: 9900},
                        {x: new Date(2017, 02, 20), y: 4200},
                        {x: new Date(2017, 02, 28), y: 8200},

                        {x: new Date(2017, 03, 5), y: 9040},
                        {x: new Date(2017, 03, 8), y: 9200},
                        {x: new Date(2017, 03, 11), y: 7020},
                        {x: new Date(2017, 03, 19), y: 9040},
                        {x: new Date(2017, 03, 20), y: 9030},
                        {x: new Date(2017, 03, 25), y: 10120},
                        {x: new Date(2017, 03, 30), y: 4020},

                        {x: new Date(2017, 04, 2), y: 10200},
                        {x: new Date(2017, 04, 4), y: 10100},
                        {x: new Date(2017, 04, 6), y: 10400},
                        {x: new Date(2017, 04, 8), y: 9400},
                        {x: new Date(2017, 04, 14), y: 9400},
                        {x: new Date(2017, 04, 24), y: 9000},
                        {x: new Date(2017, 04, 24), y: 10600},
                        {x: new Date(2017, 04, 26), y: 10400},
                        {x: new Date(2017, 04, 27), y: 12400},
                        {x: new Date(2017, 04, 28), y: 13400},

                        {x: new Date(2017, 05, 4), y: 10400},
                        {x: new Date(2017, 05, 14), y: 10600},
                        {x: new Date(2017, 05, 24), y: 11000},
                        {x: new Date(2017, 05, 25), y: 12000},
                        {x: new Date(2017, 05, 31), y: 13000},

                        {x: new Date(2017, 06, 4), y: 10400},
                        {x: new Date(2017, 06, 5), y: 13400}
                    ]
                }
            ]
        });

    chart.render();
}