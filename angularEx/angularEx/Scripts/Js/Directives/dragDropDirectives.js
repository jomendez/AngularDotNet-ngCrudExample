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
            restrict: 'A',//set thiis ta an A
            replace: true,
            link: function (scope, element, attrs) {

                $(element).draggable({
                    appendTo: "body",
                    helper: "clone"
                });
            }
            //,
            //templateUrl: 'Partials/ddListItems.html'
        };
    }).

    directive('droppableItem', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            scope:true,
            link: function (scope, element, attrs) {

            $(element).droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function (event, ui) {
                    //$(this).find(".placeholder").remove();
                    //$("<li></li>").html($(".dragDiv").html()).appendTo(this);
                    element.append($compile('<ng-crud servicecontract="servContract" datacontract="dataContract" paneltitle="My first crud"></ng-crud>')(scope));
                    //$('#showNgCrud').click();
                    //$(this).find(".dragDiv").show();
                }
            }).sortable({
                items: "li:not(.placeholder)",
                sort: function () {
                    $(this).removeClass("ui-state-default");
                }
            });
     

            }
            //,
            //templateUrl: 'Partials/ddDropListItemsInternal.html'
        };
    });

 