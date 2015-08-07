'use strict'

/**
* Integrate Client data with API endpoint
* 
*/
spendtreeApp.factory("clientService", function($localStorage, Restangular){
    return {
        getClientList: function() {
            return Restangular.one('clients', $localStorage.user_id).getList('list').then(function(response) {
                return response;
            });
        }
    };
});