app.controller('profilCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.avatarFile;
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

  $scope.comment = {
    processing : false,
    error : false,
    text : null
  }

  $scope.comment.post = function(){
    this.processing = true;
    this.error = false;
    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/comments/'+$state.params.id+'?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      $scope.comment.text = "";
      $scope.comment.processing = false;
    }, function errorCallback(r) {
      $scope.comment.processing = false;
      $scope.comment.error = "Une erreur s'est produite lors du post du commentaire";
    });
  };

  $scope.comment.delete = function(comment){
    if(!$scope.isMine){
      return;
    }

    $http({
      method: 'DELETE',
      url: $rootScope.apiAddress+'/comments/'+comment+'?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      $("#comment-"+comment).fadeOut();
    }, function errorCallback(r) {
      $scope.comment.processing = false;
      $scope.comment.error = "Une erreur s'est produite lors du post du commentaire";
    });

  };

}]);
