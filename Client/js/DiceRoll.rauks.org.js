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
  return {
    link: function(scope) {
      //to test
      // scope.$broadcast('shakeIt::shake');
      angular.element($window).on('shake', function(e) {

        scope.$broadcast('shakeIt::shake');
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
      scope.$on('shakeIt::shake', function() {
        element.children().attr("hide", "true");
        element.children().eq(randomIntFromInterval(0, element.children().length) - 1).removeAttr("hide");

      });
    }
  };
});


// // register a shake event
// window.addEventListener('shake', shakeEventDidOccur, false);
// //shake event callback
// function shakeEventDidOccur(timer) {
//   clearInterval(timer);
//   timer = setInterval(function() {
//     alert('Shake!');
//     clearInterval(timer);
//   }, 500);
// }
