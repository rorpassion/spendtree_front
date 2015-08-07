'use strict'

var SidebarController = function($rootScope, $scope, $localStorage, Restangular) {

    Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
        $rootScope.clients = response;
    });
    
    Restangular.one('properties', $localStorage.user_id).get().then(function(response) {
        $rootScope.properties = response;
    });
}