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
    <el-rate
      style="line-height: 2;"
      :max="parseInt(fusionOptions.max)"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :show-score="fusionOptions.attributes.indexOf('show-score') > -1"
      :allow-half="fusionOptions.attributes.indexOf('allow-half') > -1"
      :value="value"
      @input="changeValue"
    ></el-rate>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "rateInput"; // 组件名称

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
    icon: "icon-caozuo-pingxingline",
    label: "评分输入框", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: 0, // 如果没有props 使用此值作为默认值
    options: {
      label: "评分输入框", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      max: 5,
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
            { value: "disabled", label: "只读" },
            { value: "show-score", label: "显示分数" },
            { value: "allow-half", label: "允许半星" }
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
