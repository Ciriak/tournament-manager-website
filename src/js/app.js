var app = angular.module('tournament', [
'ui.router',
'ui.bootstrap',
'LocalStorageModule'
    ]);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "views/index.html",
      reload:true
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "views/signup.html",
      controller : "signupCtrl"
    })
    .state('signup.endingSignup', {
      url: "/ending/:token",
      templateUrl: "views/ending_signup.html"
    })
    .state('resetPassword', {
      url: "/reset_password",
      templateUrl: "views/reset_password.html",
      controller : "resetPasswordCtrl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller : "loginCtrl"
    })
    .state('organizations', {
      url: "/organizations",
      templateUrl: "views/organizations/list.html",
      controller : "organizationCtrl"
    })
    .state('users', {
      url: "/users",
      templateUrl: "views/users.html",
      controller : "accountCtrl"
    })
    .state('editProfil', {
      url: "/profile/edit",
      templateUrl: "views/edit_profil.html",
      controller : "accountCtrl"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "views/contact.html",
      controller : "contactCtrl"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "views/projects/list.html",
      controller : "projectCtrl"
    })
    .state('projects.item', {
      url: "/{id:int}",
      templateUrl: "views/projects/project.html",
    })
    .state('projects.item.promise', {
      url: "/{promiseId:int}",
      templateUrl: "views/projects/promise.html",
    })
    .state('newProject', {
      url: "/new_project",
      templateUrl: "views/projects/new.html",
      controller : "projectCtrl"
    })
    /*.state('project', {
      url: "/project",
      templateUrl: "views/projects/project.html",
    })*/
    .state('announcements', {
      url: "/announcements",
      templateUrl: "views/announcements/list.html",
      controller : "announcementCtrl"
    })
    .state('announcements.item', {
      url: "/{id:int}",
      templateUrl: "views/announcements/announcement.html",
    })
    .state('newAnnouncement', {
      url: "/new_announcement",
      templateUrl: "views/announcements/new.html",
      controller : "announcementCtrl"
    })
    .state('search', {
      url: "/search/:query",
      templateUrl: "views/search.html",
      controller : "searchCtrl"
    });
});

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('colab');
});

app.controller('mainCtrl', ['$scope', '$http','$rootScope','$location','$state','localStorageService', function($scope, $http,$rootScope,$location,$state,localStorageService)
{
  var apiAddress = "http://"+$location.host()+":"+$location.port()+"/api";

  $rootScope.apiAddress = apiAddress;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    // called when a state change
  });
  $rootScope.$on('$stateChangeSuccess', function (event) {
    // called when a state has changed
  });

  //initialize Bootstrap components
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

}]);
