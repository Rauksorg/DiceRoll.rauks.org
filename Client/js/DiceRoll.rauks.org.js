"use strict";

var DiceRoll = angular.module('DiceRoll', ['ngMaterial', 'ngMessages']);

// New shake
var myShakeEvent = new Shake({
  threshold: 5,
  timeout: 10
});

// start listening to device motion
myShakeEvent.start();

// register a shake event
DiceRoll.directive('shakeIt', function($window) {
  var timer;
  return {
    link: function(scope) {
      //to test
      // scope.$broadcast('shakeIt::shake');
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

DiceRoll.directive('myDirective', function() {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return {
    link: function(scope, element) {
      element.children().attr("hide", "true");
      scope.$on('shakeIt::shaking', function() {
        element.children().attr("hide", "true");
      });
      
      scope.$on('shakeIt::shaked', function() {
        element.children().attr("hide", "true");
        element.children().eq(randomIntFromInterval(0, element.children().length) - 1).removeAttr("hide");

      });
    }
  };
});