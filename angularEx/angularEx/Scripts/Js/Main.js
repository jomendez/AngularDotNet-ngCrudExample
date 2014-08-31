angular.module('project', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          controller: 'ListCtrl',
          templateUrl: 'Partials/list.html'
      })
      .when('/edit/:projectId', {
          controller: 'EditCtrl',
          templateUrl: 'Partials/detail.html'
      })
      .when('/new', {
          controller: 'CreateCtrl',
          templateUrl: 'Partials/detail.html'
      })
      .otherwise({
          redirectTo: '/'
      });
});

