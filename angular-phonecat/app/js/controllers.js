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
        imageUrl: phone.images[0],
        price: phone.price
      });
    }
  }]);

phonecatControllers.controller('CartCtrl', ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {
    $scope.phones = [];

    $scope.$on('add-to-cart', function(event, phone) {
      var phoneInCart = $scope.phones.filter(function(one) {
        return one.id === phone.id;
      });
      if (!phoneInCart.length) {
        phone.quantity = 1;
        $scope.phones.push(phone);
        $scope.number = $scope.phones.length;
      } else {
        $scope.phones.forEach(function(one) {
          if (one.id === phone.id) {
            one.quantity++;
          }
        })
      }
    });

    $scope.removeFromCart = function(id) {
      $scope.phones = $scope.phones.filter(function(phone) {
        return phone.id !== id;
      });
      $scope.number = $scope.phones.length;
    };

    $scope.checkout = function() {
      $rootScope.checkout = $scope.phones;
      $location.path('/checkout');
      $scope.phones = [];
      $scope.number = '';
    }
  }]);

phonecatControllers.controller('CheckoutCtrl', ['$scope', '$rootScope',
  function($scope, $rootScope) {
    $scope.phones = $rootScope.checkout;
    $scope.total = $rootScope.checkout.reduce(function(prev, cur) {
      return prev+ cur.price*cur.quantity;
    }, 0);

  }]);