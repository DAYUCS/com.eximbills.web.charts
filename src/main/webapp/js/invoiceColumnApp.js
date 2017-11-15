const app = angular.module('invoiceAppModule', ['ui.bootstrap']);

app.controller('InvoiceAppController', function ($http, $scope) {
    const invApp = this;

    // We identify the node.
    const apiBaseURL = "/api/example/";

    invApp.selectedDate = new Date(2017, 01, 1);

    function filterByDate(invoice) {
        return invoice.x.getTime() === invApp.selectedDate.getTime();
    };

    invApp.invoices = [
        {x: new Date(2017, 01, 1), y: 1100, indexLabel: "INV17000001"},
        {x: new Date(2017, 01, 2), y: 1200, indexLabel: "INV17000002"},
        {x: new Date(2017, 01, 2), y: 1250, indexLabel: "INV17000003"},
        {x: new Date(2017, 01, 3), y: 1280, indexLabel: "INV17000004"},
        {x: new Date(2017, 01, 4), y: 1600, indexLabel: "INV17000005"},

        {x: new Date(2017, 01, 5), y: 2200, indexLabel: "INV17000006"},
        {x: new Date(2017, 01, 6), y: 2200, indexLabel: "INV17000007"},
        {x: new Date(2017, 01, 7), y: 2200, indexLabel: "INV17000008"},
        {x: new Date(2017, 01, 8), y: 2200, indexLabel: "INV17000009"},
        {x: new Date(2017, 01, 9), y: 2530, indexLabel: "INV17000010"},
        {x: new Date(2017, 01, 11), y: 3040, indexLabel: "INV17000011"},

        {x: new Date(2017, 01, 13), y: 4030, indexLabel: "INV17000012"},
        {x: new Date(2017, 01, 14), y: 3040, indexLabel: "INV17000013"},
        {x: new Date(2017, 01, 18), y: 4060, indexLabel: "INV17000014"},
        {x: new Date(2017, 01, 20), y: 4040, indexLabel: "INV17000015"},
        {x: new Date(2017, 01, 22), y: 5100, indexLabel: "INV17000016"},
        {x: new Date(2017, 01, 23), y: 4200, indexLabel: "INV17000017"},
        {x: new Date(2017, 01, 23), y: 3030, indexLabel: "INV17000018"},
        {x: new Date(2017, 01, 23), y: 3020, indexLabel: "INV17000019"},

        {x: new Date(2017, 01, 28), y: 8210, indexLabel: "INV17000020"},
        {x: new Date(2017, 01, 31), y: 8040, indexLabel: "INV17000021"}
    ];

    // invApp.dataPoints should be derived from invApp.invoices
    invApp.dataPoints = [
        {x: new Date(2017, 01, 1), y: 1100, indexLabel: "1"},
        {x: new Date(2017, 01, 2), y: 2250, indexLabel: "2"},

        {x: new Date(2017, 01, 3), y: 1280, indexLabel: "1"},
        {x: new Date(2017, 01, 4), y: 1600, indexLabel: "1"},

        {x: new Date(2017, 01, 5), y: 2200, indexLabel: "1"},
        {x: new Date(2017, 01, 6), y: 2200, indexLabel: "1"},
        {x: new Date(2017, 01, 7), y: 2200, indexLabel: "1"},
        {x: new Date(2017, 01, 8), y: 2200, indexLabel: "1"},
        {x: new Date(2017, 01, 9), y: 2530, indexLabel: "1"},
        {x: new Date(2017, 01, 11), y: 3040, indexLabel: "1"},

        {x: new Date(2017, 01, 13), y: 4030, indexLabel: "1"},
        {x: new Date(2017, 01, 14), y: 3040, indexLabel: "1"},
        {x: new Date(2017, 01, 18), y: 4060, indexLabel: "1"},
        {x: new Date(2017, 01, 20), y: 4040, indexLabel: "1"},
        {x: new Date(2017, 01, 22), y: 5100, indexLabel: "1"},
        {x: new Date(2017, 01, 23), y: 10250, indexLabel: "3"},

        {x: new Date(2017, 01, 28), y: 8210, indexLabel: "1"},
        {x: new Date(2017, 01, 31), y: 8040, indexLabel: "1"}
    ];

    invApp.selectedInvoices = [];

    invApp.chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Invoice Timeline"
            },
            axisX: {
                title: "timeline",
                gridThickness: 2,
                interval: 1,
                intervalType: "day"
            },
            axisY: {
                title: "face value (USD)"
            },
            data: [
                {
                    click: function (e) {
                        invApp.selectedDate = e.dataPoint.x;
                        invApp.selectedInvoices = invApp.invoices.filter(filterByDate);
                        $scope.$apply();
                    },
                    type: "column",
                    toolTipContent: "date: {x} <br/> No. of Invoices: {indexLabel}, total: {y}",
                }
            ]
        });

    invApp.chart.options.data[0].dataPoints = invApp.dataPoints;
    invApp.chart.render(); //render the chart for the first time

});
