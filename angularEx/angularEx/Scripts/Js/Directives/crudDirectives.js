angular.module('ngCrud').

directive('newButton', function () {
      return {
          restrict: 'E',
          replace: true,
          template: '<a href ng-click="new()"><i class="label label-primary">Add New</i></a>'
      };
  }).

directive('editIcon', function () {
    return {
        restrict: 'E',
        replace: true, link: function (scope, element, attrs, controller) {
            $(element).tooltip({ title: "Edit" });
        },
        template: '<a href ng-click="edit(project.Id)"><i class="glyphicon glyphicon-edit"></i></a>'
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
  }).

directive('ngCrud', ['crudService', 'configCrudService', function (crudService, configCrudService) {
      return {
          restrict: 'E',
          replace: true,
          scope: {
              serviceContract: "=servicecontract",
              dataContract: "=datacontract",
              panelTitle: "@paneltitle"
          },
          link: function (scope, element, attrs, controllers) {

              var sc = configCrudService.getServiceContract();
              var dc = configCrudService.getDataContract();

              crudService.serviceContract(sc);
              crudService.setDataContract(dc);
          },
          templateUrl: '../../Partials/main.html'
      };
    }]).

directive("crudTdContentList",['crudService', function (crudService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            dataTd: "=datatd",
            dataTr: "=datatr"
        },
        link: function (scope, element, attrs, controllers) {
            var dataContractValues = crudService.getDataContractValues();

            var td = scope.dataTd;
            var tr = scope.dataTr;

            var isValidDataCantract = !!_.find(dataContractValues, function (item) {
                
                if (item === td) return true;
            });

            if (typeof td[0] == "string" && isValidDataCantract) {
                element.append("" + tr[td[0]] + "");

            } else if (typeof td == "object" && isValidDataCantract && td.link) {//special element link
                       element.append('<a href="' + tr[td.link.url[0]] + '" target="_blank">' + tr[td.link.text[0]] + '</a>');
            }

            //<td><a ng-href="{{project.Site}}" target="_blank">{{project.Name}}</a></td>
            //  <td>{{project.Description}}</td>
        }
    };
}]);