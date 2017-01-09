(function() {
    'use strict';

    angular
        .module('analytics')
        .factory('ReportService', ReportService);

    ReportService.$inject = ['$http', 'analyticsConfig'];

    function ReportService($http, analyticsConfig) {
        var service = {};

        service.getReport = getReport;

        return service;

        function getReport() {
            console.log("analyticsConfig.VIEW_ID", analyticsConfig.VIEW_ID);


            var VIEW_ID = analyticsConfig.VIEW_ID,
                request = {
                    method: 'POST',
                    url: 'https://analyticsreporting.googleapis.com/v4/reports:batchGet',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                },
                data = {
                    reportRequests: [{
                        viewId: VIEW_ID,
                        dateRanges: [{
                            startDate: '30daysAgo',
                            endDate: 'today'
                        }],
                        metrics: [{
                            expression: 'ga:sessions'
                        }]
                    }]
                };

            return $http(request, data);
        }

    }

})();
