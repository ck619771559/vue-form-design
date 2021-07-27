<template>
  <div class="assembly">
    <el-input
      class="searchBar"
      size="small"
      placeholder="搜索资源名称"
      v-model="searchText"
      clearable
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div class="assembly-component_warp">
      <template v-if="filterBaseComponentList.length > 0">
        <h3 class="assembly-title">
          基础组件
        </h3>
        <draggable
          class="drag-list "
          :list="filterBaseComponentList"
          :group="{ name: 'formDesign', pull: 'clone', put: false }"
          :sort="false"
          :clone="formMoveClone"
          :move="handleMove"
          @change="log"
        >
          <div
            class="drag-list-item"
            @click.stop="copyItemToFormListJson(item)"
            v-for="item in filterBaseComponentList"
            :key="item.type"
          >
            <i class="drag-list-item__icon iconfont" :class="item.icon"></i>
            <div class="drag-list-item__label">{{ item.label }}</div>
          </div>
        </draggable>
      </template>

      <template v-if="filterAdvancedComponentList.length > 0">
        <h3 class="assembly-title">
          高级组件
        </h3>
        <draggable
          class="drag-list "
          :list="filterAdvancedComponentList"
          :group="{ name: 'formDesign', pull: 'clone', put: false }"
          :sort="false"
          :clone="formMoveClone"
          :move="handleMove"
          @change="log"
        >
          <div
            class="drag-list-item"
            @click.stop="copyItemToFormListJson(item)"
            v-for="item in filterAdvancedComponentList"
            :key="item.type"
          >
            <i class="drag-list-item__icon iconfont" :class="item.icon"></i>
            <div class="drag-list-item__label">{{ item.label }}</div>
          </div>
        </draggable>
      </template>

      <template v-if="filterContainerComponentList.length > 0">
        <h3 class="assembly-title">
          容器组件
        </h3>
        <draggable
          class="drag-list "
          :list="filterContainerComponentList"
          :group="{ name: 'formDesign', pull: 'clone', put: false }"
          :sort="false"
          :clone="formMoveClone"
          :move="handleMove"
          @change="log"
        >
          <div
            class="drag-list-item"
            @click.stop="copyItemToFormListJson(item)"
            v-for="item in filterContainerComponentList"
            :key="item.type"
          >
            <i class="drag-list-item__icon iconfont" :class="item.icon"></i>
            <div class="drag-list-item__label">{{ item.label }}</div>
          </div>
        </draggable>
      </template>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { componentList } from "@/components";
import { formScopeRange } from "@/config/scopeRangeConfig";
import { uuid, getName } from "@/utils/uuid.js";

export default {
  name: "assembly",
  components: {
    draggable
  },
  data() {
    return {
      componentList,
      searchText: ""
    };
  },

  props: {},
  computed: {
    filterBaseComponentList() {
      if (this.searchText) {
        return componentList.filter(item => {
          return item["group"] === "base" &&
            formScopeRange.indexOf(item["scope"]) > -1
            ? item["label"].indexOf(this.searchText.trim()) > -1
            : false;
        });
      } else {
        return componentList.filter(
          item =>
            item["group"] === "base" &&
            formScopeRange.indexOf(item["scope"]) > -1
        );
      }
    },
    filterAdvancedComponentList() {
      if (this.searchText) {
        return componentList.filter(item => {
          return item["group"] === "advanced" &&
            formScopeRange.indexOf(item["scope"]) > -1
            ? item["label"].indexOf(this.searchText.trim()) > -1
            : false;
        });
      } else {
        return componentList.filter(
          item =>
            item["group"] === "advanced" &&
            formScopeRange.indexOf(item["scope"]) > -1
        );
      }
    },
    filterContainerComponentList() {
      if (this.searchText) {
        return componentList.filter(item => {
          return item["group"] === "container" &&
            formScopeRange.indexOf(item["scope"]) > -1
            ? item["label"].indexOf(this.searchText.trim()) > -1
            : false;
        });
      } else {
        return componentList.filter(
          item =>
            item["group"] === "container" &&
            formScopeRange.indexOf(item["scope"]) > -1
        );
      }
    }
  },

  methods: {
    handleMove() {
      return true;
    },
    log: function(evt) {
      console.log(evt);
    },
    copyItemToFormListJson(item) {
      let data;
      if (item.group !== "container") {
        data = {
          ...JSON.parse(JSON.stringify(item)),
          uuid: uuid(),
          name: getName(item.type)
        };
      } else {
        data = {
          ...JSON.parse(JSON.stringify(item)),
          uuid: uuid()
        };
      }
      this.$emit("updateItemToFormListJson", data);
    },

    formMoveClone(item) {
      if (item.group !== "container") {
        return {
          ...JSON.parse(JSON.stringify(item)),
          uuid: uuid(),
          name: getName(item.type)
        };
      } else {
        return {
          ...JSON.parse(JSON.stringify(item)),
          uuid: uuid()
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.assembly-component_warp {
  overflow-y: auto;
  flex: 1;
  @include hide-scrollbar;
}
.ghost {
  @include move-style;
}
.assembly {
  --assembly-width: 280px; // 组件库宽度
  display: flex;
  flex-direction: column;

  height: 100%;
  width: var(--assembly-width);
  background: #fff;
  border: $border-box;
  padding: 20px;
  box-sizing: border-box;
  color: $font-color-base;
  .assembly-title {
    margin-top: 10px;
    font-size: $font-size-base;
    user-select: none;
    &:first-of-type {
      margin-top: 20px;
    }
  }

  .drag-list {
    margin-top: 10px;
    @include flex-s-b(row, wrap);

    .drag-list-item {
      @include flex-c-c;
      justify-content: flex-start;
      height: 30px;
      margin-bottom: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      font-size: $font-size-small;
      background: #fff;
      border: 1px solid $background-color-label;
      cursor: move;
      transition: color 0.2s;
      user-select: none;
      width: calc(
        var(--assembly-width) / 2 - 25px
      ); // assembly 的padding占了40px,间隙设置10px
      &:hover {
        border: $border-dashed-label;
        color: #409eff;
      }
      &.sortable-chosen {
        border: $border-dashed-label;
        color: #409eff;
      }
      .drag-list-item__icon {
        margin-right: 5px;
        font-size: 18px;
        vertical-align: auto;
      }

      .drag-list-item__label {
        @include line-overflow;
      }
    }
  }
}
</style>
