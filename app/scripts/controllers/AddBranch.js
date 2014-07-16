'use strict';

CategoryTreeApp.controller('AddBranchController',
  [          '$scope', '$log', '$hideDialog', 'parent', 'branch', 'rebuild', 'Branch',
    function ($scope,   $log,   $hideDialog,   parent,   branch,   rebuild,   Branch) {
      var abcLog = 'AddBranchController';
      $log.info(abcLog, 'EditBranch invoked');

      $scope.addBranch = function (branchName) {
        console.log('addBranch branchName=', branchName);
        var b = new Branch(branchName);
        var p = parent;
        p.branch.addChild(b);
        rebuild();
        $hideDialog();
      };
      $scope.cancel = function () {
        $hideDialog();
      };
    }
  ]
);
