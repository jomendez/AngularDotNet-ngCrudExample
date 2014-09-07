angular.module("ngCrud")

.controller("mainController", function ($scope, crudService) {
    $scope.templateName = "Partials/list.html";
    $scope.ajaxLoading = "";

        $scope.edit = function (id) {
            $scope.templateName = "Partials/detail.html";
            $scope.id = id;
        };

        $scope.new = function () {
            $scope.templateName = "Partials/detail.html";
            $scope.id = null;
        };

        $scope.goHome = function () {
            $scope.templateName = "Partials/list.html";
        }

        
        $scope.showLoadingImg = function () {
            $scope.ajaxLoading = "Partials/ajaxLoading.html";
        }

        $scope.hideLoadingImg = function () {
            $scope.ajaxLoading = "";
        }
    })

.controller("detailController", function ($scope, crudService, editOrInsertService) {

    $scope.getKeyFromObj = editOrInsertService.getKeyFromObj;

    $scope.getValFromObj = editOrInsertService.getValFromObj;

    if ($scope.id) {//edit mode
        var personId = $scope.id;

        $scope.showLoadingImg();
        crudService.getItem(personId).then(function (response) {
            $scope.crud = crudService.formatResponseToDataContract(response);
            $scope.hideLoadingImg();
        });

        $scope.save = function () {
            $scope.showLoadingImg();
            crudService.modifyItem(crudService.formatFromDataContractToObj($scope.crud)).then(function (data) {
                $scope.hideLoadingImg();
                $scope.goHome();
            });
        };
    } else {//insert new mode
        var dataContract = crudService.getDataContract();
        var responseEmptyEstructure = crudService.parseDataContractToEmptyEsqueleton(dataContract);
        $scope.crud = crudService.formatResponseToDataContract(responseEmptyEstructure);

        $scope.save = function () {
            $scope.showLoadingImg();
            crudService.saveItem(crudService.formatFromDataContractToObj($scope.crud)).then(function (data) {
                $scope.hideLoadingImg();
                $scope.goHome();
            });
        };
    }


})

.controller("listController", ["$scope", "crudService", "ajaxLoadingService", function ($scope, crudService, ajaxLoadingService) {
    var dataContract = crudService.getDataContract();
    $scope.keyColumns = crudService.getDataContractKeys();
    $scope.valuesColumns = crudService.getDataContractValues();

    $scope.dataContract = dataContract;
    
    $scope.showLoadingImg();
    crudService.refreshView().then(function (response) {
            $scope.cruds = response;
            $scope.hideLoadingImg();
        });
       
    }]);