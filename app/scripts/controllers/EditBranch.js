'use strict';

CategoryTreeApp.controller('EditBranchController',
  [          '$scope', '$log', '$hideDialog', 'branch', 'rebuild',
    function ($scope,   $log,   $hideDialog,   branch,   rebuild) {
      var ebcLog = 'EditBranchController';
      $log.info(ebcLog, 'EditBranch invoked');

      $scope.saveBranch = function (branchName) {
        console.log('addBranch branchName=', branchName);
        branch.branch.name = branchName;
        rebuild();
        $hideDialog();
      };

      $scope.cancel = function () {
        $hideDialog();
      };
    }
  ]
);
