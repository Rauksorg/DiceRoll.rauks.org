"use strict";

var DiceRoll = angular.module('DiceRoll', ['ngMaterial', 'ngMessages']);

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
      //to test
      // scope.$broadcast('shakeIt::shaked');
      // scope.$broadcast('shakeIt::shaking');
      // 
      angular.element($window).on('shake', function(e) {
        scope.$broadcast('shakeIt::shaking');

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
  // Show a random tag from child tags
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return {
    link: function(scope, element) {
      // initialy hide everything
      element.children().attr("hide", "true");
      element.children().eq("0").removeAttr("hide");

      scope.$on('shakeIt::shaking', function() {
        // Hide everything while shaking
        element.children().attr("hide", "true");
        // Show dot while shaking
        element.children().eq("1").removeAttr("hide");
      });

      scope.$on('shakeIt::shaked', function() {
        // Show result
        element.children().attr("hide", "true");
        element.children().eq(randomIntFromInterval(2, element.children().length - 1)).removeAttr("hide");
      });
    }
  };
});