angular.module('ngCrud').

    directive('ddListItems', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'Partials/ddListItems.html'
        };
    }).

    directive('ddDropListItems', function () {
        return {
            restrict: 'E',
            replace: true,
            controllers: true,
            scope: true,
            link: function (scope, element, attrs, controllers) {

                $(function () {
                    $("#catalog li").draggable({
                        appendTo: "body",
                        helper: "clone"
                    });
                    $("#cart ol").droppable({
                        activeClass: "ui-state-default",
                        hoverClass: "ui-state-hover",
                        accept: ":not(.ui-sortable-helper)",
                        drop: function (event, ui) {
                            $(this).find(".placeholder").remove();
                            //$("<li></li>").html($(".dragDiv").html()).appendTo(this);
                            scope.$apply(attrs.enter);
                            $(this).find(".dragDiv").show();
                        }
                    }).sortable({
                        items: "li:not(.placeholder)",
                        sort: function () {
                            $(this).removeClass("ui-state-default");
                        }
                    });
                });

            },
            templateUrl: 'Partials/ddDropListItems.html'
        };
    });

 