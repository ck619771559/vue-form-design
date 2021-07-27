<template>
  <div>
    <el-table
      ref="queryConfiguration"
      :data="fields"
      border
      style="width: 100%"
      id="queryConfiguration"
      row-key="uuid"
      :default-sort="{ prop: 'queryOrderNum', order: 'ascending' }"
    >
      <el-table-column width="50" :resizable="false">
        <div class="drag-move">
          <img src="@/assets/move1.png" alt="" />
        </div>
      </el-table-column>
      <column-widget
        v-for="item in tableOptions"
        :key="item.label"
        :item="item"
      ></column-widget>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import ColumnWidget from "./columnWidget";

export default {
  name: "queryConfiguration",
  components: { ColumnWidget },
  props: ["fields"],

  data() {
    return {
      tableOptions: [
        {
          disabled: true,
          width: "80px",
          require: false,
          label: "查询排序",
          model: "queryOrderNum",
          type: "text",
          align: "center"
        },
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
          label: "控件类型",
          model: "queryShowType",
          type: "select",
          isComponentSelect: true
        },
        {
          require: false,
          label: "字典Table",
          model: "queryDictTable",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "字典Code",
          model: "queryDictField",
          type: "input",
          placeholder: " "
        },
        {
          require: false,
          label: "默认值",
          model: "queryDefVal",
          type: "input",
          placeholder: " "
        },
        {
          width: "80px",
          label: "是否启用",
          type: "checkbox",
          model: "queryConfigFlag",
          align: "center",
          change: (index, value) => {
            this.fields[index].isQuery = value;
          }
        }
      ]
    };
  },
  methods: {
    drag() {
      // 首先获取需要拖拽的dom节点
      const el1 = document
        .querySelectorAll("#queryConfiguration .el-table__body-wrapper")[0]
        .querySelectorAll("table > tbody")[0];
      Sortable.create(el1, {
        disabled: false, // 是否开启拖拽
        ghostClass: "sortable-ghost", //拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        handle: ".drag-move",
        group: {
          // 是否开启跨表拖拽
          pull: false,
          put: false
        },
        onEnd: e => {
          const fields = JSON.parse(JSON.stringify(this.fields));
          const fieldsSort = fields.sort(
            (x, y) => x.queryOrderNum - y.queryOrderNum
          );
          this.$emit(
            "changeFieldItemQueryIndex",
            fieldsSort[e.oldIndex].uuid,
            e.oldIndex,
            e.newIndex
          );
        }
      });
    }
  },
  mounted() {
    this.drag();
  }
};
</script>
<style scoped lang="scss">
.drag-move {
  @include flex-c-c();
  > img {
    height: 20px;
    width: 20px;
  }
}
</style>
