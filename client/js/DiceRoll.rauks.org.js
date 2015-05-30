"use strict";

var DiceRoll = angular.module('DiceRoll', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate'])

DiceRoll.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);

// Define routes
DiceRoll.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/choosedice.html'
    })
    .when('/blue', {
      templateUrl: '/views/singledice.html',
      controller: 'Bluedicectrl'
    })
    .when('/orange', {
      templateUrl: '/views/singledice.html',
      controller: 'Orangedicectrl'
    })
    .when('/red', {
      templateUrl: '/views/singledice.html',
      controller: 'Reddicectrl'
    })
    .when('/darknumber', {
      templateUrl: '/views/darknumberdice.html'
    })
    .when('/dark', {
      templateUrl: '/views/singledice.html',
      controller: 'Darkdicectrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// Store all dice datas in a factory
DiceRoll.factory("diceData", function() {
  var dicefaces = {
      'efail': {
        'icon': 'dice:efail',
        'alt': 'Epic fail'
      },
      'fail': {
        'icon': 'dice:fail',
        'alt': 'Fail'
      },
      'skill': {
        'icon': 'dice:skill',
        'alt': 'Skill'
      },
      'success': {
        'icon': 'dice:success',
        'alt': 'Success'
      },
      'four': {
        'icon': 'dice:four',
        'alt': 'Four'
      },
      'three': {
        'icon': 'dice:three',
        'alt': 'Three'
      },
      'two': {
        'icon': 'dice:two',
        'alt': 'Two'
      },
      'dsuccess': {
        'icon': 'dice:dsuccess',
        'alt': 'Double success'
      }
    },
    dices = {
      'bluedice': [dicefaces.efail, dicefaces.skill, dicefaces.success, dicefaces.four, dicefaces.three, dicefaces.two],
      'orangedice': [dicefaces.efail, dicefaces.skill, dicefaces.success, dicefaces.four, dicefaces.three, dicefaces.fail],
      'reddice': [dicefaces.efail, dicefaces.skill, dicefaces.success, dicefaces.four, dicefaces.fail, dicefaces.fail],
      'darkdice': [dicefaces.success, dicefaces.success, dicefaces.dsuccess]
    };
  var factory = {};
  factory.getdice = function(dicename) {
    return dices[dicename];
  };
  factory.sharedice = {};
  return factory;
});
  // New shake
  var myShakeEvent = new Shake({
    threshold: 5,
    timeout: 10
  });

  // start listening to device motion
  myShakeEvent.start();

// register a shake event on directive
DiceRoll.directive('shakeIt', ['$window', function($window) {

  var timer;
  return {
    link: function(scope) {
      angular.element($window).on('shake', function(e) {
        // Create a shaked event
        scope.$broadcast('shakeIt::shaking');
        clearInterval(timer);
        timer = setInterval(function() {
          scope.$broadcast('shakeIt::shaked');
          clearInterval(timer);
        }, 500);
      });
    }
  };
}]);

DiceRoll.controller("DiceRollCtrl", ['$scope', '$interval', 'diceData', function($scope, $interval, diceData) {
  // Desktop Mouse down fallback
  $scope.desktopmdown = function() {
    // prevent from execution on mobile (display bug)
    if (!isMobile.any) {
      $scope.startroll();
    }
  };
  // Desktop Mouse up fallback
  $scope.desktopmup = function() {
    // prevent from execution on mobile (display bug)
    if (!isMobile.any) {
      $scope.stoproll();
      $scope.$broadcast('shakeIt::shaked');
    }
  };
  // store the interval promise
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
  //Rolling Function Desktop Fallback
  var DesktopRolling = function() {
    $scope.$broadcast('shakeIt::shaking');
  };

  var enthropygen = 0;
  $scope.$on('shakeIt::shaking', function() {
    $scope.dicefaceicon = '';
    $scope.dicefacealt = '';
    $scope.dicefaceclass = '';
    enthropygen++;
  });
  $scope.$on('$destroy', function() {
    $scope.stoproll();
  });
  $scope.restart = function() {
    $scope.dicefaceicon = 'icon:shake';
    $scope.dicefacealt = 'Shake';
    $scope.dicefaceclass = 'shakeicon';
    $scope.stoproll();
  };
  $scope.$on('shakeIt::shaked', function() {
    Math.seedrandom(enthropygen, {
      entropy: true
    });
    var rdmnumber = Math.floor(Math.random() * (diceData.sharedice.length - 1 - 0 + 1) + 0);
    $scope.dicefaceclass = 'diceicon';
    $scope.dicefaceicon = diceData.sharedice[rdmnumber].icon;
    $scope.dicefacealt = diceData.sharedice[rdmnumber].alt;
  });
}]);

DiceRoll.controller('Bluedicectrl', ['$scope', 'diceData', '$rootScope', function($scope, diceData, $rootScope) {
  var selectDice = 'bluedice';
  $scope.dicecolor = selectDice;
  diceData.sharedice = diceData.getdice(selectDice);
  $scope.restart();
}]);

DiceRoll.controller('Orangedicectrl', ['$scope', 'diceData', '$rootScope', function($scope, diceData, $rootScope) {
  var selectDice = 'orangedice';
  $scope.dicecolor = selectDice;
  diceData.sharedice = diceData.getdice(selectDice);
  $scope.restart();
}]);

DiceRoll.controller('Reddicectrl', ['$scope', 'diceData', '$rootScope', function($scope, diceData, $rootScope) {
  var selectDice = 'reddice';
  $scope.dicecolor = selectDice;
  diceData.sharedice = diceData.getdice(selectDice);
  $scope.restart();
}]);

DiceRoll.controller('Darkdicectrl', ['$scope', 'diceData', '$rootScope', function($scope, diceData, $rootScope) {
  var selectDice = 'darkdice';
  $scope.dicecolor = selectDice;
  diceData.sharedice = diceData.getdice(selectDice);
  $scope.restart();
}]);

DiceRoll.config(['$mdIconProvider', function($mdIconProvider) {
  // Register icon IDs with sources. Future $mdIcon( <id> ) lookups
  // will load by url and retrieve the data via the $http and $templateCache
  $mdIconProvider
    .icon('3Ddice:blue', '/img/3Dblue.svg', 1000)
    .icon('3Ddice:orange', '/img/3Dorange.svg', 1000)
    .icon('3Ddice:red', '/img/3Dred.svg', 1000)
    .icon('3Ddice:dark', '/img/3Ddark.svg', 1000)
    .icon('icon:shake', '/img/ic_vibration_48px.svg', 48)
    .icon('icon:back', '/img/ic_arrow_back_48px.svg', 48)
    .icon('dice:dsuccess', '/img/dice/dsuccess.svg', 1000)
    .icon('dice:efail', '/img/dice/efail.svg', 1000)
    .icon('dice:fail', '/img/dice/fail.svg', 1000)
    .icon('dice:four', '/img/dice/four.svg', 1000)
    .icon('dice:skill', '/img/dice/skill.svg', 1000)
    .icon('dice:success', '/img/dice/success.svg', 1000)
    .icon('dice:three', '/img/dice/three.svg', 1000)
    .icon('dice:two', '/img/dice/two.svg', 1000);
}]);
DiceRoll.run(['$http', '$templateCache', function($http, $templateCache) {
  var urls = [
    '/img/3Dblue.svg',
    '/img/3Dorange.svg',
    '/img/3Dred.svg',
    '/img/3Ddark.svg',

    '/img/ic_vibration_48px.svg',
    '/img/ic_arrow_back_48px.svg',

    '/img/dice/success.svg',
    '/img/dice/efail.svg',
    '/img/dice/fail.svg',
    '/img/dice/four.svg',
    '/img/dice/skill.svg',
    '/img/dice/success.svg',
    '/img/dice/three.svg',
    '/img/dice/two.svg'
  ];
  // Pre-fetch icons sources by URL and cache in the $templateCache...
  // subsequent $http calls will look there first.
  angular.forEach(urls, function(url) {
    $http.get(url, {
      cache: $templateCache
    });
  });
}]);