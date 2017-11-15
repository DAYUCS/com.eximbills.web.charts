const app = angular.module('invoiceAppModule', ['ui.bootstrap']);

app.controller('InvoiceAppController', function ($http, $scope) {
    const invApp = this;

    // Identify the rest api node.
    const apiBaseURL = "http://localhost:9080/rest/invoice";

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

                        //alert("dataSeries Event => Type: " + e.dataSeries.type + ", dataPoint { x:" + invApp.selectedInv.maturityDate + ", y: " + invApp.selectedInv.faceValue + ", label: " + invApp.selectedInv.referenceNumber + " }");
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
            invApp.invoices.forEach(function(item){
                invApp.chart.options.data[0].dataPoints.push({x: new Date(item.maturityDate), y: item.faceValueInUSD, name: item.referenceNumber});
            });
            //invApp.chart.options.data[0].dataPoints = invApp.invoices;
            //alert("invoice number: " + invApp.chart.options.data[0].dataPoints.length);
            //alert("invoice[0]" + invApp.chart.options.data[0].dataPoints[0].x
            //    + " - " + invApp.chart.options.data[0].dataPoints[0].y
            //    + " - " + invApp.chart.options.data[0].dataPoints[0].label);
            invApp.chart.render();
        },function error(response) {
            alert("Cannot get data from server!" + response);
        });

});
