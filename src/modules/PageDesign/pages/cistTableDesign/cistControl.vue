<template>
  <div class="preview-control">
    <div class="control-edit">
      <el-button
        @click="handleDel"
        v-if="head.isCheckbox === 'Y'"
        icon="el-icon-delete"
        size="small"
        >批量删除</el-button
      >
      <el-button @click="handleAdd" icon="el-icon-plus" size="small"
        >新增</el-button
      >
      <div class="edit-item__cover"></div>
    </div></div
></template>

<script>
import component from "@/mixins/component.js";
const type = "cistControl"; // 组件名称
export default {
  name: type,
  mixins: [component],
  methods: {
    getMenus() {
      return [];
    },
    handleAdd() {
      this.$emit("handleAddFormShow");
    },
    handleDel() {
      this.$emit("handleDeleteBatch");
    }
  },
  props: {
    head: {
      type: Object
    },
    curSelectItem: {},
    fields: {
      type: Array
    },
    isDesign: {
      type: Boolean,
      default: false
    }
  },
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    scope: "page", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "container", // 基础组件 base 高级组件 advanced 容器组件 container
    scopeList: [], // 可用组件列表
    options: {
      labelWidth: 95,
      style: ""
    }
  }
};
</script>

<style scoped lang="scss">
.preview-control {
  text-align: right;
  padding: 18px 15px;
  .control-edit {
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    padding: 1px;
  }
}
</style>
