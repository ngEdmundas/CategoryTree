'use strict';

CategoryTreeApp.controller('TreeController',
  [          '$scope', '$log', '$materialDialog', '$modal', 'RecursiveTree', 'IteratedTree', 'Branch',
    function ($scope,   $log,   $materialDialog,   $modal,   RecursiveTree,   IteratedTree,   Branch) {
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

      $scope.editBranch = function (branch, event) {
        $scope.currentBranch = branch;
        $scope.branchDup = angular.copy(branch);
        $materialDialog({
          targetEvent: event,
          templateUrl: 'views/modal/EditBranch.html',
          controller: 'EditBranchController',
          hasBackdrop: false,
          clickOutsideToClose: false,
/*          resolve: {
            parent: function () {
              return null;
            },
            branch: function () {
              console.log('resolve');
              return $scope.branchDup;
            }
          }, */
          locals: {
            clickOutsideToClose: true,
            parent: null,
            branch: angular.copy(branch),
            rebuild: $scope.rebuildFlat
          }
        });
      };

      $scope.addBranch = function (branch, event) {
        $scope.parent = branch;
        $scope.branch = new Branch('');
        $materialDialog({
          targetEvent: event,
          templateUrl: 'views/modal/AddBranch.html',
          controller: 'AddBranchController',
          hasBackdrop: false,
          clickOutsideToClose: false,
          locals: {
            clickOutsideToClose: true,
            parent: $scope.parent,
            branch: $scope.branch,
            rebuild: $scope.rebuildFlat
          }
        });
      };

      $scope.deleteBranch = function (branch) {
        console.log('deleteBranch', branch);
        var b = branch.branch;
        b.parent.removeChild(b);
        branch.deleted = true;
        $scope.rebuildFlat();
      };
/*
      $scope.editBranchOld = function (branch) {
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

      $scope.addBranchOld = function (branch) {
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
*/
      $scope.rebuildFlat();
    }
  ]);
