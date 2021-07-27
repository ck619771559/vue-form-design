<template>
  <el-form-item :label="fusionOptions.label">
    <el-checkbox
      style="margin-right: 20px"
      :value="value.checked"
      @change="
        e => {
          $emit('change', { ...value, checked: e });
        }
      "
      >自定义</el-checkbox
    >
    <el-input-number
      :value="value.width"
      @change="
        e => {
          $emit('change', { ...value, width: e });
        }
      "
      :disabled="!value.checked"
      :min="fusionOptions.min"
      :max="fusionOptions.max"
      label="描述文字"
    ></el-input-number>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "labelWidthEdit"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  mixins: [component],
  data() {
    return {};
  },
  props: {
    value: {}
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 1,
    scope: "edit", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: {}, // 如果没有props 使用此值作为默认值
    options: {
      label: "标题宽度", // 对应editConfig ，如果不存在 便不可编辑
      min: 0,
      max: 300
    }
  },
  editConfig: {}
};
</script>

<style scoped></style>
