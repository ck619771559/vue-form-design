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
    <el-select
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :multiple="fusionOptions.attributes.indexOf('multiple') > -1"
      :filterable="fusionOptions.attributes.indexOf('filterable') > -1"
      :clearable="fusionOptions.attributes.indexOf('clearable') > -1"
      :placeholder="fusionOptions.placeholder"
      :value="value"
      @input="changeValue"
    >
      <el-option
        v-for="item in fusionOptions.options.list"
        :key="item.value"
        :label="item.label ? item.label : item.value"
        :value="item.value"
        :value-key="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "selectInput"; // 组件名称

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
    index: 5,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-xiala",
    label: "下拉选择器", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      label: "下拉选择器", // 对应editConfig ，如果不存在 便不可编辑
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
      placeholder: "",
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

    placeholder: {
      type: "singleLineInput",
      options: {
        // 属性编辑器的配置,就是defalutConfig的data
        label: "占位文本"
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
            { value: "multiple", label: "多选" },
            { value: "filterable", label: "是否可搜索" },
            { value: "clearable", label: "清空按钮" }
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
