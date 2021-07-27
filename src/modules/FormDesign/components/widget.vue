<template>
  <div
    class="drag-item"
    :class="
      curSelectItem && curSelectItem.uuid === item.uuid
        ? 'action'
        : getErrorInfo
        ? 'error'
        : ''
    "
    :data-err="getErrorInfo"
    @click.stop="
      () => {
        $emit('updateCurSelectItem', item);
      }
    "
  >
    <co
      :is="`vfd_${item.type}`"
      :isPreview="true"
      :options="item.options"
      :curSelectItem="curSelectItem"
      :value="item.value"
      :item="item"
      :errFormListByNull="errFormListByNull"
      :errFormListByRepeat="errFormListByRepeat"
      @updateCurSelectItem="
        ite => {
          log(ite);
          $emit('updateCurSelectItem', ite);
        }
      "
      @handleDeleteItem="
        uuid => {
          $emit('handleDeleteItem', uuid);
        }
      "
    ></co>
    <div
      class="drag-item_action"
      v-show="curSelectItem && curSelectItem.uuid === item.uuid"
    >
      <div class="drag-move">
        <img src="../../../assets/move.png" alt="" />
      </div>
      <div
        class="item-delete"
        @click.stop="
          () => {
            $emit('handleDeleteItem', item.uuid);
          }
        "
      >
        <img src="../../../assets/delete.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "widget",
  props: {
    item: {
      type: Object
    },
    curSelectItem: {
      type: Object
    },
    formData: {},
    errFormListByRepeat: {
      type: Array
    },
    errFormListByNull: {
      type: Array
    }
  },
  computed: {
    getErrorInfo() {
      if (this.errFormListByNull.indexOf(this.item.uuid) > -1) {
        return "字段为空";
      } else if (this.errFormListByRepeat.indexOf(this.item.uuid) > -1) {
        return `${this.item.name} 字段重复`;
      } else {
        return false;
      }
    }
  },
  methods: {
    log(_) {
      console.log(_);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.drag-item {
  border: $border-dashed-minor;
  background: $background-color-gery;
  padding: 3px;
  position: relative;
  margin: 1px 0;
  &:hover {
    border: $border-select-hover;
    background: $background-color-select;
  }
  &.action {
    border: $border-select-hover;
  }
  &.error {
    border: $border-error;
  }
  &::after {
    content: attr(data-err);
    position: absolute;
    z-index: 5;
    text-align: right;
    top: 3px;
    right: 3px;
    background: rgba(64, 158, 255, 0.01);
    font-size: $font-size-mini;
    color: $error-color;
  }
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .drag-item_action {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: $border-select;

    box-sizing: border-box;
    .drag-move {
      cursor: move;
      height: 26px;
      width: 26px;
      z-index: 5;
      position: absolute;
      top: -2px;
      left: -2px;
      background: $font-color-select;
      > img {
        width: 20px;
        height: 20px;
      }
      @include flex-c-c;
    }
    .item-delete {
      height: 24px;
      width: 24px;
      cursor: pointer;
      z-index: 5;
      position: absolute;
      bottom: -2px;
      right: -2px;
      background: $font-color-select;
      > img {
        width: 18px;
        height: 18px;
      }
      @include flex-c-c;
    }
  }
}

.drag-item__move {
  height: inherit !important;
}
</style>
