angular.module('project')

.controller('CreateCtrl', function ($scope, $location, $timeout, callApiService) {
    $scope.save = function () {
        callApiService.saveTodoItem($scope.project).then(function (data) {
            $location.path('/');
        });
    };
})

.controller('EditCtrl', function ($scope, $location, $routeParams, callApiService, utilsMethods) {

      var personId = $routeParams.projectId;

      callApiService.getTodoItem(personId).then(function (response) {
         
      $scope.project = response;

      });


      $scope.destroy = utilsMethods.deleteItem;

      $scope.save = function () {
          callApiService.saveTodoItem($scope.project).then(function (data) {
              $location.path('/');
          });
      };
})



    .controller('ListCtrl', function ($scope, callApiService) {
        callApiService.refreshView().then(function (response) {
            $scope.projects = response;
        });
       
    });