<template>
  <div class="preview-table">
    <div class="table-design" v-if="isDesign">
      <div class="table-design-head">
        <div
          v-if="head.isCheckbox === 'Y'"
          class="table-design-head-item checkbox"
        >
          <el-checkbox :disabled="true" :value="false"></el-checkbox>
        </div>
        <draggable
          :style="`flex:${showColArray.length}`"
          group="cistTable"
          :value="showColArray"
          ghostClass="ghost"
          handle=".drag-move"
          :animation="200"
          @change="listMove"
        >
          <transition-group
            class="table-design-head-drag"
            name="fade"
            tag="div"
          >
            <div
              class="table-design-head-item"
              v-for="item in showColArray"
              :key="item.uuid"
            >
              <div
                class="table-design-head-item__text"
                @click.stop="handleChangeCurSelectItem(item)"
              >
                {{ item.dbFieldTxt
                }}<span class="diy-caret-wrapper" v-if="item.sortFlag === 'Y'"
                  ><i class="diy-caret-wrapper_ascending"></i
                  ><i class="diy-caret-wrapper_descending"></i
                ></span>
              </div>
              <div
                class="drag-item_action"
                v-if="
                  curSelectItem &&
                    curSelectItem.editType === 'cistTableItemEdit' &&
                    curSelectItem.uuid === item.uuid
                "
              >
                <div class="drag-move">
                  <img src="@/assets/move.png" alt="" />
                </div>
                <div
                  class="item-delete"
                  @click.stop="handleDisableShowItem(item.uuid)"
                >
                  <img src="@/assets/delete.png" alt="" />
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="table-design-head-item other">
          操作
        </div>
      </div>

      <div class="table-design-content">
        <span>暂无数据</span>
      </div>
    </div>
    <el-table
      header-cell-class-name="table-head-cell"
      v-else
      border
      size="small"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      :data="tableData"
    >
      <el-table-column
        v-if="head.isCheckbox === 'Y'"
        align="center"
        type="selection"
        width="42"
      >
      </el-table-column>
      <el-table-column
        v-for="item in showColArray"
        :key="item.uuid"
        :prop="item.dbFieldName"
        :label="item.dbFieldTxt"
        :sortable="item.sortFlag === 'Y'"
        align="center"
        :resizable="false"
        :formatter="
          item.dbType === 'Date'
            ? (row, col, value) =>
                value ? dateFormat(new Date(value), 'yyyy-MM-dd') : '-'
            : undefined
        "
      >
      </el-table-column>
      <el-table-column align="center" label="操作" :resizable="false">
        <template slot-scope="scope">
          <el-button
            @click="
              () => {
                $emit('handleForm', scope.row, 'view');
              }
            "
            type="text"
            style="    color: #00A4E0 !important;
    padding: 0;"
            >查看</el-button
          >
          <el-button
            @click="
              () => {
                $emit('handleForm', scope.row, 'edit');
              }
            "
            type="text"
            style="    color: #00A4E0 !important;
    padding: 0;"
            >修改</el-button
          >
          <el-button
            @click="handleTableDataItemDelete(scope.row)"
            type="text"
            style="    color: #FF0000 !important; padding: 0;"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="preview-table__pagination">
      <div class="pagination-edit">
        <el-pagination
          v-if="head.isPage === 'Y'"
          background
          @current-change="handleCurrentChange"
          :current-page="pagination ? pagination.pageNum : 1"
          :page-size="pagination ? pagination.pageSize : 10"
          layout="total,prev, pager, next"
          :total="total ? total : tableData ? tableData.length : 99"
        >
        </el-pagination>
        <div class="edit-item__cover"></div>
      </div>
    </div>

    <el-dialog
      append-to-body
      title="添加列表显示项"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleAddClose"
      :close-on-click-modal="false"
    >
      <el-form
        class="vue-form-design__dialog"
        ref="addForm"
        size="small"
        :model="addForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item
          label="字段名称"
          :rules="[
            {
              required: true,
              message: `请选择字段`,
              trigger: 'change'
            }
          ]"
          prop="uuid"
        >
          <el-select
            v-model="addForm.uuid"
            placeholder="请选择字段"
            style="width: 100%"
          >
            <el-option
              v-for="item in dbFieldTxtList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddClose">取 消</el-button>
        <el-button type="primary" @click="handlePushAddForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      append-to-body
      width="30%"
      title="新增字段"
      :visible.sync="dialogAddField"
      :before-close="handleAddFieldClose"
      :close-on-click-modal="false"
    >
      <el-form
        class="vue-form-design__dialog"
        ref="addFormField"
        size="small"
        :model="addFormField"
        label-position="right"
        label-width="80px"
      >
        <el-form-item
          label="字段名称"
          :rules="[
            {
              required: true,
              message: `请输入字段名称`,
              trigger: 'change'
            }
          ]"
          prop="dbFieldName"
        >
          <el-input v-model="addFormField.dbFieldName"></el-input>
        </el-form-item>
        <el-form-item
          label="字段备注"
          :rules="[
            {
              required: true,
              message: `请输入字段备注`,
              trigger: 'change'
            }
          ]"
          prop="dbFieldTxt"
        >
          <el-input v-model="addFormField.dbFieldTxt"></el-input>
        </el-form-item>
        <el-form-item label="字段类型" prop="dbType">
          <el-select
            style="width: 100%"
            v-model="addFormField.dbType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dbTypeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="字段长度"
          :rules="[
            {
              required: true,
              message: `字段长度不能为空`,
              trigger: 'change'
            }
          ]"
          prop="dbLength"
        >
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="addFormField.dbLength"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="小数点"
          :rules="[
            {
              required: true,
              message: `小数点长度不能为空`,
              trigger: 'change'
            }
          ]"
          prop="dbPointLength"
        >
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="addFormField.dbPointLength"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认值" prop="dbDefaultVal">
          <el-input v-model="addFormField.dbDefaultVal"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddFieldClose">取 消</el-button>
        <el-button type="primary" @click="handlePushAddFormField"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import component from "@/mixins/component.js";
import { dbTypeDict } from "@/config/tableFormDict";
import draggable from "vuedraggable";
import { dateFormat } from "../../../../utils/dateUtils";

const type = "cistTable"; // 组件名称
export default {
  name: type,
  mixins: [component],
  components: {
    draggable
  },
  props: {
    head: {
      type: Object
    },
    curSelectItem: {},
    fields: {
      type: Array
    },
    isDesign: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array
    },
    total: {},
    pagination: {
      type: Object
    }
  },
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    scope: "page", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "container", // 基础组件 base 高级组件 advanced 容器组件 container
    scopeList: [], // 可用组件列表
    options: {
      style: ""
    }
  },
  data() {
    return {
      dbTypeDict,
      dialogAddField: false,
      dialogAddVisible: false,
      addForm: {
        uuid: ""
      },
      addFormField: {
        dbFieldName: "",
        dbFieldTxt: "",
        dbLength: "64",
        dbPointLength: "0",
        dbDefaultVal: "",
        dbType: "string"
      },
      dateFormat
    };
  },
  computed: {
    showColArray() {
      const x = this.fields
        .filter(_ => _.isShowList === "Y")
        .sort((x, y) => x.order_num - y.order_num);
      return x;
    },
    dbFieldTxtList() {
      return this.fields
        .filter(_ => _.isShowList !== "Y" && _.dbFieldName !== "id")
        .map(_ => ({
          label: `${_.dbFieldName}-${_.dbFieldTxt}`,
          value: _.uuid
        }));
    }
  },
  methods: {
    sortChange(_) {
      this.$emit("sortChange", _);
    },
    handleCurrentChange(_) {
      this.$emit("handleCurrentChange", _);
    },
    handleTableDataItemChange(item) {
      this.$emit("handleTableDataItemChange", item);
    },
    handleTableDataItemDelete(item) {
      this.$emit("handleTableDataItemDelete", item);
    },
    handleSelectionChange(val) {
      this.$emit("update:multipleSelection", val);
    },
    handleAddFieldClose() {
      this.$refs["addFormField"].resetFields();
      this.dialogAddField = false;
    },
    handlePushAddFormField() {
      this.$refs["addFormField"].validate(valid => {
        if (valid) {
          this.$emit(
            "handleAddField",
            JSON.parse(JSON.stringify(this.addFormField))
          );
          this.handleAddFieldClose();
        }
      });
    },
    listMove({ moved: e }) {
      if (e) {
        const { newIndex } = e;

        const arr = JSON.parse(JSON.stringify(this.fields));
        arr.splice(
          this.showColArray[newIndex].order_num,
          0,
          arr.splice(e.element.order_num, 1)[0]
        );
        this.$emit(
          "update:fields",
          arr.map((_, index) => ({
            ..._,
            orderNum: index + 1,
            order_num: index
          }))
        );
      }
    },
    handleDisableShowItem(uuid) {
      this.$emit("changeField", uuid, {
        isShowList: "N"
      });
    },
    handleChangeCurSelectItem(item) {
      this.$emit("updateCurSelectItem", {
        ...item,
        editType: "cistTableItemEdit"
      });
    },
    curSelectHeadClass({ column, columnIndex }) {
      if (column.property === "mxxw0opzho") return "table-head-cell";
      return `table-head-cell hover data-${this.showColArray[columnIndex].uuid}`;
    },
    handlePushAddForm() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.$emit("changeField", this.addForm.uuid, {
            isShowList: "Y"
          });
          this.handleAddClose();
        }
      });
    },
    handleAddClose() {
      this.$refs["addForm"].resetFields();
      this.dialogAddVisible = false;
    },
    getMenus() {
      return [
        {
          name: "添加字段",
          onClick: () => {
            this.dialogAddField = true;
          }
        },
        {
          name: "列表显示项",
          childList: [
            {
              name: "添加",
              onClick: () => {
                this.dialogAddVisible = true;
              }
            },
            {
              name: "全部添加",
              onClick: () => {
                this.$emit("changeAllField", { isShowList: "Y" });
              }
            },
            {
              name: "清空",
              onClick: () => {
                this.$emit("changeAllField", { isShowList: "N" });
              }
            }
          ]
        },
        {
          name: this.head.isCheckbox === "Y" ? "关闭多选操作" : "启动多选操作",
          onClick: this.changeIsCheckBox
        },
        {
          name: this.head.isPage === "Y" ? "关闭分页" : "启动分页",
          onClick: this.changeIsPage
        }
      ];
    },
    changeIsPage() {
      this.$emit(
        "changeHeadItem",
        "isPage",
        this.head.isPage === "Y" ? "N" : "Y"
      );
    },
    changeIsCheckBox() {
      this.$emit(
        "changeHeadItem",
        "isCheckbox",
        this.head.isCheckbox === "Y" ? "N" : "Y"
      );
    }
  },

  mounted() {}
};
</script>

<style scoped lang="scss">
.diy-caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
  .diy-caret-wrapper_ascending {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    position: absolute;
    left: 7px;
    border-bottom-color: #c0c4cc;
    top: 5px;
  }
  .diy-caret-wrapper_descending {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    position: absolute;
    left: 7px;
    border-top-color: #c0c4cc;
    bottom: 7px;
  }
}
.table-design {
  .table-design-head {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    user-select: none;
    .table-design-head-drag {
      display: flex;
      flex-direction: row;
    }
    .table-design-head-item {
      flex: 1;
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: #909399;
      position: relative;
      box-sizing: border-box;
      &.other {
        flex: 1;
      }
      &.checkbox {
        flex: initial !important;
        width: 42px;
        flex-shrink: 0;
      }
      .table-design-head-item__text {
        height: 100%;
        width: 100%;
      }
    }
  }
  .table-design-content {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    user-select: none;
    > span {
      color: #909399;
      font-size: 14px;
    }
  }
}
.drag-item_action {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: $border-select;

  box-sizing: border-box;

  .drag-move {
    cursor: move;
    height: 26px;
    width: 26px;
    z-index: 5;
    position: absolute;
    top: -1px;
    left: -1px;
    background: $font-color-select;

    > img {
      width: 20px;
      height: 20px;
    }

    @include flex-c-c;
  }

  .item-delete {
    height: 24px;
    width: 24px;
    cursor: pointer;
    z-index: 5;
    position: absolute;
    bottom: -1px;
    right: -1px;
    background: $font-color-select;

    > img {
      width: 18px;
      height: 18px;
    }

    @include flex-c-c;
  }
}
::v-deep.preview-table {
  padding: 0px 15px 15px;

  .preview-table__pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 41px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    border-top-width: 0;
    background-color: #fff;
    position: relative;
    .pagination-edit {
      display: inline-block;
      position: relative;
    }
  }
  .table-head-cell {
    .cell {
      font-weight: bold;
    }
  }
}
</style>
