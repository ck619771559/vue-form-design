export const tableTypeDict = [
  { value: 1, label: "单表" },
  { value: 2, label: "主表" },
  { value: 3, label: "附表" }
];

export const formCategoryDict = [{ value: 1, label: "测试类型" }];

export const idTypeDict = [
  {
    value: "UUID",
    label: "ID_WORKER(分布式自增)"
  }
];

export const queryModeDict = [
  {
    value: "single",
    label: "单表查询"
  },
  {
    value: "group",
    label: "组合查询"
  }
];

export const formTemplateDict = [
  {
    value: "normal",
    label: "一般"
  }
];
export const dbTypeDict = [
  {
    label: "Integer",
    value: "Integer",
    dbLength: 10
  },
  {
    label: "Blob",
    value: "Blob",
    dbLength: 0
  },
  {
    label: "Text",
    value: "Text",
    dbLength: 0
  },
  {
    label: "String",
    value: "String",
    dbLength: 32
  },
  {
    label: "Double",
    value: "Double",
    dbLength: 10
  },
  {
    label: "Date",
    value: "Date",
    dbLength: 0
  }
];

export const ColQueryModeDict = [
  {
    label: "普通查询",
    value: "single"
  },
  {
    label: "范围查询",
    value: "group"
  }
];

export const defaultField = {
  dbFieldName: "",
  dbFieldTxt: "",
  queryDictField: "",
  queryDictText: "",
  queryDefVal: "",
  queryDictTable: "",
  queryConfigFlag: "N",
  mainTable: "",
  mainField: "",
  fieldHref: "",
  dictField: "",
  dictText: "",
  fieldMustInput: "N",
  dictTable: "",
  fieldLength: "120",
  fieldDefaultValue: "",
  fieldExtendJson: "",
  converter: "",
  isShowForm: "N",
  isShowList: "N",
  sortFlag: "N",
  isReadOnly: "N",
  fieldShowType: "singleLineInput",
  isQuery: "N",
  queryMode: "single",
  dbLength: "64",
  dbPointLength: "0",
  dbDefaultVal: "",
  dbType: "String",
  dbIsKey: "N",
  dbIsNull: "Y",
  queryShowType: "",
  queryLabelWidth: null
};

export const defaultTableJson = {
  fields: [
    {
      isRequired: true,
      uuid: "59d65e52-79c4-9bb2-8041-0fb314c4ebf2",
      dbFieldName: "id",
      dbFieldTxt: "主键",
      queryOrderNum: 0,
      queryDictField: "",
      queryDictText: "",
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      mainTable: "",
      mainField: "",
      fieldHref: "",
      dictField: "",
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "N",
      isShowList: "N",
      sortFlag: "N",
      isReadOnly: "Y",
      fieldShowType: "singleLineInput",
      isQuery: "N",
      queryMode: "single",
      dbLength: "36",
      dbPointLength: "0",
      dbDefaultVal: "",
      orderNum: 1,
      dbType: "String",
      dbIsKey: "Y",
      dbIsNull: "N",
      queryShowType: "",
      order_num: 0,
      queryLabelWidth: null
    },
    {
      uuid: "bf7cd0d2-83e1-4909-f56a-5eee8d491ba0",
      dbFieldName: "create_by",
      dbFieldTxt: "创建人",
      queryDictField: "",
      queryDictText: "",
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      queryOrderNum: 1,
      mainTable: "",
      mainField: "",
      fieldHref: "",
      dictField: "",
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "Y",
      isShowList: "N",
      sortFlag: "N",
      isReadOnly: "N",
      fieldShowType: "singleLineInput",
      queryShowType: "",
      isQuery: "N",
      queryMode: "single",
      dbLength: "50",
      dbPointLength: "0",
      dbDefaultVal: "",
      orderNum: 2,
      dbType: "String",
      dbIsKey: "N",
      dbIsNull: "Y",
      order_num: 1,
      queryLabelWidth: null
    },
    {
      uuid: "2310f0a1-ae38-84ef-8a08-52476d26ec41",
      dbFieldName: "create_time",
      dbFieldTxt: "创建日期",
      queryDictField: "",
      queryDictText: "",
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      queryOrderNum: 2,
      mainTable: "",
      mainField: "",
      fieldHref: "",
      dictField: "",
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "N",
      isShowList: "N",
      sortFlag: "N",
      isReadOnly: "N",
      fieldShowType: "singleLineInput",
      isQuery: "N",
      queryMode: "datePicker",
      dbLength: "20",
      dbPointLength: "0",
      queryShowType: "",
      dbDefaultVal: "",
      orderNum: 3,
      dbType: "Date",
      dbIsKey: "N",
      dbIsNull: "Y",
      order_num: 2,
      queryLabelWidth: null
    },
    {
      uuid: "19e043b2-6519-eeee-a69e-13c32174d7ac",
      dbFieldName: "update_by",
      dbFieldTxt: "更新人",
      queryDictField: "",
      queryDictText: "",
      queryOrderNum: 3,
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      mainTable: "",
      mainField: "",
      fieldHref: "",
      dictField: "",
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "Y",
      isShowList: "N",
      sortFlag: "N",
      isReadOnly: "N",
      fieldShowType: "singleLineInput",
      isQuery: "N",
      queryMode: "single",
      dbLength: "50",
      queryShowType: "",
      dbPointLength: "0",
      dbDefaultVal: "",
      orderNum: 4,
      dbType: "String",
      dbIsKey: "N",
      dbIsNull: "Y",
      order_num: 3,
      queryLabelWidth: null
    },
    {
      uuid: "6f94fd67-cbe1-9934-ab4a-7db7ac353963",
      dbFieldName: "update_time",
      dbFieldTxt: "更新日期",
      queryDictField: "",
      queryDictText: "",
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      mainTable: "",
      mainField: "",
      queryOrderNum: 4,
      fieldHref: "",
      dictField: "",
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "N",
      isShowList: "N",
      sortFlag: "N",
      queryShowType: "",
      isReadOnly: "N",
      fieldShowType: "datePicker",
      isQuery: "N",
      queryMode: "single",
      dbLength: "20",
      dbPointLength: "0",
      dbDefaultVal: "",
      orderNum: 5,
      dbType: "Date",
      dbIsKey: "N",
      dbIsNull: "Y",
      order_num: 4,
      queryLabelWidth: null
    },
    {
      uuid: "3fa77346-0903-305f-e359-bac6497f0eb3",
      dbFieldName: "sys_org_code",
      dbFieldTxt: "所属部门",
      queryDictField: "",
      queryDictText: "",
      queryDefVal: "",
      queryDictTable: "",
      queryConfigFlag: "N",
      mainTable: "",
      mainField: "",
      fieldHref: "",
      dictField: "",
      queryOrderNum: 5,
      dictText: "",
      fieldMustInput: "N",
      dictTable: "",
      fieldLength: "120",
      fieldDefaultValue: "",
      fieldExtendJson: "",
      converter: "",
      isShowForm: "N",
      isShowList: "N",
      sortFlag: "N",
      isReadOnly: "N",
      fieldShowType: "singleLineInput",
      isQuery: "N",
      queryMode: "single",
      dbLength: "64",
      dbPointLength: "0",
      dbDefaultVal: "",
      orderNum: 6,
      dbType: "String",
      dbIsKey: "N",
      dbIsNull: "Y",
      queryShowType: "",
      order_num: 5,
      queryLabelWidth: null
    }
  ],
  head: {
    formCategory: null,
    formTemplate: "normal",
    idType: "UUID",
    isCheckbox: "Y",
    isPage: "Y",
    isTree: "N",
    queryMode: "single",
    tableName: "",
    tableTxt: "",
    tableType: 1,
    themeTemplate: "cistTable"
  }
};
