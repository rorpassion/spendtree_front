'use strict'

var LoginController = function($scope, $state, $localStorage, Restangular) {
    $scope.error = false;

    $scope.submit = function () {
        var data_encoded = $.param($scope.user);
        Restangular.all('users').one("authenticate").customPOST(data_encoded, undefined, undefined, {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"})
            .then(function(response) {
            if (!response.error) {
                $localStorage.user_id = response.user.id;
                $scope.error = false;
                $state.go('dashboard');
            } else {
                delete $localStorage.user_id;
                $scope.error = true;
                $scope.error_text = response.message;
            }
        });
    }
}