'use strict';

CategoryTreeApp.factory('Branch',
  [          '$log',
    function ($log) {
      $log.info('Branch loaded');

      var Branch = function (name) {
        this.name = name;
        this.prevBranch = null;
        this.nextBranch = null;
        this.firstChild = null;
        this.lastChild = null;
        this.parent = null;
      }

      Branch.prototype.addChild = function (child) {
        child.parent = this;
        child.prevBranch = this.lastChild;
        if (this.lastChild) {
          this.lastChild.nextBranch = child;
        }
        this.lastChild = child;
        if (!this.firstChild) {
          this.firstChild = child;
        }
      };

      Branch.prototype.removeChild = function (child) {
        if (child.prevBranch) {
          child.prevBranch.nextBranch = child.nextBranch;
        }
        if (child.nextBranch) {
          child.nextBranch.prevBranch = child.prevBranch;
        }
        if (this.lastChild === child) {
          this.lastChild = child.prevBranch;
        }
        if (this.firstChild === child) {
          this.firstChild = child.nextBranch;
        }
      };

      return Branch;
    }
  ]);