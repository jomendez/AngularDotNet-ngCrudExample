angular.module('project').

  directive('newButton', function () {
      return {
          restrict: 'E',
          replace: true,
          template: '<a href="#/new"><i class="label label-primary">Add New</i></a>'
      };
  }).

    directive('editIcon', function () {
    return {
        restrict: 'E',
        replace: true, link: function (scope, element, attrs, controller) {
            $(element).tooltip({ title: "Edit" });
        },
        template: '<a ng-href="#/edit/{{project.Id}}"><i class="glyphicon glyphicon-edit"></i></a>'
    };
    }).


  directive('deleteIcon', function (deleteItemMethod) {
      return {
          restrict: 'E',
          replace: true,
          scope: true,
          link: function (scope, element, attrs, controller) {
              scope.deleteItem = function (id, _scope) { return deleteItemMethod.deleteItem(id, _scope); }
              $(element).tooltip({ title: "Remove" });
          },
          template: '<a href ng-click="deleteItem(project.Id, this)"><i class="glyphicon glyphicon-remove"></i></a>'
      };
  });