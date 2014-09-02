angular.module('ngCrud')

.controller('mainController', function ($scope, crudService) {
        $scope.templateName = "Partials/list.html";

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
    })

.controller('EditOrCreateCtrl', function ($scope, crudService, ajaxLoadingService) {

    $scope.getKeyFromObj = function (obj) {
        if (!obj)
            return null;

        var key = _.keys(obj)[0];
        return key;
    }

    $scope.getValFromObj = function (obj) {
        if (!obj)
            return null;

        var val = _.values(obj)[0];
        return val;
    }

    if ($scope.id) {//edit mode
        var personId = $scope.id;

        ajaxLoadingService.showLoadingImg();
        crudService.getItem(personId).then(function (response) {
            $scope.project = crudService.formatResponseToDataContract(response);
            ajaxLoadingService.hideLoadingImg();
        });

        $scope.save = function () {
            ajaxLoadingService.showLoadingImg();
            crudService.modifyItem(crudService.formatFromDataContractToObj($scope.project)).then(function (data) {
                ajaxLoadingService.hideLoadingImg();
                $scope.goHome();
            });
        };
    } else {//insert new mode
        var dataContract = crudService.getDataContract();
        var responseEmptyEstructure = crudService.parseDataContractToEmptyEsqueleton(dataContract);
        $scope.project = crudService.formatResponseToDataContract(responseEmptyEstructure);

        $scope.save = function () {
            ajaxLoadingService.showLoadingImg();
            crudService.saveItem(crudService.formatFromDataContractToObj($scope.project)).then(function (data) {
                ajaxLoadingService.hideLoadingImg();
                $scope.goHome();
            });
        };
    }


})

.controller('ListCtrl', ['$scope', 'crudService', 'ajaxLoadingService', function ($scope, crudService, ajaxLoadingService) {
    var dataContract = crudService.getDataContract();
    $scope.keyColumns = crudService.getDataContractKeys();
    $scope.valuesColumns = crudService.getDataContractValues();

    $scope.dataContract = dataContract;
    
    ajaxLoadingService.showLoadingImg();
    crudService.refreshView().then(function (response) {
            $scope.projects = response;
            ajaxLoadingService.hideLoadingImg();
        });
       
    }]);