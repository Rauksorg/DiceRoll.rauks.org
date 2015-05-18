"use strict";

var DiceRoll = angular.module('DiceRoll', ['ngRoute', 'ngMaterial', 'ngMessages'])

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
     .when('/dark', {
      templateUrl: '/views/darkdice.html'
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
      //to test on desktop
      // scope.$broadcast('shakeIt::shaked');
      // scope.$broadcast('shakeIt::shaking');
      // 
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
  var enthropygen = 0;
  // Show a random tag from child tags
  function randomIntFromInterval(min, max) {
    Math.seedrandom(enthropygen, {
      entropy: true
    });
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
        // Show only circle while shaking
        element.children().attr('hide', 'true');
        element.children().eq('1').removeAttr('hide');
      });
      scope.$on('shakeIt::shaked', function() {
        // Show result
        element.children().attr('hide', 'true');
        element.children().eq(randomIntFromInterval(2, element.children().length - 1)).removeAttr('hide');
      });
    }
  };
});