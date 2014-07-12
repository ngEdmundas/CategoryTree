'use strict';

CategoryTreeApp.controller('ModalController',
  [          '$scope', '$log', '$modalStack', '$modalInstance', 'parent', 'branch',
    function ($scope,   $log,   $modalStack,   $modalInstance,   parent,   branch) {
//      [          '$scope', '$log', '$modalInstance',
//      function ($scope,   $log,   $modalInstance) {
      var mcLog = 'ModalController';
      $log.info(mcLog, 'Modal controller loaded, parent=', parent, 'branch=', branch);

      $scope.branch = branch;

      $scope.dismiss = function (reason) {
        $modalInstance.dismiss(reason);
      };

      $scope.dismissAll = function (reason) {
        $modalStack.dismissAll(reason);
      };

      $scope.saveBranch = function () {
        console.log('saveBranch branch=', $scope.branch);
        $modalInstance.close($scope.branch.name);
      };

      $scope.addBranch = function () {
        $scope.parent = parent;
        console.log('addBranch parent=', $scope.parent);
        $modalInstance.close($scope.branch.name);
      };
    }
  ]);
