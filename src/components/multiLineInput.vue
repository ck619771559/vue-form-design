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
    <el-input
      type="textarea"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :readonly="fusionOptions.attributes.indexOf('readonly') > -1"
      :show-password="fusionOptions.attributes.indexOf('show-password') > -1"
      :clearable="fusionOptions.attributes.indexOf('clearable') > -1"
      :show-word-limit="
        fusionOptions.attributes.indexOf('show-word-limit') > -1
      "
      :rows="fusionOptions.rows"
      :value="value"
      :maxlength="fusionOptions.max"
      @input="changeValue"
      :placeholder="fusionOptions.placeholder"
    ></el-input>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "multiLineInput"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  mixins: [component],
  data() {
    return {};
  },
  props: {
    value: {
      type: String
    }
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 1,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-duohangshurukuang",
    label: "多行输入框", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      label: "多行输入框", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      placeholder: "",
      max: 300,
      rows: 2,
      style: "",
      attributes: [],
      rules: []
    }
  },
  editConfig: {
    max: {
      type: "counterInput",
      options: {
        label: "最大可输入",
        max: 5000,
        min: 0
      }
    },
    rows: {
      type: "counterInput",
      options: {
        label: "输入框行数",
        max: 100,
        min: 1
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
    placeholder: {
      type: "singleLineInput",
      options: {
        // 属性编辑器的配置,就是defalutConfig的data
        label: "占位文本"
      }
    },
    value: {
      // value 为组件value不是options里的，options不能使用该字段
      type: "singleLineInput",
      options: {
        label: "默认文本"
      }
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
            { value: "readonly", label: "只读" },
            { value: "clearable", label: "清空按钮" },
            { value: "show-word-limit", label: "字数统计" }
          ]
        }
      }
    },
    rules: {
      type: "rulseEditor",
      options: {
        config: ["haveRequired", "havePreinstall"] //        haveRequired 必填, haveRegExp 正则, havePreinstall 预设
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
