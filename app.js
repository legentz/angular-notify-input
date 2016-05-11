var app = angular.module('testApp', [])

app.controller('TestController', function ($scope) {
  $scope.val = {
    a: {
      name: 'varA',
      value: 2
    },
    b: {
      name: 'varB',
      value: 10
    },
    c: {
      name: 'varC',
      value: 0
    },
    d: {
      name: 'varD',
      value: 34
    },
    e: {
      name: 'varE',
      value: 9
    }
  }

  $scope.reactOptions = {
    whatToDo: function () {
      $scope.val.c.value = $scope.val.a.value + $scope.val.b.value
    },
    toWhom: [
      $scope.val.a.name,
      $scope.val.b.name
    ],
    doNotReact: true
  }

  $scope.notifyChange = function (name) {
    $scope.$broadcast(name, $scope.reactOptions)
  }
})

app.directive('notifier', function () {
  function link ($scope, element, $attrs) {
    var toWhom = $scope.reactTo.toWhom
    var whatToDo = $scope.reactTo.whatToDo

    angular.forEach(toWhom, function (v, k) {
      $scope.$on(v, function (event, data) {
        if (!data.doNotReact) {
          return
        }

        data.whatToDo()
      })
    })
  }

  return {
    restrict: 'A',
    scope: {
      reactTo: '='
    },
    link: link
  }
})
