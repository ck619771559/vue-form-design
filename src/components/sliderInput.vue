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
    <el-slider
      :min="fusionOptions.min"
      :max="fusionOptions.max"
      :step="fusionOptions.step"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :show-stops="fusionOptions.attributes.indexOf('show-stops') > -1"
      :range="fusionOptions.attributes.indexOf('range') > -1"
      :show-tooltip="fusionOptions.attributes.indexOf('show-tooltip') > -1"
      :value="
        value < fusionOptions.min
          ? fusionOptions.min
          : value > fusionOptions.max
          ? fusionOptions.max
          : value
      "
      @input="changeValue"
    ></el-slider>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "sliderInput"; // 组件名称

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
    index: 9,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-jindutiao",
    label: "滑块", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: null, // 如果没有props 使用此值作为默认值
    options: {
      label: "滑块", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      max: 100,
      min: 0,
      step: 1,
      style: "",
      attributes: ["controls"],
      rules: []
    }
  },
  editConfig: {
    max: {
      type: "counterInput",
      options: {
        label: "最大可输入",
        step: 1,
        attributes: ["controls", "step-strictly"]
      }
    },
    min: {
      type: "counterInput",
      options: {
        label: "最小输入",
        step: 1,
        attributes: ["controls", "step-strictly"]
      }
    },
    step: {
      type: "counterInput",
      options: {
        label: "步长",
        step: 1,
        attributes: ["controls", "step-strictly"]
      }
    },
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
          list: [
            { value: "disabled", label: "禁用" },
            { value: "show-stops", label: "显示间断点" },
            { value: "range", label: "范围选择" },
            { value: "vertical", label: "竖排" },
            { value: "show-tooltip", label: "显示 tooltip" }
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
