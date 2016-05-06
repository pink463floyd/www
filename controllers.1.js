var aBaseballServices = angular.module('ABaseball', []);

function emailRouteConfig($routeProvider) {
  $routeProvider.
    when('/', {
      controller: MainController,
      templateUrl: 'main.html'
    }).
    when('/compare', {
      controller: ListController,
      templateUrl: 'compare.html'
    }).
    when('/nwest', {
      controller: ListController,
      templateUrl: 'nwest.html'
    }).
    when('/ncentral', {
      controller: ListController,
      templateUrl: 'ncentral.html'
    }).
    when('/neast', {
      controller: ListController,
      templateUrl: 'neast.html'
    }).
    when('/awest', {
      controller: ListController,
      templateUrl: 'awest.html'
    }).
    when('/acentral', {
      controller: ListController,
      templateUrl: 'acentral.html'
    }).
    when('/aeast', {
      controller: ListController,
      templateUrl: 'aeast.html'
    }).
    when('/al', {
      controller: ListController,
      templateUrl: 'al.html'
    }).
    when('/nl', {
      controller: ListController,
      templateUrl: 'nl.html'
    }).
    otherwise({
      redirectTo: '/'
    });
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function prettyDate(outYear, outMonth, outDay)
{
   if (outMonth <= 9) {
      outMonth = "0{0}".format(outMonth);
   }

   if (outDay <= 9) {
      outDay = "0{0}".format(outDay);
   }
   return "{0}-{1}-{2}".format(outYear, outMonth, outDay);
}

function changeDate(scopeDate, direction) {
      var inputDate = scopeDate.text;

      //2014-01-01
      //0123456789
      //     ^
      if (inputDate.charAt(5) == '0') {
         inputDate = inputDate.slice(0,5) + inputDate.slice(6);
      }

      //2014-1-01
      //0123456789
      //       ^
      if (inputDate.charAt(7) == '0') {
         inputDate = inputDate.slice(0,7) + inputDate.slice(8);
      }

      var myDate = new Date(inputDate);

      if (direction == '+') {
         myDate.setDate(myDate.getDate() + 1);
      } else {
         myDate.setDate(myDate.getDate() - 1);
      }
      scopeDate.text = prettyDate(myDate.getFullYear(), myDate.getMonth()+1, myDate.getDate());
}

function ListController($scope, Items) {
   $scope.setStartDate = function() {
      $scope.date.text = "2016-04-04";
   };
   $scope.subDate = function(scopeDate) {
      changeDate(scopeDate, "-");
   };
   $scope.addDate = function(scopeDate) {
      changeDate(scopeDate, "+");
   };
   $scope.setTodayDate = function(scopeDate) {
      var myDate = new Date();
      scopeDate.text = prettyDate(myDate.getFullYear(), myDate.getMonth()+1, myDate.getDate());
   };

   $scope.setYesterdayDate = function(scopeDate) {
     $scope.setTodayDate(scopeDate);
     $scope.subDate(scopeDate);
   }

   //Hard coding dates to 2014-04-01 works better when season not in progress
   //Otherwise, yesterday's date may be dec 25, and there are no games in Dec!
   $scope.date = { text: '2016-04-04' };
   $scope.dateA = { text: '2016-04-04' };
   $scope.dateB = { text: '2016-04-04' };

   $scope.leagueA = { text: 'NL' };
   $scope.leagueB = { text: 'NL' };
   $scope.divA = { text: 'West' };
   $scope.divB = { text: 'West' };
   //$scope.setYesterdayDate($scope.date);
   //$scope.setYesterdayDate($scope.dateA);
   //$scope.setYesterdayDate($scope.dateB);
   $scope.items = Items.query();
};

function MainController($scope, $routeParams) {
}

// Set up our route so the ABaseball service can find it
aBaseballServices.config(emailRouteConfig);
aBaseballServices.factory('Items', function() {
  var items = {};
  items.query = function() {
    return [
