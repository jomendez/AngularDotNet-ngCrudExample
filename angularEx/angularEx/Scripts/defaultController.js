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

        Website: {
            link: {
                text:["Name", "true", "string"],
                url: ["Site", "true", "string"]
            }
        },

        Description : ["Description", "true", "text"]
    }

    //data for the crud
    var data = {
        ngCrud: "firstCrudIdentifier",
        servicesContract: servicesContract,
        dataContract: dataContract,
        panelTitle: "",
        options: {}
    }

    //configCrudService.setContracts(data);


    //options for the droppable directive
    var dragAndDropOptions = {
        crudKey: {
            data: data,
            tag: "div",
            attr: {
                "ng-crud": "firstCrudIdentifier"
            },
            cleanerSelectorID:"cleanContent1",
            onDropCallback: function () {
                console.log("ng-crud drop callback called");
            }
        },

        customDir: {
            data: data,
            tag: "delete-Icon",
            cleanerSelectorID: "cleanContent1",
            onDropCallback: function () {
                console.log("delete-Icon drop callback called");
            }
        }

    }


    $scope.dropOptions = {
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)"
    }

    $scope.options = dragAndDropOptions;
});