'use strict';

FirstRevenueApp.directive('ctBranch',
  [          '$timeout', '$parse', '$log',
    function ($timeout,   $parse,   $log) {
      var ctbLog = 'ctBranch';

      return {
        restrict: 'A',
        templateUrl: 'views/Branch.html',
        link: function (scope, elm, attrs) {
          scope.branch = $parse(attrs.ctBranch)(scope);

          $log.debug(ctbLog, 'link elm=', elm,
            'attrs.ctBranch=', attrs.ctBranch,
            'scope=', scope, 'branch=', scope.branch);

          scope.$watch(attrs.ctBranch, function (newValue, oldValue, scope) {
            scope.branch = $parse(attrs.ctBranch)(scope);
            $log.debug(frmbLog, '$watch branch=', scope.branch);
          }, true);
        }
      };
    }
  ]
);
