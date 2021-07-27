export default {
  "label-width": {
    type: "counterInput",
    options: {
      label: "表单标签宽度"
    }
  },
  "label-position": {
    type: "radioGroup",
    options: {
      label: "标签对齐方式",
      isButton: true,
      options: {
        showLabel: true,
        isRemote: false,
        list: [
          { value: "left", label: "左对齐" },
          { value: "right", label: "右对齐" },
          { value: "top", label: "顶部对齐" }
        ]
      }
    }
  },
  size: {
    type: "radioGroup",
    options: {
      label: "组件尺寸",
      isButton: true,
      options: {
        showLabel: false,
        isRemote: false,
        list: [{ value: "mini" }, { value: "small" }, { value: "medium" }]
      }
    }
  },
  style: {
    type: "multiLineInput",
    options: {
      label: "自定义样式"
    }
  }
};
