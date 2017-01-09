(function() {
    'use strict';

    angular
        .module('analytics')
        .controller('HelloController', HelloController);

    HelloController.$inject = ['HelloService'];

    function HelloController(helloService) {
        var vm = this;

        vm.sayHello = sayHello;
        vm.greeting = {
            "id": 0,
            "content": "Wait a moment!"
        };

        (function initController() {
            sayHello()
        })();

        function sayHello() {
            console.log("say hello function");

            helloService
                .getHello()
                .then(
                    function successCallback(response) {
                        console.log("ok", response);
                        vm.greeting = response.data;
                    },
                    function errorCallback(error) {
                        console.error("erro", error);
                    }
                );
        }
    }

})();
