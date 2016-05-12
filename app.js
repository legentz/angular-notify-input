var app = angular.module('testApp', []);

app.controller('FormulaController', function ($scope) {
    $scope.input = {
        a1: "", b1: "", c1: "", 
        a2: "", b2: "", c2: "", 
        a3: "", b3: "", c3: "", 
    };
});


app.directive('cell', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            cellName:     '@',
            cellObserves: '=',
            cellFormula:  '&cellFormula',
        },
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            var name     = $scope.cellName;
            var observes = $scope.cellObserves;
            var formula  = $scope.cellFormula;

            element.bind('change', function () {
                $scope.$parent.$broadcast(name+"Changed");
            });

            if (observes && formula) {
                angular.forEach(observes, function (o) {
                    $scope.$on(o+"Changed", function (event, data) {
                        $timeout(function () {
                            // qui ci va qualcosa tipo ngModel.$viewModel = formula();
                            console.log(formula());

                            $scope.$parent.$broadcast(name+"Changed");
                        });
                    });
                })
            }
        }
    }
});