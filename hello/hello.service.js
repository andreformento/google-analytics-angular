(function () {
    'use strict';

    angular
        .module('analytics')
        .factory('HelloService', HelloService);

    HelloService.$inject = ['$http'];
    function HelloService($http) {
        var service = {};

        service.getHello = getHello;

        return service;

        function getHello() {
            return $http.get('http://rest-service.guides.spring.io/greeting').then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            return response;
        }

        function handleError(error) {
            return { success: false, message: "errorMessage" };
        }
    }

})();
