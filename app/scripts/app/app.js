/*jshint unused:false */
/*global CategoryTree:true */

'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
  return window._; // assumes underscore has already been loaded on the page
});
console.log('define module CategoryTreeApp', angular.module('ngMaterial'));
var CategoryTreeApp = angular.module('CategoryTreeApp',
    [ 'ngRoute',
      'ngMaterial',
      'ui.bootstrap',
      'underscore',
      'LocalStorageModule'
    ])
  .config([  '$routeProvider', 'localStorageServiceProvider',
    function ($routeProvider,   localStorageServiceProvider) {
      console.log('CategoryTreeApp config');
      localStorageServiceProvider.setPrefix('CategoryTree');

      $routeProvider
        .when('', {
          redirectTo: '/tree'
        })
        .when('/', {
          redirectTo: '/tree'
        })
        .when('/tree', {
          templateUrl: '../../views/Tree.html',
          controller: 'TreeController'
        })
        .otherwise({
          redirectTo: '/tree'
        });
    }
  ])
  .run([     '$rootScope', '$location', '$log',
    function ($rootScope,   $location,   $log) {
      console.log('CategoryTreeApp run');
    }
  ]);
console.log('CategoryTreeApp defined');
