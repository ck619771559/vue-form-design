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
    <el-date-picker
      :style="fusionOptions.isFullwidth ? 'width:100%' : ''"
      :disabled="fusionOptions.attributes.indexOf('disabled') > -1"
      :readonly="fusionOptions.attributes.indexOf('readonly') > -1"
      :editable="fusionOptions.attributes.indexOf('editable') > -1"
      :clearable="fusionOptions.attributes.indexOf('clearable') > -1"
      :value="value"
      @input="changeValue"
      :type="fusionOptions.type"
      :value-format="fusionOptions['value-format']"
      :placeholder="fusionOptions.placeholder"
      :start-placeholder="
        fusionOptions['start-placeholder']
          ? fusionOptions['start-placeholder']
          : undefined
      "
      :end-placeholder="
        fusionOptions['end-placeholder']
          ? fusionOptions['end-placeholder']
          : undefined
      "
      :range-separator="
        fusionOptions['range-separator']
          ? fusionOptions['range-separator']
          : undefined
      "
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";

const type = "datePicker"; // 组件名称

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
    index: 8,
    scope: "common", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-riqi",
    label: "日期选择器", // 并非组件配置的label
    group: "base", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {
      type: "date",
      label: "日期选择器", // 对应editConfig ，如果不存在 便不可编辑
      labelWidth: {
        checked: false,
        width: 100
      },
      placeholder: "",
      style: "",
      attributes: [],
      "start-placeholder": "",
      "end-placeholder": "",
      "range-separator": "",
      "value-format": "",
      rules: [],
      isFullwidth: false
    }
  },
  editConfig: {
    type: {
      type: "selectInput",
      options: {
        label: "类型",
        options: {
          showLabel: true,
          isRemote: false,
          list: [
            { value: "date", label: "日期" },
            { value: "week", label: "周" },
            { value: "month", label: "月" },
            { value: "year", label: "年" },
            { value: "dates", label: "多日期" },
            { value: "datetime", label: "日期时间" },
            { value: "datetimerange", label: "日期时间范围" },
            { value: "daterange", label: "日期范围" },
            { value: "monthrange", label: "月份范围" }
          ]
        }
      }
    },
    label: {
      type: "singleLineInput",
      options: {
        label: "标题",
        max: null
      }
    },
    labelWidth: {
      type: "labelWidthEdit",
      options: {}
    },
    "value-format": {
      type: "singleLineInput",
      options: {
        label: "格式"
      }
    },
    placeholder: {
      type: "singleLineInput",
      options: {
        label: "占位文本",
        if: {
          field: "type",
          operation: "include",
          data: ["datetimerange", "daterange", "monthrange"]
        },
        max: 2
      }
    },
    "start-placeholder": {
      type: "singleLineInput",
      options: {
        label: "开始日期的占位内容",
        if: {
          field: "type",
          operation: "not include",
          data: ["datetimerange", "daterange", "monthrange"]
        }
      }
    },
    "end-placeholder": {
      type: "singleLineInput",
      options: {
        label: "结束日期的占位内容",
        if: {
          field: "type",
          operation: "not include",
          data: ["datetimerange", "daterange", "monthrange"]
        }
      }
    },
    "range-separator": {
      type: "singleLineInput",
      options: {
        label: "分隔符",
        if: {
          field: "type",
          operation: "not include",
          data: ["datetimerange", "daterange", "monthrange"]
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
          list: [
            { value: "disabled", label: "禁用" },
            { value: "readonly", label: "只读" },
            { value: "editable", label: "文本框可输入" },
            { value: "clearable", label: "清空按钮" },
            { value: "unlink-panels", label: "范围选择器取消联动" }
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
