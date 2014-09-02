angular.module('ngCrud')

.controller('dropController', function ($scope) {
    $scope.dropTmpl = "";

    $scope.showNgCrud = function () {
        $scope.dropTmpl = "Partials/main.html";
    };

});