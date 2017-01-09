(function() {
    'use strict';

    angular
        .module('analytics')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService'];

    function ReportController(reportService) {
        var vm = this;

        vm.sayReport = sayReport;
        vm.obj = {
            "message": "Wait a moment!"
        };

        (function initController() {
            sayReport()
        })();

        function sayReport() {
            console.log("say report function");

            reportService
                .getReport()
                .then(
                    function(response) {
                        console.log("ok", response);
                        vm.obj = response;
                    },
                    function(error) {
                        vm.obj = error;
                        console.error(error.data.error);
                    }
                );
        }
    }

})();
