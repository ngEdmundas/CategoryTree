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

      $scope.editBranch = function (branch) {
        $scope.currentBranch = branch;
        $scope.branchDup = angular.copy(branch);
        var m = $modal.open({
          templateUrl: 'views/modal/EditBranch.html',
          controller: 'ModalController',
//          controller: CategoryTreeApp.controller('ModalController'),
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

          $scope.recursiveTree.rebuildFlat();
          $scope.iteratedTree.rebuildFlat();
        }, function () {
          console.log('Modal dismissed');
        });
        $scope.recursiveTree.rebuildFlat();
        $scope.iteratedTree.rebuildFlat();
      };

      $scope.deleteBranch = function (branch) {
        console.log('deleteBranch', branch);
        var b = branch.branch;
        if (b.prevBranch) {
          b.prevBranch.nextBranch = b.nextBranch;
        }
        if (b.nextBranch) {
          b.nextBranch.prevBranch = b.prevBranch;
        }
        if (b.parent.firstChild === b) {
          b.parent.firstChild = b.nextBranch;
        }
        if (b.parent.lastChild === b) {
          b.parent.lastChild = b.prevBranch;
        }
        branch.deleted = true;
        $scope.recursiveTree.rebuildFlat();
        $scope.iteratedTree.rebuildFlat();
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
          var p = $scope.parent.branch;
          b.parent = p;
          if (p.lastChild) {
            p.lastChild.nextBranch = b;
            p.lastChild = b;
          }
          else {
            p.lastChild = b;
            p.firstChild = b;
          }
          $scope.recursiveTree.rebuildFlat();
          $scope.iteratedTree.rebuildFlat();
//          $scope.$root.$apply();
          console.log('addBranch parent=', p);
        }, function () {
          console.log('Modal dismissed');
        });
      }
      $scope.recursiveTree.rebuildFlat();
      $scope.iteratedTree.rebuildFlat();
    }
  ]);
