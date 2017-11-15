const app = angular.module('invoiceAppModule', ['ui.bootstrap']);

app.controller('InvoiceAppController', function ($http, $scope) {
    const invApp = this;

    // Identify the rest api node.
    const apiBaseURL = "/rest/invoice";

    invApp.invoices = [];

    invApp.selectedInv = {
        referenceNumber: "",
        faceValueInUSD: 0,
        maturityDate: Date(2017, 01, 1)
    };

    invApp.chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Invoice Timeline"
            },
            axisX: {
                title: "timeline",
                interval: 1,
                intervalType: "day"
            },
            axisY: {
                title: "face value (USD)"
            },
            data: [
                {
                    click: function (e) {
                        invApp.selectedInv.referenceNumber = e.dataPoint.name;
                        invApp.selectedInv.faceValueInUSD = e.dataPoint.y;
                        invApp.selectedInv.maturityDate = e.dataPoint.x;
                        $scope.$apply();
                    },
                    type: "scatter",
                    toolTipContent: "Ref No.: {name} <br/> date: {x}, value: {y}"
                }
            ]
        });

    invApp.chart.options.data[0].dataPoints = [];

    // Get invoices
    $http.get(apiBaseURL)
        .then(function success(response) {
            invApp.invoices = response.data;
            invApp.invoices.forEach(function (item) {
                invApp.chart.options.data[0].dataPoints.push({
                    x: new Date(item.maturityDate),
                    y: item.faceValueInUSD,
                    name: item.referenceNumber
                });
            });
            invApp.chart.render();
        }, function error(response) {
            alert("Cannot get data from server!" + response);
        });

});
