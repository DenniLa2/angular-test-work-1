/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 28.03.17.
 */
"use strict";

angular.module('app')
  .component('comment', {
    templateUrl: 'js/components/comment/comment.html',
    bindings: {
      commentText: '<',
      isOdd: '<',
      isLast: '<'
    },
    controller: function () {
      const $ctrl = this;
      $ctrl.$onInit = function () {
      };

    }
  });