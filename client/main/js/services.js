'use strict';

const app = angular.module('pixydriveApp');

app.service('Auth', function($http, $q) {

  this.register = userObj => {
    return $http.post('/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/users/login', userObj)
      .then(res => {
        return this.getProfile(res);
      });
  };

  this.logout = () => {
    return $http.delete('/users/logout')
      .then(res => {
        return $q.resolve(res);
      });
  };

  this.getProfile = () => {
    return $http.delete('/users/profile')
      .then(res => {
        this.currentUser = res.data;
        return $q.resolve(res.data);
      })
      .catch(res => {
        this.currentUser = null;
        return $q.reject(res.data);
      });
  };
});
