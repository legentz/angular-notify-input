var app = angular.module('testApp', [])

app.controller('FormulaController', function ($scope) {
  $scope.input = {
    a1: '', b1: '', c1: '',
    a2: '', b2: '', c2: '',
    a3: '', b3: '', c3: '',
  }
})

app.directive('cell', function ($timeout, $parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      cellName: '@',
      cellObserves: '=',
      cellFormula: '&cellFormula',
      ngModel: '='
    },
    require: 'ngModel',
    link: function ($scope, element, $attrs, ngModelCtrl) {
      var name = $scope.cellName
      var observes = $scope.cellObserves
      var formula = $scope.cellFormula

      element.bind('change', function () {
        $scope.$parent.$broadcast(name + 'Changed')
      })

      if (observes && formula) {
        angular.forEach(observes, function (o) {
          $scope.$on(o + 'Changed', function (event, data) {
            $timeout(function () {
              var result = formula()

              // Update view
              ngModelCtrl.$viewValue = result
              ngModelCtrl.$render()

              // Update model
              ngModelCtrl.$modelValue = result
              $scope.ngModel = result

              $scope.$parent.$broadcast(name + 'Changed')
            })
          })
        })
      }
    }
  }
})
