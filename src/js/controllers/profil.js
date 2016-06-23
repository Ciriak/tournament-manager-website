app.controller('profilCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.isMine = false;
  if($rootScope.me){
    if($rootScope.me.id === $state.params.id){
      $scope.isMine = true;
    }
  }

  if($scope.isMine){
    $scope.profil = $scope.me;
  }
  else{
    $http({
      method: 'GET',
      url: $rootScope.apiAddress+'/accounts/'+$state.params.id+'?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      $scope.profil = r.data;
      console.log(r.data);
    }, function errorCallback(r) {
        console.log("This profil does no exist !");
        $state.go('main');
    });
  }

}]);
