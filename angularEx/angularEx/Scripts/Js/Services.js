angular.module('project').

    service("callApiService", function ($http, $q, $location) {
        var data = {
            id: 0
        }

        this.getAllTodoItems = function () {
            var dfr = $q.defer();
            $http.get("api/data/getAllTodoItems").success(function (response) {
                dfr.resolve(response);
            });

            return dfr.promise;
        };

        this.getTodoItem = function (id) {
            data.id = id;
            var dfr = $q.defer();
            $http.post("api/data/getTodoItem", data).success(function (response) {
                dfr.resolve(response);
            });

            return dfr.promise;
        };

        this.saveTodoItem = function (dataTodoData) {
            var dfr = $q.defer();
            $http.post("api/data/modifyOrsaveTodoItem", dataTodoData).success(function (response) {
                dfr.resolve(response);
            });

            return dfr.promise;
        };

        this.deleteTodoItem = function (id) {
            data.id = id;
            var dfr = $q.defer();
            $http.post("api/data/deleteTodoItem", data).success(function (response) {
                dfr.resolve(response);
            });

            return dfr.promise;
        };

        this.refreshView = function () {
           return this.getAllTodoItems();
        }

    }).

    service("utilsMethods", function ($location, callApiService) {

        this.deleteItem = function (id, scope) {
            var idOfItemToDelete = id ? id : personId;
            callApiService.deleteTodoItem(idOfItemToDelete).then(function (data) {
                if (data) {
                    scope.projects.splice(_.indexOf(scope.projects, _.find(scope.projects, function (item) { return item.Id === idOfItemToDelete; })), 1);
                } else {
                    //todo: showMessage("No item was deleted")
                }

            });
        }

    });