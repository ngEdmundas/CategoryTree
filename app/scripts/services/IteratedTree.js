'use strict';

CategoryTreeApp.factory('IteratedTree',
  [          '$log', 'Branch',
    function ($log,   Branch) {
      $log.info('IteratedTree loaded');

      var tree = {
        rootBranch: null,

        init: function () {
          tree.rootBranch = new Branch('Iterated tree');
        },

        getRoot: function () {
          return tree.rootBranch;
        },

        getTreeIter: function () {
          var flat = [];
          var head = tree.getRoot();
          var level = 0;
          while (head) {
            console.log('line', head);
            flat.push({level: level, name: head.name, branch: head});
            if (head.firstChild) {
              level++;
              head = head.firstChild;
            }
            else if (head.nextBranch) {
              head = head.nextBranch;
            }
            else {
              while (head.parent && !head.parent.nextBranch) {
                level--;
                head = head.parent;
              }
              level--;
              head = (head.parent ? head.parent.nextBranch : null);
            }
          }

          return flat;
        },

        showBranch: function (branch) {
          confirm(branch.name);
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