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
    <el-input-number
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :controls="fusionOptions.attributes.indexOf('controls') > -1"
      :step-strictly="fusionOptions.attributes.indexOf('step-strictly') > -1"
      :min="fusionOptions.min"
      :max="fusionOptions.max"
      :step="fusionOptions.step"
      :value="value"
      @change="changeValue"
    ></el-input-number>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";
const type = "counterInput";
export default {
  name: type,
  enable: true,
  type: "common", // 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
  mixins: [component],
  data() {
    return {};
  },
  props: {
    value: {
    }
  },
  defaultConfig: {
    type,
    index: 2,
    icon: "icon-shuzishurukuang",
    label: "计数器",
    scope: "common",
    group: "base",
    value: 100,
    options: {
      label: "计数器",
      labelWidth: {
        checked: false,
        width: 100
      },
      max: 200,
      min: 0,
      step: 1,
      style: "",
      attributes: ["controls"],
      rules: []
    }
  },
  editConfig: {
    label: {
      type: "singleLineInput",
      options: {
        label: "标签名称"
      }
    },
    max: {
      type: "counterInput",
      options: {
        label: "最大值",
        max: 500,
        min: -500
      }
    },
    min: {
      type: "counterInput",
      options: {
        label: "最小值",
        max: 500,
        min: -500
      }
    },
    step: {
      type: "counterInput",
      options: {
        label: "步长",
        max: 500,
        min: -500
      }
    },
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "counterInput",
      options: {
        label: "默认值"
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
            { value: "controls", label: "显示控制按钮" },
            { value: "step-strictly", label: "限制输入为步长步数" }
          ]
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
