app.controller('profilListCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{

  $http({
    method: 'GET',
    url: $rootScope.apiAddress+'/accounts?access_token=' + $rootScope.access_token
  }).then(function successCallback(r) {
    $scope.profils = r.data;
    console.log(r.data);
  }, function errorCallback(r) {
      console.log(r);
  });

}]);
