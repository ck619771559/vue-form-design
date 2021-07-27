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
export default {
  name: "foreignKey",
  components: { ColumnWidget },
  props: ["fields"],
  data() {
    return {
      tableOptions: [
        {
          width: "150px",
          disabled: true,
          require: false,
          label: "字段名称",
          model: "dbFieldName",
          type: "input",
          placeholder: " "
        },
        {
          width: "150px",
          disabled: true,
          require: false,
          label: "字段备注",
          model: "dbFieldTxt",
          type: "input",
          placeholder: " "
        },
        {
          width: "250px",
          require: false,
          label: "主表名",
          model: "mainTable",
          type: "input",
          placeholder: " "
        },
        {
          width: "250px",
          require: false,
          label: "主表字段",
          model: "mainField",
          type: "input",
          placeholder: " "
        }
      ]
    };
  }
};
</script>

<style scoped></style>
