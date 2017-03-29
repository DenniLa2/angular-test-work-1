/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 28.03.17.
 */
"use strict";

angular.module('app')
  .component('item', {
    templateUrl: './js/components/item/item.html',
    bindings: {
      itemData: '<',
      isSelected: '<',
      onSelect: '=',
      onDelete: '='
    },
    controller: function () {
      const $ctrl = this;


    }
  });