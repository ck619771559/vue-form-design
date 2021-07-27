<template>
  <el-table
    ref="multipleTable"
    :data="fields"
    border
    style="width: 100%"
    id="databaseProperties"
    row-key="uuid"
  >
    <el-table-column :resizable="false" label="#" type="index" width="50">
    </el-table-column>
    <column-widget
      v-for="item in tableOptions"
      :key="item.label"
      :item="item"
    ></column-widget>
  </el-table>
</template>

<script>
import ColumnWidget from "./columnWidget";
import { ColQueryModeDict } from "../../../../config/tableFormDict";

export default {
  name: "pageProperties",
  components: { ColumnWidget },
  props: ["fields"],
  data() {
    return {
      tableOptions: [
        {
          width: "100px",
          disabled: true,
          require: false,
          label: "字段名称",
          model: "dbFieldName",
          type: "input",
          placeholder: " "
        },
        {
          width: "100px",
          disabled: true,
          require: false,
          label: "字段备注",
          model: "dbFieldTxt",
          type: "input",
          placeholder: " "
        },
        {
          width: "60px",
          label: "表单显示",
          type: "checkbox",
          model: "isShowForm",
          align: "center"
        },
        {
          width: "60px",
          label: "列表显示",
          type: "checkbox",
          model: "isShowList",
          align: "center"
        },
        {
          width: "60px",
          label: "是否排序",
          type: "checkbox",
          model: "sortFlag",
          align: "center"
        },
        {
          width: "60px",
          label: "是否只读",
          type: "checkbox",
          model: "isReadOnly",
          align: "center"
        },
        {
          width: "170px",
          require: true,
          label: "控件类型",
          model: "fieldShowType",
          type: "select",
          isComponentSelect: true
        },
        {
          width: "120px",
          require: true,
          label: "控件长度",
          model: "fieldLength",
          type: "input",
          isNumber: true
        },
        {
          width: "60px",
          label: "是否查询",
          type: "checkbox",
          model: "isQuery",
          align: "center"
        },
        {
          width: "120px",
          require: true,
          label: "查询类型",
          model: "queryMode",
          type: "select",
          selectOptions: ColQueryModeDict
        },
        {
          require: false,
          label: "控件默认值",
          model: "fieldDefaultValue",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "扩展参数",
          model: "fieldExtendJson",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "自定义转换器",
          model: "converter",
          type: "input",
          placeholder: " "
        }
      ]
    };
  }
};
</script>

<style scoped></style>
