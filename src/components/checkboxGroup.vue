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
    <el-checkbox-group :value="value" @input="changeValue">
      <el-checkbox
        :key="item.value"
        v-for="item in fusionOptions.options.list"
        :label="item.value"
        :is="fusionOptions.isButton ? 'el-checkbox-button' : 'el-checkbox'"
        >{{ item.label ? item.label : item.value }}</el-checkbox
      >
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "checkboxGroup"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  mixins: [component],
  data() {
    return {};
  },
  props: {
    value: {
      type: Array
    }
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 4,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-duoxuan",
    label: "多选框组", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: [], // 如果没有props 使用此值作为默认值
    options: {
      label: "多选框组", // 对应editConfig ，如果不存在 便不可编辑
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
            { value: false, label: "选框" },
            { value: true, label: "按钮" }
          ]
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
