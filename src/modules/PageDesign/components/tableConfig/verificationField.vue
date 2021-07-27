<template>
  <el-table
    ref="multipleTable"
    :data="fields"
    border
    style="width: 100%"
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
import rulesDict from "../../../../config/rulesDict";
export default {
  name: "verificationField",
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
          require: false,
          label: "字段Href",
          model: "fieldHref",
          type: "input",
          placeholder: " "
        },
        {
          width: "170px",
          require: false,
          label: "验证规则",
          model: "fieldValidType",
          type: "select",
          clearable: true,
          selectOptions: rulesDict
        },

        {
          width: "80px",
          label: "校验必填",
          type: "checkbox",
          model: "fieldMustInput",
          align: "center"
        },
        {
          require: false,
          label: "字典Table",
          model: "dictTable",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "字典Code",
          model: "dictField",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "字典Text",
          model: "dictText",
          type: "input",
          placeholder: " "
        }
      ]
    };
  }
};
</script>

<style scoped></style>
