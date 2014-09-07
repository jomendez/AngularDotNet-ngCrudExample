angular.module("ngCrud").

    directive("ddDropListItems", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "Partials/ddDropListItems.html"
        };
    }).

    directive("draggableItem", function () {
        return {
            restrict: "A",
            replace: true,
            link: function (scope, element, attrs) {

                $(element).draggable({
                    appendTo: "body",
                    helper: "clone"
                });
            }
            
        };
    }).

    directive("droppableItem", function ($compile, configCrudService) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                options: "=droppableItem"
            },
            link: function (scope, element, attrs) {

                $(element).droppable({
                    activeClass: "ui-state-default",
                    hoverClass: "ui-state-hover",
                    accept: ":not(.ui-sortable-helper)",
                    drop: function (event, ui) {

                        var key = ui.draggable.attr("draggable-item");
                        var options = scope.options[key];

                        if (typeof options == "undefined")
                            return;

                        if (options.data)
                            configCrudService.setContracts(options.data);

                        if ($) {

                            var htmlBuilder = $("<" + options.tag + "></" + options.tag + ">");

                            if (options.attr)
                                htmlBuilder.attr(options.attr);

                            var html = $("<div></div>").append(htmlBuilder).html();

                            if (element.children().length > 0) {
                                element.children().remove();
                            }

                            element.append($compile(html)(scope));

                            if (typeof options.onDropCallback != "undefined")
                                options.onDropCallback();

                            if (options.cleanerSelectorID) {
                                $("#" + options.cleanerSelectorID).click(function (e) {
                                    e.preventDefault();
                                    var elem = element;
                                    elem.children().remove();
                                    $(this).unbind( "click" );
                                });
                            }

                        }
                    }
                });

            }
        };
    });

 