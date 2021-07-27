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
    <el-switch
      :active-value="fusionOptions['active-value']"
      :inactive-value="fusionOptions['inactive-value']"
      :value="value"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      @input="changeValue"
    >
    </el-switch>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "switchInput"; // 组件名称

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
    index: 6,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-kaiguan",
    label: "开关", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: 0, // 如果没有props 使用此值作为默认值
    options: {
      label: "开关", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      style: "",
      attributes: [],
      rules: [],
      "active-value": true,
      "inactive-value": false
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
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "switchInput",
      options: {
        label: "默认值"
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
        config: ["haveRequired"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
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
