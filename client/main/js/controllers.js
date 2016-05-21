'use strict';

var app = angular.module('pixydriveApp');

app.controller('mainCtrl', ['$scope', '$state', function($scope, $state) {

  $('.modal-trigger').leanModal();
  $('.parallax').parallax();
  $('.button-collapse').sideNav();
  $('#loginDrop').webuiPopover({url:'#logRegForm'});

}]);

app.controller('tabCtrl', function() {

  console.log('this');

  this.tab = 1;

  this.setTab = function(tabId) {
    this.tab = tabId;
  };

  this.isSet = function(tabId) {
    return this.tab === tabId;
  };
});

app.controller('authCtrl', ['$scope', '$state', '$auth', '$location', function($scope, $state, $auth, $location) {

  $scope.loginSubmit = () => {
    $auth.authenticate($scope.user)
      .then(() => {
        return $auth.login($scope.user);
      });
  };

  $scope.registerSubmit = () => {
    $auth.signup($scope.newUser)
      .then(res => {
        $auth.setToken(res);
        $location.path('');
      })
      .catch(res => {
        alert(res.data.error);
      });
  };
}]);
