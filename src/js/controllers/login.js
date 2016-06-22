app.controller('loginCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.login = {
    processing : false,
    buttonLabel : "Connexion",
    error : false
  };

  $scope.signup = {
    processing : false,
    buttonLabel : "Créer mon compte",
    error : false
  }

  $scope.signup.send = function(){
    var oldLabel = this.buttonLabel;
    this.processing = true;
    this.buttonLabel = "Patientez...";
  };

  $scope.login.send = function(){
    var oldLabel = this.buttonLabel;
    this.processing = true;
    this.buttonLabel = "Patientez...";
    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/login_check',
      data : $scope.login
    }).then(function successCallback(r) {
      $state.go('main');
      location.reload();
    }, function errorCallback(r) {
      $scope.login.error = "Echec de la connexion";
      $scope.login.processing = false;
      $scope.login.buttonLabel = oldLabel;
    });
  };


  $scope.signup.send = function(){
    var oldLabel = this.buttonLabel;
    this.processing = true;
    this.buttonLabel = "Patientez...";
    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/signup_check',
      data : $scope.signup
    }).then(function successCallback(r) {
      $state.go('main');
      location.reload();
    }, function errorCallback(r) {
      $scope.signup.error = "Echec de l'inscription";
      $scope.signup.processing = false;
      $scope.signup.buttonLabel = oldLabel;
    });
  };

}]);
