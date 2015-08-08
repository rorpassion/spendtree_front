'use strict'

var PropertyController = function($rootScope, $scope, $state, $localStorage, $stateParams, Restangular, Upload, clientList) {
    $scope.error = "";
    $scope.property = {};
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
        $scope.units = [];

        // Preparing request params with files
        var data = new FormData();
        angular.forEach($scope.property, function(v, k) {
            data.append(k, v);
        });
        data.append('photo', $scope.photo);
        data.append('doc', $scope.doc);
        Restangular.one('properties', $localStorage.user_id)
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(data, '', {}, {'Content-Type': undefined})
        .then(function(response) {
            $scope.error = 'success';
            $scope.property = response.property;
            $rootScope.properties = response.properties;
            $scope.properties = $rootScope.properties;
            $scope.showDetails = true;

            for (var i = 0; i < parseInt($scope.property.total_units); i++) {
                $scope.units.push({});
            }
        }, function(error) {
            $scope.error = 'failure';
            $scope.showDetails = false;
        });
    }
    
    /**
    * Add units to the property
    */
    $scope.add_units = function() {
        for (var i = 0; i < $scope.units.length; i++) {
            var unit = $scope.units[i];
            unit.property_id = $scope.property.id;
            
            var data_encoded = $.param(unit);
            Restangular.one('units').customPOST(data_encoded, undefined, undefined, {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"})
            .then(function(response){
                $state.go('properties.list');
            });
        }
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
    
    $scope.select_unit = function(unit) {
        $scope.selected_unit = unit;
        $scope.selected_unit_name = $scope.selected_unit.name;
        $scope.unit_error = "";
    }
    
    /**
    * Initialize property edit page information
    */
    $scope.init_edit = function() {
        $scope.properties = $rootScope.properties;
        if ($stateParams.id != null) {
            Restangular.one('properties').all($localStorage.user_id).get($stateParams.id).then(function(response) {
                $scope.property = response.property;
                $scope.selected_client = {id: $scope.property.client.id};
                $scope.property_address = $scope.property.address;
                $scope.units = $scope.property.units
                
                $scope.selected_unit_name = "";
                if ($scope.units.length > 0) {
                    $scope.select_unit($scope.units[0]);
                } else {
                    $scope.select_unit({});
                }
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
            Restangular.one('properties', $localStorage.user_id).one($stateParams.id).customPUT(data_encoded, undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
            .then(function(response) {
                $scope.error = "success";
                $rootScope.properties = response;
                $scope.properties = $rootScope.properties;
                $scope.property_address = $scope.property.address;
            }, function(error) {
                $scope.error = "failure";
            });
        }
    }
    
    /**
    * Update Unit and Tenants information on Property Edit page
    */
    $scope.update_unit_details = function() {
        if ($stateParams.id != null) {
            $scope.selected_unit.property_id = $stateParams.id;

            var data_encoded = $.param($scope.selected_unit);
            
            if ($scope.selected_unit.id != null) {
                Restangular.one('units').one($scope.selected_unit.id.toString()).customPUT(data_encoded, undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
                .then(function(response) {
                    $scope.unit_error = "success";
                }, function(error) {
                    $scope.unit_error = "failure";
                });
            } else {
                Restangular.one('units').customPOST(data_encoded, undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
                .then(function(response) {
                    $scope.unit_error = "success";
                }, function(error) {
                    $scope.unit_error = "failure";
                });
            }
        }
    }
    
    /**
    * Create empty unit item when click Add Unit button
    */
    $scope.add_empty_unit = function() {
        $scope.units.push({type: "empty"});
    }
}