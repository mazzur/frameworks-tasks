'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$rootScope', 'Phone',
  function($scope, $rootScope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';

    $scope.addToCart = function(phone) {
      $rootScope.$broadcast('add-to-cart', phone);
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Phone',
  function($scope, $rootScope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };

    $scope.addToCart = function(phone) {
      $rootScope.$broadcast('add-to-cart', {
        id: phone.id,
        name: phone.name,
        imageUrl: phone.images[0]
      });
    }
  }]);

phonecatControllers.controller('CartCtrl', ['$scope',
  function($scope) {
    $scope.phones = [];

    $scope.$on('add-to-cart', function(event, phone) {
      if (!$scope.phones.some(function(one) {
            return one.id === phone.id;
          })) {
        $scope.phones.push(phone);
        $scope.number = $scope.phones.length;
      }
    });
  }]);