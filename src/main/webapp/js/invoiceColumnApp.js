const app = angular.module('invoiceAppModule', ['ui.bootstrap']);

// Fix for unhandled rejections bug.
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('InvoiceAppController', function ($http, $location, $uibModal, $scope) {
    const invApp = this;

    // We identify the node.
    const apiBaseURL = "/api/example/";

    invApp.selectedDate = new Date(2017, 01, 1);

    function filterByDate(invoice) {
        return invoice.x.getTime() === invApp.selectedDate.getTime();
    };

    invApp.invoices = [
        {x: new Date(2017, 01, 1), y: 1100, label: "INV17000001"},
        {x: new Date(2017, 01, 2), y: 1200, label: "INV17000002"},
        {x: new Date(2017, 01, 2), y: 1250, label: "INV17000003"},
        {x: new Date(2017, 01, 3), y: 1280, label: "INV17000004"},
        {x: new Date(2017, 01, 4), y: 1600, label: "INV17000005"},

        {x: new Date(2017, 01, 5), y: 2200, label: "INV17000006"},
        {x: new Date(2017, 01, 6), y: 2200, label: "INV17000007"},
        {x: new Date(2017, 01, 7), y: 2200, label: "INV17000008"},
        {x: new Date(2017, 01, 8), y: 2200, label: "INV17000009"},
        {x: new Date(2017, 01, 9), y: 2530, label: "INV17000010"},
        {x: new Date(2017, 01, 11), y: 3040, label: "INV17000011"},

        {x: new Date(2017, 01, 13), y: 4030, label: "INV17000012"},
        {x: new Date(2017, 01, 14), y: 3040, label: "INV17000013"},
        {x: new Date(2017, 01, 18), y: 4060, label: "INV17000014"},
        {x: new Date(2017, 01, 20), y: 4040, label: "INV17000015"},
        {x: new Date(2017, 01, 22), y: 5100, label: "INV17000016"},
        {x: new Date(2017, 01, 23), y: 4200, label: "INV17000017"},
        {x: new Date(2017, 01, 23), y: 3030, label: "INV17000018"},
        {x: new Date(2017, 01, 23), y: 3020, label: "INV17000019"},

        {x: new Date(2017, 01, 28), y: 8210, label: "INV17000020"},
        {x: new Date(2017, 01, 31), y: 8040, label: "INV17000021"},
        {x: new Date(2017, 02, 1), y: 9060, label: "INV17000022"},
        {x: new Date(2017, 02, 4), y: 8300, label: "INV17000023"},
        {x: new Date(2017, 02, 5), y: 9300, label: "INV17000024"},
        {x: new Date(2017, 02, 7), y: 6300, label: "INV17000025"},
        {x: new Date(2017, 02, 11), y: 9900, label: "INV17000026"},
        {x: new Date(2017, 02, 20), y: 4200, label: "INV17000027"},
        {x: new Date(2017, 02, 28), y: 8200, label: "INV17000028"},

        {x: new Date(2017, 03, 5), y: 9040, label: "INV17000029"},
        {x: new Date(2017, 03, 8), y: 9200, label: "INV17000030"},
        {x: new Date(2017, 03, 11), y: 7020, label: "INV17000031"},
        {x: new Date(2017, 03, 19), y: 9040, label: "INV17000032"},
        {x: new Date(2017, 03, 20), y: 9030, label: "INV17000033"},
        {x: new Date(2017, 03, 25), y: 10120, label: "INV17000034"},
        {x: new Date(2017, 03, 30), y: 4020, label: "INV17000035"},

        {x: new Date(2017, 04, 5), y: 13400, label: "INV17000036"}
    ];

    // invApp.dataPoints should be derived from invApp.invoices
    invApp.dataPoints = [
        {x: new Date(2017, 01, 1), y: 1100},
        {x: new Date(2017, 01, 2), y: 2250},

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
        {x: new Date(2017, 01, 23), y: 10250},

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

        {x: new Date(2017, 04, 5), y: 13400}
    ];

    invApp.selectedInvoices = [];

    invApp.chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Invoice Timeline"
            },
            axisX: {
                title: "timeline",
                gridThickness: 2
            },
            axisY: {
                title: "face value"
            },
            data: [
                {
                    click: function (e) {
                        invApp.selectedDate = e.dataPoint.x;
                        invApp.selectedInvoices = invApp.invoices.filter(filterByDate);
                        $scope.$apply();
                    },
                    type: "column",
                    toolTipContent: "date: {x}, total: {y}",
                }
            ]
        });

    invApp.chart.options.data[0].dataPoints = invApp.dataPoints;
    invApp.chart.render(); //render the chart for the first time

});
