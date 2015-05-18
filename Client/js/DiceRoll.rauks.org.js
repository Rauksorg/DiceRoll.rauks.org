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
  var enthropygen=0;
  // Show a random tag from child tags
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return {
    link: function(scope, element) {
      // initialy hide everything
      element.children().attr("hide", "true");
      //Show Shaking Icon
      element.children().eq("0").removeAttr("hide");
      scope.$on('shakeIt::shaking', function() {
        enthropygen++;
        // Hide everything while shaking
        element.children().attr("hide", "true");
        // Show circle while shaking
        element.children().eq("1").removeAttr("hide");
      });
      scope.$on('shakeIt::shaked', function() {
        // Show result
        element.children().attr("hide", "true");
        Math.seedrandom(enthropygen, { entropy: true });
        element.children().eq(randomIntFromInterval(2, element.children().length - 1)).removeAttr("hide");
      });
    }
  };
});