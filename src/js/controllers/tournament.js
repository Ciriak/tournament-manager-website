app.controller('tournamentCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.isMine = false;
  if($rootScope.me){
    if($rootScope.me.id === $state.params.id){
      $scope.isMine = true;
    }
  }

  $http({
    method: 'GET',
    url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'?access_token=' + $rootScope.access_token
  }).then(function successCallback(r) {
    $scope.tournament = r.data;
    console.log(r.data);
  }, function errorCallback(r) {
      console.log("This tournament does no exist !");
      $state.go('main');
  });

}]);
