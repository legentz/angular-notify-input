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
      value: 0
    }
  }

  // Used by Res
  $scope.reactOptions = {
    whatToDo: function () {
      $scope.val.c.value = $scope.val.a.value + $scope.val.b.value
    },
    toWhom: [
      $scope.val.a.name,
      $scope.val.b.name
    ],
    doNotReact: false
  }

  $scope.reactOptions2 = {
    whatToDo: function () {},
    toWhom: [],
    doNotReact: true
  }

  // Used by Res2
  $scope.reactOptions3 = {
    whatToDo: function () {
      $scope.val.d.value = $scope.val.c.value + $scope.val.a.value
    },
    toWhom: [
      $scope.val.a.name,
      $scope.val.c.name
    ],
    doNotReact: false
  }
})

app.directive('notifier', function ($timeout) {
  function link ($scope, element, $attrs) {
    var reactTo = $scope.reactTo
    var toWhom = reactTo ? reactTo.toWhom : []
    var whatToDo = reactTo ? reactTo.whatToDo : []
    var elementName = $scope.elementName

    element.bind('change', function () {
      $scope.$parent.$broadcast(elementName)
    })

    if (toWhom && toWhom.length > 0) {
      angular.forEach(toWhom, function (v, k) {
        $scope.$on(v, function (event, data) {
          if (reactTo.doNotReact) {
            return
          }

          // To avoid $apply, use $timeout
          $timeout(function () {
            reactTo.whatToDo()
            $scope.$parent.$broadcast(elementName)
          })
        })
      })
    }
  }

  return {
    restrict: 'A',
    scope: {
      reactTo: '=',
      elementName: '=',
      reactOptions: '='
    },
    link: link
  }
})
