const app = angular.module('invoiceAppModule', ['ui.bootstrap']);

app.controller('InvoiceAppController', function ($http, $scope) {
    const invApp = this;

    // We identify the node.
    const apiBaseURL = "/rest/invoice";

    invApp.selectedDate = new Date(2017, 01, 1);

    function filterByDate(invoice) {
        return (new Date(invoice.maturityDate)).getTime() === invApp.selectedDate.getTime();
    };

    invApp.invoices = [];

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

    invApp.chart.options.data[0].dataPoints = [];

    // Get invoices data from server and render the chart
    $http.get(apiBaseURL)
        .then(function success(response) {
            invApp.invoices = response.data;

            //grouped by date
            var result = [];
            invApp.invoices.reduce(function (res, value) {
                if (!res[value.maturityDate]) {
                    res[value.maturityDate] = {
                        qty: 0,
                        x: value.maturityDate,
                        y: 0
                    };
                    result.push(res[value.maturityDate]);
                }
                res[value.maturityDate].qty += 1;
                res[value.maturityDate].y += value.faceValueInUSD;
                return res;
            }, {});

            //construct data points
            result.forEach(function (item) {
                invApp.chart.options.data[0].dataPoints.push({
                    x: new Date(item.x),
                    y: item.y,
                    indexLabel: item.qty.toString()
                });
            });

            invApp.chart.render();
        }, function error(response) {
            alert("Cannot get data from server!" + response);
        });

});
