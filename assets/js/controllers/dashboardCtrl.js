'use strict'

var DashboardController = function($rootScope, $scope, $localStorage, Restangular) {

    $scope.init = function() {
        Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
            $rootScope.clients = response;
        });
        
        Restangular.one('properties', $localStorage.user_id).get().then(function(response) {
            $rootScope.properties = response;
        });
    }
}