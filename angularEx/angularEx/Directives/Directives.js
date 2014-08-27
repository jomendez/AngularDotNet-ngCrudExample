angular.module('project').

    directive('editIcon', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<a ng-href="#/edit/{{project.Id}}"><i class="icon-pencil"></i></a>'
    };
    }).

  directive('newIcon', function () {
      return {
          restrict: 'E',
          replace: true,
          template: '<a href="#/new"><i class="icon-plus-sign" ></i></a>'
      };
  }).

  directive('deleteIcon', function (utilsMethods) {
      return {
          restrict: 'E',
          scope: true,
          link: function (scope, element, attrs, controller) {
              scope.deleteItem = function (id, _scope) { return utilsMethods.deleteItem(id, _scope); }
          },
          template: '<a href ng-click="deleteItem(project.Id, this)"  ><i class="icon-remove"></i></a>'
      };
  });