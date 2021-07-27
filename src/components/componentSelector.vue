<template>
  <el-form-item :label="fusionOptions.label">
    <el-select @input="changeValue" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cistComponentList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
// 页面生成器使用
import component from "@/mixins/component.js";
import { cistComponentList } from "../modules/PageDesign/adapter/cisiTable";

const type = "componentSelector"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  mixins: [component],
  data() {
    return {
      cistComponentList
    };
  },
  props: {
    value: {}
  },
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 3,
    scope: "edit", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: {}, // 如果没有props 使用此值作为默认值
    options: {
      label: "组件选择", // 对应editConfig ，如果不存在 便不可编辑
      min: 0,
      max: 300
    }
  },
  editConfig: {}
};
</script>

<style scoped></style>
