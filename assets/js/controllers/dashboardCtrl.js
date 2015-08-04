'use strict'

var DashboardController = function($rootScope, $scope, $state, $localStorage, Restangular, $stateParams) {

    $scope.init = function() {
        
        Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
            $rootScope.clients = response;
        });
    }
}