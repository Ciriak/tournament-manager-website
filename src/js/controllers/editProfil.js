app.controller('editProfilCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{

  if(!$rootScope.me){
    $state.go('login');
    return;
  }
  $scope.profil = {
    processing : false,
    buttonLabel : "Sauvegarder les modifications",
    error : false,
    success : false
  };

}]);
