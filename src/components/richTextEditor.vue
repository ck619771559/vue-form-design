<template>
  <el-form-item
    :style="fusionOptions.style"
    :label="fusionOptions.label"
    :label-width="
      fusionOptions.labelWidth.checked
        ? `${fusionOptions.labelWidth.width}px`
        : null
    "
    :rules="rules"
    :prop="name"
  >
    <quill-editor ref="myQuillEditor" :value="value" @input="changeValue" />
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "richTextEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  mixins: [component],
  computed: {},
  data() {
    return {
      editorOption: {}
    };
  },
  props: {
    value: {}
  },
  defaultConfig: {
    type: type,
    index: 1,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-fuwenben",
    label: "富文本", // 并非组件配置的label
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      label: "富文本", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      style: "",
      attributes: []
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      options: {
        // 属性编辑器的配置,就是defalutConfig的data
        label: "标题",
        max: null
      }
    },
    labelWidth: {
      type: "labelWidthEdit",
      options: {}
    },
    attributes: {
      type: "checkboxGroup",
      options: {
        label: "属性",
        options: {
          showLabel: true,
          isRemote: false,
          list: [{ value: "disabled", label: "禁用" }]
        }
      }
    }
  },
  methods: {},

  mounted() {}
};
</script>

<style scoped></style>
