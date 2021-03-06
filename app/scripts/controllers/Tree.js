'use strict';

CategoryTreeApp.controller('TreeController',
  [          '$scope', '$log', '$modal', 'RecursiveTree', 'IteratedTree', 'Branch',
    function ($scope,   $log,   $modal,   RecursiveTree,   IteratedTree,   Branch) {
      var tcLog = 'TreeController';
      $log.info(tcLog, 'Tree route invoked');

      $scope.currentBranch = null;

      $scope.recursiveTree = RecursiveTree;
      $scope.iteratedTree = IteratedTree;
      $scope.getMargin = function (branch) {
        return branch.level + 'em';
      };

      $scope.rebuildFlat = function () {
        $scope.recursiveTree.rebuildFlat();
        $scope.iteratedTree.rebuildFlat();
      };

      $scope.editBranch = function (branch) {
        $scope.currentBranch = branch;
        $scope.branchDup = angular.copy(branch);
        var m = $modal.open({
          templateUrl: 'views/modal/EditBranch.html',
          controller: 'ModalController',
          resolve: {
            parent: function () {
              return null;
            },
            branch: function () {
              console.log('resolve');
              return $scope.branchDup;
            }
          }
        });
        m.result.then(function (branchName) {
          console.log('m.result branchName=', branchName);
          $scope.currentBranch.branch.name = branchName;

          $scope.rebuildFlat();
        }, function () {
          console.log('Modal dismissed');
        });
        $scope.rebuildFlat();
      };

      $scope.deleteBranch = function (branch) {
        console.log('deleteBranch', branch);
        var b = branch.branch;
        b.parent.removeChild(b);
        branch.deleted = true;
        $scope.rebuildFlat();
      };

      $scope.addBranch = function (branch) {
        $scope.parent = branch;
        $scope.branch = new Branch('');
        var m = $modal.open({
          templateUrl: 'views/modal/AddBranch.html',
          controller: 'ModalController',
          resolve: {
            parent: function () {
              console.log('resolve parent', $scope.parent);
              return $scope.parent;
            },
            branch: function () {
              console.log('resolve branch', $scope.branch);
              return $scope.branch;
            }
          }
        });
        m.result.then(function (branchName) {
          console.log('m.result branchName=', branchName);
          var b = new Branch(branchName);
          var p = $scope.parent;
          p.branch.addChild(b);
          $scope.rebuildFlat();
          console.log('addBranch parent=', p);
        }, function () {
          console.log('Modal dismissed');
        });
      };
      $scope.rebuildFlat();
    }
  ]);
