'use strict';

var mainAppModuleName = 'Main';
var mainAppModule = angular.module(mainAppModuleName, ['hello']);

angular.element(document).ready(function(){
    angular.bootstrap(document.querySelector('#mainApp'), [mainAppModuleName], {
      strictDi: true

    });
});

mainAppModule.controller('NameController', ['$scope', '$http', function($scope, $http) {
  $scope.yourName = 'No Name';
  var user_json = $http.get('/user');
}]);

mainAppModule.filter('sayhello', function() {
    return function(name) {
      return 'Hello, ' + name;
  };
});
