angular.module("default", ["ngCrud"]).

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

    var data = {
        ngCrud: "firstCrudIdentifier",
        servicesContract: servicesContract,
        dataContract: dataContract,
        panelTitle: "My Crud",
        options: {}
    }

    configCrudService.setContracts(data);


    //options for the droppable directive
    var dragAndDropOptions = {
        crudKey: {
            data: data,
            tag: "div",
            attr: {
                "ng-crud": "firstCrudIdentifier"
            },
            onDropCallback: function () {
                console.log("callback alled");
            },
        }

    }


  

    $scope.options = dragAndDropOptions;
});