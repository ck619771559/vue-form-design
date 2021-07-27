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
    <el-radio-group
      :value="value"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      @input="
        _ => {
          $emit('change', _);
        }
      "
    >
      <el-radio
        :key="item.value"
        v-for="item in fusionOptions.options.list"
        :label="item.value"
        :is="fusionOptions.isButton ? 'el-radio-button' : 'el-radio'"
        >{{ item.label ? item.label : item.value }}</el-radio
      >
    </el-radio-group>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "radioGroup"; // 组件名称

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
  methods: {},
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 3,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-danxuan",
    label: "单选框组", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      label: "单选框组", // 对应editConfig ，如果不存在 便不可编辑
      isButton: false,
      style: "",
      labelWidth: {
        checked: false,
        width: 100
      },
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "Option 1", label: "Option 1" },
          { value: "Option 2", label: "Option 2" },
          { value: "Option 3", label: "Option 3" }
        ]
      },
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    options: {
      type: "dynamicEditor",
      options: {}
    },
    labelWidth: {
      type: "labelWidthEdit",
      options: {}
    },
    isButton: {
      type: "radioGroup",
      options: {
        label: "按钮样式",
        isButton: true,
        options: {
          showLabel: true,
          isRemote: false,
          list: [
            { value: false, label: "圆点" },
            { value: true, label: "按钮" }
          ]
        }
      }
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
    },
    rules: {
      type: "rulseEditor",
      options: {
        config: ["haveRequired"]
      }
    },
    style: {
      type: "multiLineInput",
      options: {
        label: "自定义样式"
      }
    }
  }
};
</script>

<style scoped></style>
