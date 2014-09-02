angular.module('default', ['ngRoute', 'ngCrud']).

controller("mainWraperController", function ($scope, crudServiceApi) {
    var servicesContract = {
        getAllItems: crudServiceApi.getAllItems,
        getItem: crudServiceApi.getItem,
        saveItem: crudServiceApi.saveItem,
        modifyItem: crudServiceApi.modifyItem,
        deleteItem: crudServiceApi.deleteItem
    };

    var dataContract = {
        Id: ["Id", "false", "int"],

        text: ["Name", "false", "string"],
        url: ["Site", "false", "string"],

        Website: {
            link: {
                text:["Name", "true", "string"],
                url: ["Site", "true", "string"]
            }
        },

        Description : ["Description", "true", "text"]
    }

    $scope.servContract = servicesContract;
    $scope.dataContract = dataContract;
});