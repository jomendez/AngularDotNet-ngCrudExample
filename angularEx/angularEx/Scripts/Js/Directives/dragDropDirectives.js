angular.module('ngCrud').

    directive('ddDropListItems', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'Partials/ddDropListItems.html'
        };
    }).

    directive('draggableItem', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {

                $(element).draggable({
                    appendTo: "body",
                    helper: "clone"
                });
            }
            
        };
    }).

    directive('droppableItem', function ($compile, $rootScope) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                options: "=droppableItem"
            },
            link: function (scope, element, attrs) {
                var options = scope.options;

            $(element).droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function (event, ui) {

                    //_.each(options.attr, function (value, index) {
                    //    scope[index] = $compile(value)(scope);
                    //});

                    var htmlBuilder = $("<" + options.tag + "></" + options.tag + ">");
                    htmlBuilder.attr(options.attr);
                    var html = $(htmlBuilder)[0];
                    element.append($compile(html)(scope));

                    options.callback;
                 
                }
            }).sortable({
                items: "li:not(.placeholder)",
                sort: function () {
                    $(this).removeClass("ui-state-default");
                }
            });
     

            }
        };
    });

 