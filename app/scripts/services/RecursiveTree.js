'use strict';

CategoryTreeApp.factory('RecursiveTree',
  [          '$log', 'Branch',
    function ($log,   Branch) {
      $log.info('RecursiveTree loaded');

      var tree = {
        rootBranch: null,
        flatRecur: [],

        init: function () {
          tree.rootBranch = new Branch('Recursive tree');
        },

        getRoot: function () {
          return tree.rootBranch;
        },

        getTreeRecur: function () {
          return tree.flatRecur;
        },

        rebuildFlat: function () {
          tree.flatRecur.splice(0, tree.flatRecur.length);
          tree.addBranchRecur(tree.flatRecur, 0, tree.getRoot());

          return tree.flatRecur;
        },

        addBranchRecur: function (flat, level, branch) {
          flat.push({level: level, name: branch.name, branch: branch});
          console.log(level, branch, flat);
          if (branch.firstChild) {
            console.log('down', level, branch);
            tree.addBranchRecur(flat, level + 1, branch.firstChild);
          }
          else if (branch.nextBranch) {
            console.log('next', level, branch);
            tree.addBranchRecur(flat, level, branch.nextBranch);
          }
          else {
            console.log('up', level, branch);

            while (branch.parent && !branch.parent.nextBranch) {
              branch = branch.parent;
              level--;
              console.log('up', branch, level);
            }
            if (branch.parent) {
              tree.addBranchRecur(flat, level - 1, branch.parent.nextBranch);
            }
          }
        }
      };

      tree.init();
      var rb = tree.rootBranch;
      var b1 = new Branch('B1');
      var b2 = new Branch('B2');
      var b3 = new Branch('B3');
      rb.addChild(b1);
      rb.addChild(b2);
      rb.addChild(b3);

      var b2a = new Branch('B2A');
      b2.addChild(b2a);

      return tree;
    }
  ]);
