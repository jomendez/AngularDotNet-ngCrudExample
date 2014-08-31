angular.module('project')

.controller('CreateCtrl', function ($scope, $location, $timeout, crudService) {
    $scope.save = function () {
        crudService.saveItem($scope.project).then(function (data) {
            $location.path('/');
        });
    };
})

.controller('EditCtrl', function ($scope, $location, $routeParams, crudService, deleteItemMethod) {

      var personId = $routeParams.projectId;

      crudService.getItem(personId).then(function (response) {
      $scope.project = response;
      });

      $scope.destroy = deleteItemMethod.deleteItem;

      $scope.save = function () {
          crudService.modifyItem($scope.project).then(function (data) {
              $location.path('/');
          });
      };
})



    .controller('ListCtrl', function ($scope, crudService) {
        crudService.refreshView().then(function (response) {
            $scope.projects = response;
        });
       
    });