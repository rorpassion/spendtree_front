var spendtreeApp = angular.module('spendtreeApp', ['ui.router', 'ngStorage', 'restangular', 'spendtreeControllers']);

spendtreeApp.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
	function($stateProvider, $urlRouterProvider, RestangularProvider){
        RestangularProvider.setBaseUrl('http://localhost/laravel/spendtree/public/api/v1/');
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        
        $urlRouterProvider.otherwise("/otherwise");
        
		$stateProvider
            .state('login', {
                url:  '/login',
                views: {
                    'base': {
                        templateUrl: 'login.html',
                        controller: LoginController
                    }
                }
            })
			.state('dashboard',{
                url: '/dashboard',
                views: {
                    'base': {
                        templateUrl: 'app.html',
                        controller: SidebarController
                    },
                    'content@dashboard': {
                        templateUrl:'partials/dashboard.html',
                        controller: DashboardController
                    }
                }
			}) //clients
            .state('clients', {
                url: '/clients',
                views: {
                    'base': {
                        templateUrl: 'app.html'
                    }
                }
            })
			.state('clients.add', {
                url: '/add',
                views: {
                    'base': {
                        templateUrl: 'app.html',
                        controller: SidebarController,
                    },
                    'content@clients': {
                        templateUrl: 'partials/clients-add.html',
                        controller: ClientController
                    }
                }
			})
			.state('clients.list', {
                url: '/list',
                views: {
                    'base': {
                        templateUrl: 'app.html',
                        controller: SidebarController
                    },
                    'content@clients': {
                        templateUrl: 'partials/clients-list.html',
                        controller: ClientController
                    }
                }
			})
			.state('clients.edit', {
                url: '/edit/:id',
                views: {
                    'base': {
                        templateUrl: 'app.html',
                        controller: SidebarController
                    },
                    'content@clients': {
                        templateUrl: 'partials/clients-edit.html',
                        controller: ClientController        
                    }
                }
			})//properties
            .state('properties', {
                url: '/properties',
                views: {
                    'base': {
                        templateUrl: 'app.html',
                        controller: SidebarController,
                    }
                }
            })
			.state('properties.add', {
                url: '/add',
                views: {
                    'base': {
                        templateUrl: 'app.html'        
                    },
                    'content@properties': {
                        templateUrl: 'partials/properties-add.html',
                        controller: PropertyController,
                        resolve: {
                            clientList: function(clientService){
                                return clientService.getClientList();
                            }
                        }
                    }
                }
			})
			.state('properties.list', {
                url: '/list',
                views: {
                    'base': {
                        templateUrl: 'app.html'        
                    },
                    'content@properties': {
                        templateUrl: 'partials/properties-list.html',
                        controller: PropertyController,
                        resolve: {
                            clientList: function(clientService){
                                return clientService.getClientList();
                            }
                        }     
                    }
                }
			})
			.state('properties.edit', {
                url: '/edit/:id',
                views: {
                    'base': {
                        templateUrl: 'app.html'        
                    },
                    'content@properties': {
                        templateUrl: 'partials/properties-edit.html',
                        controller: PropertyController,
                        resolve: {
                            clientList: function(clientService){
                                return clientService.getClientList();
                            }
                        }
                    }
                }
			})//tenants
//			.state('/tenants/add', {
//				templateUrl:'partials/tenants-add.html'
//			}).
//			.state('/tenants/list', {
//				templateUrl:'partials/tenants-list.html'
//			}).
//			.state('/tenants/edit/:tenantID', {
//				templateUrl:'partials/tenants-edit.html'
//				
//			}).
//			.state('/tenants/outstanding', {
//				templateUrl:'partials/tenants-balances-outstanding.html'
//				
//			}).//leases
//			.state('/leases/add', {
//				templateUrl:'partials/leases-add.html'
//			}).
//			.state('/leases/list', {
//				templateUrl:'partials/leases-list.html'
//			}).
//			.state('/leases/edit/:tenantID', {
//				templateUrl:'partials/leases-edit.html'
//				
//			}).//vendors
//			.state('/vendors/add', {
//				templateUrl:'partials/vendors-add.html'
//			}).
//			.state('/vendors/list', {
//				templateUrl:'partials/vendors-list.html'
//			}).
//			.state('/vendors/edit/:vendorID', {
//				templateUrl:'partials/vendors-edit.html'
//				
//			}).//transactions
//			.state('/transactions/list', {
//				templateUrl:'partials/transactions-list.html'
//			}).
//			.state('/transactions/bills/add', {
//				templateUrl:'partials/bills-add.html'
//			}).
//			.state('/transactions/bills/edit/:billID', {
//				templateUrl:'partials/bills-edit.html'
//			}).
//			.state('/transactions/bills/pay/:billID', {
//				templateUrl:'partials/bills-pay.html'
//			}).
//			.state('/transactions/rent/pay', {
//				templateUrl:'partials/rent-pay.html'
//			}).
//			.state('/transactions/add', {
//				templateUrl:'partials/transactions-add.html'
//			}).
//			.state('/transactions/pending', {
//				templateUrl:'partials/dashboard.html'
//			}).//accounting
//			.state('/accounting/banking', {
//				templateUrl:'partials/banking-list.html'
//			}).
//			.state('/accounting/banking/add', {
//				templateUrl:'partials/banking-add.html'
//			}).
//			.state('/accounting/banking/edit/:vendorID', {
//				templateUrl:'partials/banking-edit.html'
//			}).
//			.state('/accounting/ledger', {
//				templateUrl:'partials/accounts-ledger.html'
//			}).
//			.state('/accounting/chart', {
//				templateUrl:'partials/accounts-chart.html'
//			}).
//			.state('/accounting/accounts/add', {
//				templateUrl:'partials/accounts-add.html'
//			}).
//			.state('/accounting/financials', {
//				templateUrl:'partials/accounts-financials.html'
//			}). //faq
//			.state('/faq', {
//				templateUrl:'partials/faq.html'
//			}). //contact
//			.state('/contact', {
//				templateUrl:'partials/contact-us.html'
//			}). //profile
//			.state('/profile', {
//				templateUrl:'partials/profile.html'
//			}).
			.state('otherwise', {
                url: '/otherwise',
                views: {
                    'base': {
                        templateUrl: '',
                        controller: function($state) {
                            $state.go('login');
                        }
                    }
                }
            });
	}]);
	
spendtreeApp.run(function ($rootScope, $localStorage, $state) {

    $rootScope.config = {};
    //$rootScope.config.app_url = $location.url();
//    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
        $rootScope.body_class = toState.name == "login" ? "login" : ""
        if (toState.name != "login" && angular.isUndefined($localStorage.user_id)) {
            event.preventDefault();
            $state.go('login');
        }
        //show loading gif
		Metronic.blockUI();

    });
    $rootScope.$on('$stateChangeSuccess', function () {

        //hide loading gif
		Metronic.unblockUI();


    });
    //$rootScope.$on('$stateChangeError', function () {
//
//        //hide loading gif
//        alert('Error');
//		Metronic.unblockUI();
//
//
//    });
});



