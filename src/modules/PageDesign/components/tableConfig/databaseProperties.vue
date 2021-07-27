<template>
  <div>
    <div class="full-edit__table__control">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addBtn"
        >新增</el-button
      >
      <el-button
        v-if="multipleSelection.length > 0"
        size="small"
        type="danger"
        icon="el-icon-minus"
        @click="delBtn"
        >删除</el-button
      >
    </div>

    <el-table
      ref="multipleTable"
      :data="fields"
      border
      style="width: 100%"
      id="databaseProperties"
      row-key="uuid"
    >
      <el-table-column width="50" :resizable="false">
        <div class="drag-move">
          <img src="@/assets/move1.png" alt="" />
        </div>
      </el-table-column>
      <el-table-column width="55" :resizable="false">
        <template #header>
          <el-checkbox
            :value="fullSelection"
            @change="handleFullSelectionChange"
          ></el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            :disabled="scope.row.dbFieldName === 'id'"
            :value="multipleSelection.indexOf(scope.row.uuid) > -1"
            @change="handleSelectionChange(scope.row.uuid)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" label="#" type="index" width="50">
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
import { dbTypeDict } from "@/config/tableFormDict";
import ColumnWidget from "./columnWidget";
import { fieldAndComponent } from "../../adapter/cisiTable";
export default {
  name: "databaseProperties",
  props: ["fields"],
  components: { ColumnWidget },
  data() {
    return {
      multipleSelection: [],
      tableOptions: [
        {
          rules: [
            {
              required: true,
              message: "字段名称不能为空",
              trigger: "change"
            },
            {
              pattern: /^[a-zA-Z]{1}(?!_)[a-zA-Z0-9_\\$]+$/,
              message:
                "命名规则:只能由字母、数字、下划线、$符号组成;必须以字母开头;不能以单个字母加下滑线开头",
              trigger: "change"
            }
          ],
          label: "字段名称",
          model: "dbFieldName",
          type: "input"
        },
        {
          require: true,
          label: "字段备注",
          model: "dbFieldTxt",
          type: "input"
        },
        {
          width: "100px",
          require: true,
          label: "字段长度",
          model: "dbLength",
          type: "input",
          isNumber: true
        },
        {
          width: "100px",
          require: true,
          label: "小数点",
          model: "dbPointLength",
          type: "input",
          isNumber: true
        },
        {
          require: false,
          label: "默认值",
          model: "dbDefaultVal",
          type: "input"
        },
        {
          require: true,
          label: "字段类型",
          model: "dbType",
          type: "select",
          selectOptions: dbTypeDict,
          change: (index, value) => {
            let temp = fieldAndComponent[value];
            if (
              !(
                temp &&
                temp.filter(_ => _.value === this.fields[index].queryShowType)
                  .length > 0
              )
            ) {
              this.fields[index].queryShowType = "";
            }
            if (
              !(
                temp &&
                temp.filter(_ => _.value === this.fields[index].fieldShowType)
                  .length > 0
              )
            ) {
              this.fields[index].fieldShowType = "";
            }
          }
        },
        {
          width: "80px",
          label: "主键",
          type: "checkbox",
          model: "dbIsKey",
          align: "center"
        },
        {
          width: "80px",
          label: "允许空值",
          type: "checkbox",
          model: "dbIsNull",
          align: "center"
        }
      ]
    };
  },
  computed: {
    fullSelection() {
      return this.multipleSelection.length === this.fields.length - 1;
    }
  },
  methods: {
    handleFullSelectionChange() {
      if (this.fullSelection) {
        this.multipleSelection = [];
      } else {
        const temp = [];
        this.fields.forEach(_ => {
          if (
            !this.multipleSelection.includes(_.uuid) &&
            _.dbFieldName !== "id"
          ) {
            temp.push(_.uuid);
          }
        });
        this.multipleSelection = [...this.multipleSelection, ...temp];
      }
    },
    handleSelectionChange(val) {
      if (this.multipleSelection.includes(val)) {
        this.multipleSelection.splice(this.multipleSelection.indexOf(val), 1);
      } else {
        this.multipleSelection.push(val);
      }
    },
    addBtn() {
      this.$emit("handleAddItem");
    },
    delBtn() {
      this.$emit(
        "handleDeleteItems",
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
      this.multipleSelection = [];
    },
    drag() {
      // 首先获取需要拖拽的dom节点
      const el1 = document
        .querySelectorAll("#databaseProperties .el-table__body-wrapper")[0]
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
          let arr = JSON.parse(JSON.stringify(this.fields));
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]);

          this.$emit(
            "update:fields",
            arr.map((_, index) => ({
              ..._,
              orderNum: index + 1,
              order_num: index
            }))
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
