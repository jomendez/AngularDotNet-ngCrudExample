angular.module("ngCrud").

directive("newButton", function () {
      return {
          restrict: "E",
          replace: true,
          template: '<a href ng-click="new()"><i class="label label-primary">Add New</i></a>'
      };
  }).

directive("editIcon", function () {
    return {
        restrict: "E",
        replace: true,
        link: function (scope, element, attrs, controller) {
            $(element).tooltip({ title: "Edit" });
        },
        template: '<a href ng-click="edit(crud.Id)"><i class="glyphicon glyphicon-edit"></i></a>'
    };
    }).

directive("deleteIcon", function (deleteItemService) {
      return {
          restrict: "E",
          replace: true,
          scope: true,
          link: function (scope, element, attrs, controller) {
              scope.deleteItem = function (id, _scope) { return deleteItemService.deleteItem(id, _scope); }
              $(element).tooltip({ title: "Remove" });
          },
          template: '<a href ng-click="deleteItem(crud.Id, this)"><i class="glyphicon glyphicon-remove"></i></a>'
      };
  }).

directive("ngCrud", ["crudService", "configCrudService", function (crudService, configCrudService) {
      return {
          restrict: "A",
          replace: true,
          scope: {
              //servicesContract: "=servicesContract",
              //dataContract: "=datacontract",
              key: "@ngCrud"
          },
          link: function (scope, element, attrs, controllers) {

              var sc = configCrudService.getservicesContract(scope.key);
              var dc = configCrudService.getDataContract(scope.key);
              scope.panelTitle = configCrudService.getPanelTitle(scope.key);

              crudService.servicesContract(sc);
              crudService.setDataContract(dc);
          },
          templateUrl: "../../Partials/main.html"
      };
    }]).

directive("crudTdContentList", ["crudService", function (crudService) {
    return {
        restrict: "E",
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
        }
    };
}]);