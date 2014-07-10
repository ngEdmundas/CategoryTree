'use strict';

CategoryTreeApp.controller('ModalController',
  [          '$scope', '$log', '$modalInstance',
    function ($scope,   $log,   $modalInstance) {
      var mcLog = 'ModalController';
      $log.info(mcLog, 'Modal controller loaded');

      $scope.dismiss = function (reason) {
        $modalInstance.dismiss(reason);
      };

      $scope.save = function () {
        $modalInstance.close($scope.branchName);
      }
    }
  ]);
