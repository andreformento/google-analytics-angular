(function() {
    'use strict';

    angular
        .module('analytics')
        .factory('ReportService', ReportService);

    ReportService.$inject = ['$http', 'analyticsConfig', 'GAuth', 'GApi'];

    function ReportService($http, analyticsConfig, GAuth, GApi) {
        var service = {};

        service.getReport = getReport;

        (function init() {
            login();
        })();

        return service;

        // public
        function getReport() {
            var data = {
                reportRequests: [{
                    viewId: analyticsConfig.VIEW_ID,
                    dateRanges: [{
                        startDate: '30daysAgo',
                        endDate: 'today'
                    }],
                    metrics: [{
                        expression: 'ga:sessions'
                    }]
                }]
            };

            // var r = $http.get('http://rest-service.guides.spring.io/greeting');

            var r = GApi.executeAuth('reports:batchGet', 'POST', data).then(function(response) {
                console.log('ok :(', response);
            }, function() {
                console.log('error :(');
            });

            return r;


            /*var VIEW_ID = analyticsConfig.VIEW_ID,
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

            return $http(request, data);*/
        }

        // private
        function login() {
            var CLIENT = analyticsConfig.API_KEY; // yourGoogleAuthAPIKey
            //var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

            //GApi.load('myApiName', 'v1', BASE);
            //GApi.load('calendar', 'v3');
            GApi.load('analyticsreporting', 'v4'); // for google api (https://developers.google.com/apis-explorer/)

            GAuth.setClient(CLIENT)
                // default scope is only https://www.googleapis.com/auth/userinfo.email
            GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/analytics.readonly');

            // load the auth api so that it doesn't have to be loaded asynchronously
            // when the user clicks the 'login' button.
            // That would lead to popup blockers blocking the auth window
            GAuth.load();

            // or just call checkAuth, which in turn does load the oauth api.
            // if you do that, GAuth.load(); is unnecessary
            GAuth.checkAuth().then(
                function(user) {
                    console.log(user.name + ' is logged in');
                    $state.go('webapp.home'); // an example of action if it's possible to
                    // authenticate user at startup of the application
                },
                function() {
                    $state.go('login'); // an example of action if it's impossible to
                    // authenticate user at startup of the application
                }
            );
        }

    }

})();
