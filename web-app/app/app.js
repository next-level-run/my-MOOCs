'use strict';

var angular = require('angular');

angular.module('app', [
  require('angular-route'),
  require('angular-sanitize')
]).run(function($rootScope, $location, sessionService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.requireLogin && !sessionService.currentUser.isAuthenticated) {
      $location.path('/signin');
      event.preventDefault();
    }
  });
});

require('./controllers');
require('./data');
require('./directives');
require('./filters');
require('./init');
require('./providers');
require('./services');

