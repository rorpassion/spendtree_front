'use strict'

var PropertyController = function($rootScope, $scope, $state, $localStorage, Restangular, $stateParams, clientList) {
    $scope.error = "";
    $scope.property = {};
    $scope.properties = [];
    $scope.client_list = clientList;
    
    $scope.property_type = new Object();
    $scope.property_type['single-condo'] = 'Single Condominium';
    $scope.property_type['single-home'] = 'Single Family Home';
    $scope.property_type['small-family'] = 'Small Multifamily';
    $scope.property_type['large-family'] = 'Large Multifamily';

    /**
    * Add new property when click Next button
    */
    $scope.add_property = function () {
        $scope.property.user_id = $localStorage.user_id;

        var data_encoded = $.param($scope.property);
        Restangular.one('properties', $localStorage.user_id).customPOST(data_encoded, undefined, undefined, {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"})
        .then(function(response) {
            $scope.error = 'success';
            $scope.showDetails = true;
            
            Restangular.one('properties', $localStorage.user_id).get().then(function(response) {
                $rootScope.properties = response;
                $scope.properties = $rootScope.properties;
            });
                                    
        }, function(error) {
            $scope.error = 'failure';
            $scope.showDetails = false;
        });
    }
    
    /**
    * Retrieve property list when loading list page
    */
    $scope.init_list = function() {
        $scope.show_properties =[]
        Restangular.one('properties', $localStorage.user_id).get().then(function(response) {
            $scope.properties = response;
            
            for (var i = 0; i < $scope.properties.length; i++) {
                var prop = $scope.properties[i];
                var prop_record = {};
                prop_record.id          = prop.id;
                prop_record.address     = prop.address;
                prop_record.type_label  = $scope.property_type[prop.type];
                prop_record.client_name = prop.client.name;
                prop_record.total_units = prop.total_units;
                
                $scope.show_properties.push(prop_record);
            }
        });
    }
    
    /**
    * Initialize edit page information
    */
    $scope.init_edit = function() {
        $scope.properties = $rootScope.properties;
        if ($stateParams.id != null) {
            Restangular.one('properties').all($localStorage.user_id).get($stateParams.id).then(function(response) {
                $scope.property = response.property;
                $scope.selected_client = {id: $scope.property.id};
                $scope.property_address = $scope.property.address;
            });
        }
    }
    
    /**
    * Update the property information.
    */
    $scope.update_property = function() {
        if ($stateParams.id != null) {
            $scope.property.user_id = $localStorage.user_id;
            $scope.property.client_id = $scope.selected_client.id;

            var data_encoded = $.param($scope.property);
            Restangular.one('properties', $localStorage.user_id).one($stateParams.id).customPUT(data_encoded, undefined, undefined, undefined)
            .then(function(response) {
                $scope.error = "success";
                $rootScope.properties = response;
                $scope.properties = response;
                $scope.property_address = $scope.property.address;
            }, function(error) {
                $scope.error = "failure";
            });
        }
    }
}