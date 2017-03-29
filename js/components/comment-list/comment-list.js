/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 28.03.17.
 */
"use strict";

angular.module('app')
  .component('commentList', {
    templateUrl: './js/components/comment-list/comment-list.html',
    bindings: {
      itemId: '<',
      itemIdx: '<'
    },
    controller: function ($rootScope, DataF) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
        //console.log('init comment list ---');
      };

      $ctrl.$onChanges = function () {
        $ctrl.comments.fill();
      };

      $ctrl.comments = {
        list: [],
        new: '',

        fill: function () {
          this.list.length = 0;
          const _this = this;
          DataF.comments.getByItemId($ctrl.itemId).forEach(function (el) {
            _this.list.push(el);
          });
        },
        add: function () {
          DataF.comments.add({
            id: new Date().getTime(),
            itemId: $ctrl.itemId,
            text: this.new
          });
          this.fill();
          this.new = '';

          $rootScope.$broadcast('addComment')
        }
      };

      $rootScope.$on('deleteItem', function () {
        $ctrl.comments.fill();
      });

    }
  });


angular.module('app').directive('myEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.myEnter);
        });

        event.preventDefault();
      }
    });
  };
});