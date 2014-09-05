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

                        configCrudService.setContracts(options.data);
                        var htmlBuilder = $("<" + options.tag + "></" + options.tag + ">");

                        if (options.attr)
                        htmlBuilder.attr(options.attr);

                        var html = $("<div></div>").append(htmlBuilder).html();
                        element.append($compile(html)(scope));

                        if (typeof options.callback != "undefined")
                            options.onDropCallback();

                    }
                });

            //    .sortable({
            //    items: "li:not(.placeholder)",
            //    sort: function () {
            //        $(this).removeClass("ui-state-default");
            //    }
            //});
                
                //element.children().remove()

            }
        };
    });

 