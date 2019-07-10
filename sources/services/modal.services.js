//  Service for showing modal dialogs.

/***** JSLint Config *****/
(function (angular, enumerable) {

    'use strict';

    app.factory("modalservice", ['$injector', function ($injector) {

        //  Get the body of the document, we'll add the modal to this.
        var $document = $injector.get('$document');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');
        var $http = $injector.get('$http');
        var $rootScope = $injector.get('$rootScope');
        var $q = $injector.get('$q');
        var $templateCache = $injector.get('$templateCache');
        //var $signalr = $injector.get("signalr-service");
        var body = $document.find('body');

        var modalService = {};
        var displayedModals = [];

        //  Returns a promise which gets the template, either
        //  from the template parameter or via a request to the
        //  template url parameter.
        var getTemplate = function (template, templateUrl) {
            var deferred = $q.defer();
            if (template) {
                deferred.resolve(template);
            } else if (templateUrl) {
                // check to see if the template has already been loaded
                var cachedTemplate = $templateCache.get(templateUrl);
                if (cachedTemplate !== undefined) {
                    deferred.resolve(cachedTemplate);
                }
                    // if not, let's grab the template for the first time
                else {
                    $http({ method: 'GET', url: templateUrl, cache: true })
                        .then(function (result) {
                            // save template into the cache and return the template
                            $templateCache.put(templateUrl, result.data);
                            deferred.resolve(result.data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                }
            } else {
                deferred.reject("No template or templateUrl has been specified.");
            }
            return deferred.promise;
        };

        modalService.showModal = function (options) {

            if (angular.isDefinedAndNotNull(options.inputs)) {
                console.info("ModalService.showModal with id {0}.", [options.inputs.id], false);
            }

            //  Create a deferred we'll resolve when the modal is ready.
            var deferred = $q.defer();

            //  Validate the input parameters.
            var controllerName = options.controller;
            if (!controllerName) {
                deferred.reject("No controller has been specified.");
                return deferred.promise;
            }

            if (angular.isDefinedAndNotNull(options.inputs) && angular.isDefinedAndNotNull(options.inputs.id)) {
                if (enumerable.from(displayedModals).contains(options.inputs.id)) {
                    deferred.reject("Modal already displayed.");
                    return deferred.promise;
                }
            }

            //  If a 'controllerAs' option has been provided, we change the controller
            //  name to use 'as' syntax. $controller will automatically handle this.
            if (options.controllerAs) {
                controllerName = controllerName + " as " + options.controllerAs;
            }

            //  Get the actual html of the template.
            getTemplate(options.template, options.templateUrl)
                .then(function (template) {

                    //  Create a new scope for the modal.
                    var modalScope = $rootScope.$new();
                      
                    //  Create the inputs object to the controller - this will include
                    //  the scope, as well as all inputs provided.
                    //  We will also create a deferred that is resolved with a provided
                    //  close function. The controller can then call 'close(result)'.
                    //  The controller can also provide a delay for closing - this is
                    //  helpful if there are closing animations which must finish first.
                    var closeDeferred = $q.defer();
                     
                    var inputs = {
                        $scope: modalScope,
                        close: function (result, delay) {
                            //Remove the id of the modal from the list of displayed modals
                            if (angular.isDefinedAndNotNull(options.inputs) && angular.isDefinedAndNotNull(options.inputs.id)) {
                                displayedModals.removeValue(options.inputs.id);
                                console.info("ModalService.remove modal from list with id {0}.", [options.inputs.id], false);
                            }

                            if (delay === undefined || delay === null) delay = 0;
                            window.setTimeout(function () {
                                if (angular.isDefinedAndNotNull(closeDeferred)) {
                                    //  Resolve the 'close' promise.
                                    closeDeferred.resolve(result);

                                    //  We can now clean up the scope and remove the element from the DOM.
                                    modalScope.$destroy();
                                    onStateChanged();

                                    // This is to workarround a ui-bootstrap issue (#3633)
                                    // use $modalInstance instead to manage correctly the manual closing of the modal
                                    if (angular.isDefinedAndNotNull(modalElement[0]) &&
                                        angular.isDefinedAndNotNull(modalElement[0].nextElementSibling) &&
                                        modalElement[0].nextElementSibling.className.toString().indexOf("modal-backdrop") !== -1) {
                                        modalElement[0].nextElementSibling.remove();
                                    }

                                    modalElement.remove();

                                    //  Unless we null out all of these objects we seem to suffer
                                    //  from memory leaks, if anyone can explain why then I'd 
                                    //  be very interested to know.
                                    inputs.close = null;
                                    deferred = null;
                                    closeDeferred = null;
                                    modal = null;
                                    inputs = null;
                                    modalElement = null;
                                    modalScope = null;
                                }
                            }, delay);
                        }
                    };
                      
                    //  If we have provided any inputs, pass them to the controller.
                    if (options.inputs) {
                        for (var inputName in options.inputs) {
                            if (options.inputs.hasOwnProperty(inputName)) {
                                inputs[inputName] = options.inputs[inputName];
                            }
                        }
                    }

                    // Map parameters in modal scope.
                    if (options.params) {
                        for (var paramName in options.params) {
                            if (options.params.hasOwnProperty(paramName)) {
                                modalScope[paramName] = options.params[paramName];
                            }
                        }
                    }

                    //  Parse the modal HTML into a DOM element (in template form).
                    var modalElementTemplate = angular.element(template);

                    //  Compile then link the template element, building the actual element.
                    //  Set the $element on the inputs so that it can be injected if required.
                    var linkFn = $compile(modalElementTemplate);
                    var modalElement = linkFn(modalScope);
                    inputs.$element = modalElement;

                    //  Create the controller, explicitly specifying the scope to use.
                    var modalController = $controller(controllerName, inputs);

                    //  Finally, append the modal to the dom.
                    if (options.appendElement) {
                        // append to custom append element
                        options.appendElement.append(modalElement);
                    } else {
                        // append to body when no custom append element is specified
                        $(modalElement).attr("data-backdrop", "static");
                        $(modalElement).attr("data-keyboard", "false");
                        body.append(modalElement);
                    }

                    // Add the id of the modal to the list of displayed modals
                    if (angular.isDefinedAndNotNull(options.inputs) && angular.isDefinedAndNotNull(options.inputs.id)) {
                        displayedModals.push(options.inputs.id);
                    }

                    //  We now have a modal object...
                    var modal = {
                        controller: modalController,
                        scope: modalScope,
                        element: modalElement,
                        close: closeDeferred.promise
                    };

                    if (options.autoCallClose === true) {
                        modalElementTemplate.on('hidden.bs.modal', function () {
                            inputs.close(null, 500);
                        });
                    }
					
					/*
                    var onStateChanged = $signalr.stateChanged(function (newState, oldState) {
                        if (newState === $.signalR.connectionState.connected && oldState !== newState && inputs) {
                            if (angular.isFunction(inputs.close)) {
                                inputs.close(null, 500);
                            }

                            $document[0].body.classList.remove('modal-open');
                            angular.element($document[0].getElementsByClassName('modal-backdrop')).remove();
                            angular.element($document[0].getElementsByClassName('modal')).remove();
                            logger.info("ModalService.Signalr.StateChange : Close current modal " + inputs.title);
                        }
                    });
                    */
                    //  ...which is passed to the caller via the promise.
                    deferred.resolve(modal);

                })
                .then(null, function (error) { // 'catch' doesn't work in IE8.
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        return modalService;
    }]);

}(window.angular, window.Enumerable));
