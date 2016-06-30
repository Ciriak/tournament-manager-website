app.controller('indexCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $http({
    method: 'GET',
    url: $rootScope.apiAddress+'/tournaments/currents/all?access_token=' + $rootScope.access_token
  }).then(function successCallback(rc) {
    $scope.tournaments.current = r.data;
  }, function errorCallback(rc) {
      console.log("Unable to retreive current tournaments");
  });
}]);
