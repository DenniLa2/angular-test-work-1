/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 28.03.17.
 */
"use strict";

angular.module('app')
  .factory('DataF', function () {

    const ls = localStorage;

    const items = function () {

      const one = {
        save: function (item) {
          ls['item' + item.id] = item.name;
        },
        load: function (itemId) {
          return {
            id: itemId,
            name: ls['item' + itemId]
          };
        },
        remove: function (itemId) {
          ls.removeItem('item' + itemId);
        }
      };

      const all = {
        save: function (list) {
          ls.items = JSON.stringify(list);
        },
        load: function () {
          return JSON.parse(ls.items || '[]');
        },
        clear: function () {

        }
      };

      function add(item) {
        const list = all.load();
        list.push(item.id);
        all.save(list);
        one.save(item);
      }

      function load(itemId) {
        return one.load(itemId);
      }

      function remove(itemId) {
        const list = all.load();
        const idx = list.indexOf(itemId);
        list.splice(idx, 1);
        all.save(list);
        one.remove(itemId);
        comments.removeByItemId(itemId);
      }

      function loadAll() {
        const occur = comments.calcComments();
        const itemList = occur.itemList;
        const disperse = occur.disperse;

        const list = all.load();

        return list.map(function (el) {
          const idx = itemList.indexOf(el);
          const count = disperse[idx];
          const item = one.load(el);
          item.commentsCount = count;

          return item;
        });
      }

      return {
        add: add,
        load: load,
        remove: remove,
        loadAll: loadAll
      }

    }();


    const comments = function () {
      const one = {
        save: function (comment) {
          ls['comment' + comment.id] = comment.text;
        },
        load: function (commentId) {
          return ls['comment' + commentId];
        },
        remove: function (commentId) {
          ls.removeItem('comment' + commentId);
        }
      };

      const all = {
        save: function (list) {
          ls.comments = JSON.stringify(list);
        },
        load: function () {
          return JSON.parse(ls.comments || '[]');
        }
      };

      function add(comment) {
        // id, itemId, text
        const list = all.load();
        list.push({id: comment.id, itemId: comment.itemId});
        all.save(list);
        one.save(comment)
      }

      function getByItemId(itemId) {
        const list = all.load();
        const _list = list.filter(function (el) {
          return el.itemId === itemId;
        });
        return _list.map(function (el) {
          return one.load(el.id)
        })
      }

      function removeByItemId(itemId) {
        const list = all.load();
        const _list = list.filter(function (el) {
          return el.itemId === itemId;
        });
        const newList = list.filter(function (el) {
          return el.itemId !== itemId;
        });
        all.save(newList);
        _list.map(function(el) {
          one.remove(el.id)
        })
      }

      function calcComments() {
        const list = all.load();
        const itemList = [];
        const disperse = [];
        list.forEach(function (el) {
          const idx = itemList.indexOf(el.itemId);
          if (idx === -1) {
            itemList.push(el.itemId);
            disperse.push(1);

          } else {
            disperse[idx]++;
          }
        });

        return {itemList: itemList, disperse: disperse};
      }



      return {
        add: add,
        getByItemId: getByItemId,
        removeByItemId: removeByItemId,
        calcComments: calcComments
      }

    }();

    return {
      items: items,
      comments: comments
    }
  });