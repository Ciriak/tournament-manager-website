app.controller('tournamentCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  $scope.tournamentOpt = {
    processing : false,
    buttonLabel : "S'inscrire",
    error : false,
    canSuscribe : false,
    isAdmin : false,
    canGenerate : false
  };

  $("#bracket").html(''); //empty the leaderboard

  $http({
    method: 'GET',
    url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'?access_token=' + $rootScope.access_token
  }).then(function successCallback(r) {
    $scope.tournament = r.data;
    $scope.tournament.players_count = $scope.tournament.accounts.length;

    var i = _.findLastIndex($scope.tournament.accounts, { 'id': $scope.me.id });

    //check if current user is the admin
    if($scope.tournament.account.id === $scope.me.id){
      $scope.tournamentOpt.isAdmin = true;
      //the tournament is full and can be generated
      if($scope.tournament.players_count === $scope.tournament.max_players){
        $scope.tournamentOpt.canGenerate = true;
      }
    }

    //check if the user is already in the tournament
    if(i >= 0){
      $scope.tournamentOpt.canSuscribe = false;
      $scope.tournament.accounts[i].me = true;
    }
    else{
      if($scope.tournament.state === "Ouvert"){
        $scope.tournamentOpt.canSuscribe = true;
      }
    }

    //retreive the tournament battle list
    $http({
      method: 'GET',
      url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'/battles?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      $scope.tournament.battles = r.data;
      console.log("Battles :");
      console.log(r.data);
      generateBracket($scope.tournament);
    });

    console.log($scope.tournament);

  }, function errorCallback(r) {
      console.log("This tournament does no exist !");
      $state.go('main');
  });


  //join the tournament
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

  //join the tournament
  $scope.tournamentOpt.generate = function(){
    if(!$scope.tournamentOpt.canGenerate){
      return;
    }

    $http({
      method: 'POST',
      url: $rootScope.apiAddress+'/tournaments/'+$state.params.id+'/validates?access_token=' + $rootScope.access_token
    }).then(function successCallback(r) {
      location.reload();
    }, function errorCallback(r) {
        console.log("Unable to generate this tournament");
    });
  }

  function generateBracket(tournament){
    console.log(tournament);
      var data = {
          teams : [],
          results : [
            [[1,2], [3,4]],       /* first round */
            [[4,6], [2,1]]        /* second round */
          ]
        }

        for (var i = 0; i < tournament.battles.length; i++) {

          //add player to list only for round one, the plugin will do the rest
          if(tournament.battles[i].round === 1){
            var t = [tournament.battles[i].player_one.nickname,tournament.battles[i].player_two.nickname];
            data.teams.push(t);
          }
        }

          $(function() {
            $('#bracket').bracket({init: data});
          });
        }

}]);
