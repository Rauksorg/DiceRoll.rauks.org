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
        scope.$broadcast('shakeIt::shake');
      angular.element($window).on('shake', function(e) {
        
        scope.$broadcast('shakeIt::shake');
      });
    }
  };
});


DiceRoll.directive('myDirective', function() {
    function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
  return {
    link: function(scope, element) {
        element.children().hide();
      scope.$on('shakeIt::shake', function() {
          element.children().hide();
          element.children().eq(randomIntFromInterval(0,element.children().length)-1).show();

      });
    }
  };
});

// window.onload = function() {
//     var timer;


//     //create a new instance of shake.js.
//     var myShakeEvent = new Shake({
//         threshold: 5,
//         timeout: 10
//     });
//     // start listening to device motion
//     myShakeEvent.start();
//     // register a shake event
//     window.addEventListener('shake', shakeEventDidOccur, false);
//     //shake event callback
//     function shakeEventDidOccur() {
//         clearInterval(timer);
//         timer = setInterval(function() {
//             result = 2;
//             alert('Shake!');
//             clearInterval(timer);
//         }, 500);




//         //put your own code here etc.

//     }
// };
