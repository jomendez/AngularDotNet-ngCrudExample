angular.module('default', ['ngRoute', 'project']).

controller("mainWraperController", function ($scope, crudServiceApi) {
    var servicesContract = {
        getAllItems: crudServiceApi.getAllItems,
        getItem: crudServiceApi.getItem,
        saveItem: crudServiceApi.saveItem,
        modifyItem: crudServiceApi.modifyItem,
        deleteItem: crudServiceApi.deleteItem
    };

    var dataContract = {
        Project: {
            link: {
                text: "Name",
                url: "Site"
            }
        },
        Description : "Description"
    }

    $scope.servContract = servicesContract;
    $scope.dataContract = dataContract;
});