app.controller('tournamentCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.tournamentOpt = {
    processing : false,
    buttonLabel : "S'inscrire",
    error : false,
    canSuscribe : false
  };

  $http({
    method: 'GET',
    url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'?access_token=' + $rootScope.access_token
  }).then(function successCallback(r) {
    $scope.tournament = r.data;
    $scope.tournament.players_count = $scope.tournament.accounts.length;

    var i = _.findLastIndex($scope.tournament.accounts, { 'id': $scope.me.id });
    console.log(i);
    if(i >= 0){
      $scope.tournamentOpt.canSuscribe = false;
      $scope.tournament.accounts[i].me = true;
    }
    else{
      if($scope.tournament.state !== "Ouvert"){
        $scope.tournamentOpt.canSuscribe = true;
      }
    }
    console.log(r.data);
  }, function errorCallback(r) {
      console.log("This tournament does no exist !");
      $state.go('main');
  });

  $scope.tournamentOpt.join = function(){
    if(!$scope.tournamentOpt.canSuscribe){
      return;
    }

    var obl = $scope.tournamentOpt.buttonLabel;
    $scope.tournamentOpt.buttonLabel = "Inscription...";
    $scope.tournamentOpt.processing = true;
    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'/registers?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      location.reload();
      console.log(r.data);
    }, function errorCallback(r) {
        $scope.tournamentOpt.processing = false;
        $scope.tournamentOpt.buttonLabel = obl;
        console.log("Unable to register to this tournament");
    });
  }

}]);
