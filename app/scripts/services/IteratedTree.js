CategoryTreeApp.factory('IteratedTree',
  [          '$log', 'Branch',
    function ($log,   Branch) {
      'use strict';

      $log.info('IteratedTree loaded');

      var tree = {
        rootBranch: null,
        flat: [],

        init: function () {
          tree.rootBranch = new Branch('Iterated tree');
        },

        getRoot: function () {
          return tree.rootBranch;
        },

        getTreeIter: function () {
          return tree.flat;
        },

        rebuildFlat: function () {
          tree.flat.splice(0, tree.flat.length);

          var head = tree.getRoot();
          var level = 0;
          while (head) {
            console.log('line', head);
            tree.flat.push({level: level, name: head.name, branch: head});
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

          return tree.flat;
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