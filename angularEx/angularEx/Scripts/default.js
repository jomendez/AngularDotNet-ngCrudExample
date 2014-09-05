angular.module('default', ['ngCrud']).

controller("mainWraperController", function ($scope, crudServiceApi, configCrudService) {

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


    configCrudService.setServiceContract(servicesContract);
    configCrudService.setDataContract(dataContract);


    var options = {};
    options.tag = "ng-crud";
    options.attr = {
        paneltitle: "My first crud"
    }
    options.callback = function () {
        console.log("callback alled");
    };

    $scope.options = options;
});