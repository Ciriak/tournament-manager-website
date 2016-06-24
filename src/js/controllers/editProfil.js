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

  //add every $me param to $profil
  for (v in $scope.me) {
    $scope.profil[v] = $scope.me[v];
  }

  $scope.profil.save = function(){
    var oldLabel = this.buttonLabel;
    this.success = false;
    this.error = false;
    this.processing = true;
    this.buttonLabel = "Patientez...";
    $http({
      method: 'PATCH',
      url: $rootScope.apiAddress+'/me?access_token='+$rootScope.access_token,
      data : $scope.profil
    }).then(function successCallback(r) {
      $scope.profil.processing = false;
      $scope.profil.buttonLabel = oldLabel;
      $scope.profil.success = true;
    }, function errorCallback(r) {
      if(r.data.error){
        $scope.profil.error = r.data.error.exception[0].message;
      }
      else{
        $scope.profil.error = "Une erreur s'est produite lors de la sauvegarde !";
      }

      $scope.profil.processing = false;
      $scope.profil.buttonLabel = oldLabel;
    });
  };

  $scope.profil.setFile = function(type){
    $("#profil-"+type).trigger('click');
  };

  $scope.profil.sendFile = function(type){
    console.log("Sending "+type+"...");
    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/me/'+type+'?access_token='+$rootScope.access_token,
      data : $scope.profil
    }).then(function successCallback(r) {
      console.log(r);
      //$scope.profil.image = false;
    }, function errorCallback(r) {
      console.log(r);
    });
  };

}]);
