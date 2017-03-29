/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 28.03.17.
 */
"use strict";

angular.module('app').component('itemList', {
  templateUrl: './js/components/item-list/item-list.html',
  controller: function ($rootScope, DataF) {
    const $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.items.fillList();
      $ctrl.items.selectFirst();
    };

    $ctrl.items = {
      list: [],
      new: '',
      selected: null,
      selectedIdx: null,

      fillList: function () {
        this.list.length = 0;

        const _this = this;
        DataF.items.loadAll().forEach(function (el) {
          _this.list.push(el);
        });
      },
      selectFirst: function () {
        if (this.list.length > 0) {
          this.selected = this.list[0].id;
          this.selectedIdx = 0;

        } else {
          this.selected = null;
          this.selectedIdx = null;
        }
      },
      add: function () {
        if (!this.new || this.new.length === 0) return;

        const itemId = new Date().getTime();

        DataF.items.add({
          id: itemId,
          name: this.new
        });

        this.new = '';

        this.fillList();
        this.onSelect(itemId)
      },
      onSelect: function (itemId) {
        $ctrl.items.selected = itemId;
        $ctrl.items.list.forEach(function (el, i) {
          if (el.id === itemId) {
            $ctrl.items.selectedIdx = i;
          }
        });
      },
      onDelete: function (itemId) {
        DataF.items.remove(itemId);
        $ctrl.items.fillList();
        $ctrl.items.selectFirst();
        $rootScope.$broadcast('deleteItem');
      }
    };

    $rootScope.$on('addComment', function () {
      $ctrl.items.fillList();
    });
  }
});