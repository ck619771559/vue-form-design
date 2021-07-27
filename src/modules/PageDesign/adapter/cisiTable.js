const cistComponentList = [
  {
    value: "singleLineInput",
    label: "单行输入框",
    data: {
      type: "singleLineInput",
      index: 0,
      name: "",
      scope: "common",
      icon: "icon-danhangshurukuang",
      label: "单行输入框",
      group: "base",
      value: "",
      options: {
        label: "单行输入框",
        labelWidth: {
          checked: false,
          width: 100
        },
        placeholder: "",
        max: 50,
        style: "",
        attributes: [],
        rules: []
      }
    }
  },

  {
    value: "multiLineInput",
    label: "多行输入框",
    data: {
      type: "multiLineInput",
      index: 1,
      scope: "common",
      icon: "icon-duohangshurukuang",
      label: "多行输入框",
      group: "base",
      value: "",
      options: {
        label: "多行输入框",
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
    }
  },
  {
    value: "richTextEditor",
    label: "富文本",
    data: {
      type: "richTextEditor",
      index: 1,
      scope: "common",
      icon: "icon-fuwenben",
      label: "富文本",
      group: "advanced",
      value: "",
      options: {
        label: "富文本",
        labelWidth: {
          checked: false,
          width: 100
        },
        style: "",
        attributes: []
      }
    }
  },
  {
    value: "counterInput",
    label: "计数器",
    data: {
      type: "counterInput",
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
    }
  },
  {
    value: "radioGroup",
    label: "单选框组",
    data: {
      type: "radioGroup",
      index: 3,
      scope: "common",
      icon: "icon-danxuan",
      label: "单选框组",
      group: "base",
      value: "",
      options: {
        label: "单选框组",
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
            {
              value: "Option 1",
              label: "Option 1"
            },
            {
              value: "Option 2",
              label: "Option 2"
            },
            {
              value: "Option 3",
              label: "Option 3"
            }
          ]
        },
        attributes: [],
        rules: []
      }
    }
  },
  {
    value: "checkboxGroup",
    label: "多选框组",
    data: {
      type: "checkboxGroup",
      index: 4,
      scope: "common",
      icon: "icon-duoxuan",
      label: "多选框组",
      group: "base",
      value: [],
      options: {
        label: "多选框组",
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
            {
              value: "Option 1",
              label: "Option 1"
            },
            {
              value: "Option 2",
              label: "Option 2"
            },
            {
              value: "Option 3",
              label: "Option 3"
            }
          ]
        },
        rules: []
      }
    }
  },
  {
    value: "selectInput",
    label: "下拉选择器",
    data: {
      type: "selectInput",
      index: 5,
      scope: "common",
      icon: "icon-xiala",
      label: "下拉选择器",
      group: "base",
      value: "",
      options: {
        label: "下拉选择器",
        style: "",
        labelWidth: {
          checked: false,
          width: 100
        },
        options: {
          showLabel: true,
          isRemote: false,
          list: [
            {
              value: "Option 1",
              label: "Option 1"
            },
            {
              value: "Option 2",
              label: "Option 2"
            },
            {
              value: "Option 3",
              label: "Option 3"
            }
          ]
        },
        placeholder: "",
        attributes: [],
        rules: []
      }
    }
  },
  {
    value: "rateInput",
    label: "评分输入框",
    data: {
      type: "rateInput",
      index: 6,
      scope: "common",
      icon: "icon-caozuo-pingxingline",
      label: "评分输入框",
      group: "base",
      value: 0,
      options: {
        label: "评分输入框",
        labelWidth: {
          checked: false,
          width: 100
        },
        max: 5,
        style: "",
        attributes: ["controls"],
        rules: []
      }
    }
  },
  {
    value: "switchInput",
    label: "开关",
    data: {
      type: "switchInput",
      index: 6,
      scope: "common",
      icon: "icon-kaiguan",
      label: "开关",
      group: "base",
      value: 0,
      options: {
        label: "开关",
        labelWidth: {
          checked: false,
          width: 100
        },
        style: "",
        attributes: [],
        rules: [],
        "active-value": 1,
        "inactive-value": 0
      }
    }
  },
  {
    value: "datePicker",
    label: "日期选择器",
    data: {
      type: "datePicker",
      index: 8,
      scope: "common",
      icon: "icon-riqi",
      label: "日期选择器",
      group: "base",
      value: "",
      options: {
        type: "date",
        label: "日期选择器",
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
        "value-format": "timestamp",
        rules: [],
        isFullwidth: true
      }
    }
  },
  {
    value: "datePickerRange",
    label: "日期范围",
    data: {
      type: "datePicker",
      index: 8,
      scope: "common",
      icon: "icon-riqi",
      label: "日期范围",
      group: "base",
      value: "",
      options: {
        type: "daterange",
        label: "日期范围",
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
        "value-format": "timestamp",
        rules: [],
        isFullwidth: true
      }
    }
  },
  {
    value: "sliderInput",
    label: "滑块",
    data: {
      type: "sliderInput",
      index: 9,
      scope: "common",
      icon: "icon-jindutiao",
      label: "滑块",
      group: "base",
      value: null,
      options: {
        label: "滑块",
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
    }
  }
];
const fieldAndComponent = {
  Integer: cistComponentList.filter(_ => {
    return ["counterInput", "rateInput", "sliderInput", "switchInput"].includes(
      _.value
    );
  }),
  String: cistComponentList.filter(_ => {
    return [
      "singleLineInput",
      "multiLineInput",
      "counterInput",
      "rateInput",
      "sliderInput",
      "switchInput",
      "radioGroup",
      "checkboxGroup",
      "selectInput"
    ].includes(_.value);
  }),
  Text: cistComponentList.filter(_ => {
    return [
      "singleLineInput",
      "multiLineInput",
      "counterInput",
      "rateInput",
      "sliderInput",
      "switchInput",
      "radioGroup",
      "checkboxGroup",
      "selectInput",
      "richTextEditor"
    ].includes(_.value);
  }),
  Date: cistComponentList.filter(_ => {
    return ["datePicker"].includes(_.value);
  }),
  Double: cistComponentList.filter(_ => {
    return ["counterInput", "rateInput", "sliderInput", "switchInput"].includes(
      _.value
    );
  })
};

const whiteEditConfigList = ["label"];

const cistTableQueryToJson = fields => {
  let jsonList = [];
  for (let field of fields) {
    if (field.queryConfigFlag === "Y" && field.isQuery === "Y") {
      const component = cistComponentList.filter(
        _ =>
          (field.dbType === "Date" && field.queryMode === "group"
            ? `${field.queryShowType}Range`
            : field.queryShowType) === _.value
      )[0];
      if (component) {
        const tempComponent = JSON.parse(JSON.stringify(component.data));
        tempComponent.name = field.dbFieldName;
        tempComponent.uuid = field.uuid;
        tempComponent.options.label = field.dbFieldTxt;
        tempComponent.value = field.queryDefVal;
        tempComponent.oIndex = field.queryOrderNum;
        tempComponent.editType = "cistSearchItemEdit"; //当前编辑类型
        field.dbLength !== 0 && (tempComponent.options.max = field.dbLength);
        if (field.queryLabelWidth) {
          tempComponent.options.labelWidth = {
            checked: true,
            width: field.queryLabelWidth
          };
        }
        tempComponent.options.placeholder = `请输入${field.dbFieldTxt}`;
        jsonList.push(tempComponent);
      }
    }
  }
  jsonList.sort((x, y) => x.oIndex - y.oIndex);
  return jsonList;
};
const cistTableFormToJson = (fields, type = "add", formData = {}) => {
  let jsonList = [];
  for (let field of fields) {
    if (field.isShowForm === "Y" || type === "view") {
      const component = cistComponentList.filter(
        _ => field.fieldShowType === _.value
      )[0];
      if (component) {
        const tempComponent = JSON.parse(JSON.stringify(component.data));
        switch (type) {
          case "view":
            tempComponent.options.attributes.push("disabled");
            formData[field.dbFieldName] &&
              (tempComponent.value = formData[field.dbFieldName]);
            break;
          case "edit":
            if (field.isReadOnly === "Y") {
              tempComponent.options.attributes.push("disabled");
            }
            formData[field.dbFieldName] &&
              (tempComponent.value = formData[field.dbFieldName]);
            break;

          default:
            tempComponent.value = field.queryDefVal;
            break;
        }

        tempComponent.uuid = field.uuid;
        tempComponent.name = field.dbFieldName;
        tempComponent.options.label = field.dbFieldTxt;

        tempComponent.oIndex = field.queryOrderNum;
        tempComponent.editType = "cistFormItemEdit"; //当前编辑类型
        tempComponent.options.placeholder = `请输入${field.dbFieldTxt}`;
        field.dbLength !== 0 && (tempComponent.options.max = field.dbLength);
        if (Number(field.fieldMustInput)) {
          tempComponent.options.rules = [
            ...tempComponent.options.rules,
            {
              type: "required",
              msg: ""
            }
          ];
        }
        if (field.fieldValidType) {
          tempComponent.options.rules = [
            ...tempComponent.options.rules,
            {
              type: "preinstall",
              msg: "",
              rule: field.fieldValidType
            }
          ];
        }
        jsonList.push(tempComponent);
      }
    }
  }
  console.log(jsonList, 1231, "jsonList");
  jsonList.sort((x, y) => x.oIndex - y.oIndex);
  return jsonList;
};

const cistSearchItemEdit = [
  {
    source: "label",
    target: "dbFieldTxt",
    type: "singleLineInput",
    options: {
      label: "字段备注"
    }
  },
  {
    source: "value",
    target: "queryDefVal",
    type: "singleLineInput",
    options: {
      label: "默认值"
    }
  },
  {
    source: "labelWidth",
    target: "queryLabelWidth",
    type: "labelWidthEdit",
    options: {}
  }
];
const cistTableItemEdit = [
  {
    source: "dbFieldTxt",
    target: "dbFieldTxt",
    type: "singleLineInput",
    options: {
      label: "字段备注"
    }
  },
  {
    source: "sortFlag",
    target: "sortFlag",
    type: "switchInput",
    options: {
      label: "是否排序",
      "active-value": "Y",
      "inactive-value": "N"
    }
  }
];
const editItemArray = {
  cistSearchItemEdit,
  cistTableItemEdit
};

export {
  editItemArray,
  cistComponentList,
  cistTableQueryToJson,
  whiteEditConfigList,
  cistTableFormToJson,
  fieldAndComponent
};
