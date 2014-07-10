'use strict';

CategoryTreeApp.controller('TreeController',
  [          '$scope', '$log', '$modal', 'RecursiveTree', 'IteratedTree',
    function ($scope,   $log,   $modal,   RecursiveTree,   IteratedTree) {
      var tcLog = 'TreeController';
      $log.info(tcLog, 'Tree route invoked');

      $scope.currentBranch = null;

      $scope.recursiveTree = RecursiveTree;
      $scope.iteratedTree = IteratedTree;
      $scope.getMargin = function (branch) {
        return branch.level + 'em';
      };

      $scope.editBranch = function (branch) {
        $scope.branchName = branch;
        var m = $modal.open({
          templateUrl: 'views/modal/EditBranch.html',
          resolve: {
            branchName: function () {
              return branch.name;
            }
          }
        });
        m.result.then(function (branchName) {
          console.log('m.result branchName=', branchName);
        });
      };

    }
  ]);
