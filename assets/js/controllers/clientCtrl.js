'use strict'

var ClientController = function($rootScope, $scope, $state, $localStorage, Restangular, $stateParams) {
    $scope.error = "";
    $scope.client = {};

    $scope.add_client = function () {
        $scope.client.user_id = $localStorage.user_id;

        var data_encoded = $.param($scope.client);
        Restangular.one('clients').customPOST(data_encoded, undefined, undefined, {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"})
        .then(function(response) {
            $scope.error = "success";
            $scope.client = {}
            
            Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
                $rootScope.clients = response;
            });
                                    
        }, function(error) {
            $scope.error = "failure";
        });
    }
    
    $scope.init_list = function() {
        Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
            $scope.clients = response;
        });
    }
    
    $scope.init_edit = function() {
        if ($stateParams.id != null) {
            Restangular.one('clients', $stateParams.id).get().then(function(response) {
                $scope.client = response.client; 
                $scope.client_name = $scope.client.name;
            });
        }
    }
    
    $scope.update = function() {
        debugger;
        if ($stateParams.id != null) {
            $scope.client.user_id = $localStorage.user_id;
            
            var data_encoded = $.param($scope.client);
            Restangular.one('clients', $stateParams.id).customPUT(data_encoded, undefined, undefined, undefined)
            .then(function(response) {
                $scope.error = "success";
                debugger;
                Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
                    $rootScope.clients = response;
                });
            }, function(error) {
                $scope.error = "failure";
            });
        }
    }
}