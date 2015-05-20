"use strict";

var DiceRoll = angular.module('DiceRoll', ['ngRoute', 'ngMaterial', 'ngMessages','ngAnimate'])

DiceRoll.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
});

// Define routes
DiceRoll.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/choosedice.html'
    })
    .when('/blue', {
      templateUrl: '/views/bluedice.html'
    })
    .when('/orange', {
      templateUrl: '/views/orangedice.html'
    })
    .when('/red', {
      templateUrl: '/views/reddice.html'
    })
    .when('/darknumber', {
      templateUrl: '/views/darknumberdice.html'
    })
    .when('/dark', {
      templateUrl: '/views/darkdice.html'
    })
    .when('/dark2', {
      templateUrl: '/views/darkdice2.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

// New shake
var myShakeEvent = new Shake({
  threshold: 5,
  timeout: 10
});

// start listening to device motion
myShakeEvent.start();

// register a shake event on directive
DiceRoll.directive('shakeIt', function($window) {
  var timer;
  return {
    link: function(scope) {
      angular.element($window).on('shake', function(e) {
        scope.$broadcast('shakeIt::shaking');
        // Create a shaked event
        clearInterval(timer);
        timer = setInterval(function() {
          scope.$broadcast('shakeIt::shaked');
          clearInterval(timer);
        }, 500);
      });
    }
  };
});



DiceRoll.directive('myRandomshow', function() {
  //Seed for Math.seedrandom
  Math.seedrandom();
  var enthropygen = Math.random();
  // Show a random tag from child tags
  function randomIntFromInterval(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return {
    link: function(scope, element) {
      // Ensure everything is initialy hidden
      element.children().attr('hide', 'true');
      //Show Shake Icon
      element.children().eq('0').removeAttr('hide');
      scope.$on('shakeIt::shaking', function() {
        enthropygen++;

        // For test :
        // console.log(enthropygen);

        // Show only circle while shaking
        element.children().attr('hide', 'true');
        element.children().eq('1').removeAttr('hide');
      });
      scope.$on('shakeIt::shaked', function() {
        // Show result
        element.children().attr('hide', 'true');
        Math.seedrandom(enthropygen, {
          entropy: true
        });
        element.children().eq(randomIntFromInterval(2, element.children().length - 1)).removeAttr('hide');

        // For test :
        // alert(enthropygen);

      });
    }
  };
});


DiceRoll.controller("DiceRollCtrl", function($scope, $interval) {
  // store the interval promise in this variable
  var promise;
  // starts the interval
  $scope.startroll = function() {
    // stops any running interval to avoid two intervals running at the same time
    $scope.stoproll();
    // store the interval promise
    promise = $interval(DesktopRolling, 10);
  };
  // stops the interval
  $scope.stoproll = function() {
    $interval.cancel(promise);
  };
  // stops the interval when the scope is destroyed
  $scope.$on('$destroy', function() {
    $scope.stoproll();
  });
  //Rolling Function Desktop Fallback
  var DesktopRolling = function() {
    $scope.$broadcast('shakeIt::shaking');
  };

});