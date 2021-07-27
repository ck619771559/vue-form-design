<template>
  <div class="preview-content">
    <template v-for="item in curPage.design">
      <hello
        :ref="`generatePage_${item.type}`"
        :options="item.options"
        :fields="tableJson.fields"
        :head="tableJson.head"
        :key="item.type"
        :is="`dd_${item.type}`"
        :tableData="isPreview ? mockTableDataFilter : tableData"
        :multipleSelection.sync="multipleSelection"
        :total="total"
        :pagination="pagination"
        @handQuery="handleQuery"
        @handleForm="handleForm"
        @handleAddFormShow="
          () => {
            handleForm({}, 'add');
          }
        "
        @handleDeleteBatch="handleDeleteBatch"
        @handleTableDataItemDelete="handleTableDataItemDelete"
        @handleCurrentChange="handleCurrentChange"
        @sortChange="sortChange"
      ></hello>
    </template>

    <el-dialog
      append-to-body
      :title="
        dialogFormType === 'add'
          ? '新增'
          : dialogFormType === 'edit'
          ? '修改'
          : '查看'
      "
      width="600px"
      :before-close="handleAddClose"
      :visible.sync="dialogPreviewForm"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <GenerateForm
        v-if="dialogPreviewForm"
        ref="generateForm"
        :json="{
          ...json,
          formListJson:
            dialogFormType === 'add'
              ? list
              : dialogFormType === 'edit'
              ? editList
              : viewList
        }"
      ></GenerateForm>
      <span
        slot="footer"
        v-if="dialogFormType !== 'view'"
        class="dialog-footer"
      >
        <el-button @click="handleAddClose">取 消</el-button>
        <el-button
          type="primary"
          :loading="handlePushAddFormLoading"
          @click="handlePushAddForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pagesDesign } from "./pages";
import { cistTableFormToJson } from "./adapter/cisiTable";
import { uuid } from "../../utils/uuid";
// import {cistComponentList} from "./adapter/cisiTable";
export default {
  name: "GeneratePage",
  props: {
    tableJson: {
      type: Object,
      default() {
        return {
          fields: [],
          head: {
            formCategory: null,
            formTemplate: "normal",
            idType: "UUID",
            isCheckbox: true,
            isPage: true,
            isTree: false,
            queryMode: "single",
            tableName: "",
            tableTxt: "",
            tableType: 1,
            searchLabelWidth: 100,
            themeTemplate: "cistTable"
          }
        };
      }
    },
    tableData: {
      type: Array
    },
    isPreview: {
      default: false
    },
    total: {},
    pagination: {}
  },
  data() {
    return {
      multipleSelection: [],
      mockTableData: [],
      mockQueryForm: {},
      dialogPreviewForm: false,
      json: {
        formJson: {
          tableName: "",
          "label-width": 100,
          size: "small",
          "label-position": "right",
          style: ""
        },
        formListJson: []
      },
      dialogFormData: {},
      dialogFormType: "add",
      handlePushAddFormLoading: false
    };
  },
  computed: {
    curPage() {
      return pagesDesign.filter(
        _ => _.value === this.tableJson.head.themeTemplate
      )[0];
    },
    list() {
      return cistTableFormToJson(this.tableJson.fields);
    },
    editList() {
      return cistTableFormToJson(
        this.tableJson.fields,
        "edit",
        this.dialogFormData
      );
    },
    viewList() {
      return cistTableFormToJson(
        this.tableJson.fields,
        "view",
        this.dialogFormData
      );
    },
    mockTableDataFilter() {
      if (JSON.stringify(this.mockQueryForm) === "{}") {
        return this.mockTableData;
      } else {
        return this.mockTableData.filter(_ => {
          for (let x in this.mockQueryForm) {
            if (_[x] && _[x].indexOf(this.mockQueryForm[x]) > -1) {
              return true;
            }
          }
          return false;
        });
      }
    }
  },
  methods: {
    sortChange(_) {
      this.$emit("sortChange", _);
    },
    handleCurrentChange(_) {
      this.$emit("handleCurrentChange", _);
    },
    handleForm(item, type) {
      if (this.isPreview) {
        switch (type) {
          case "edit":
            this.dialogFormType = type;
            this.dialogFormData = JSON.parse(JSON.stringify(item));
            this.dialogPreviewForm = true;
            break;
          case "view":
            this.dialogFormType = type;
            this.dialogFormData = JSON.parse(JSON.stringify(item));
            this.dialogPreviewForm = true;
            break;
          default:
            this.dialogFormType = "add";
            this.dialogPreviewForm = true;
        }
      } else {
        switch (type) {
          case "edit":
            this.dialogFormType = type;
            this.dialogPreviewForm = true;
            this.$nextTick(() => {
              this.$emit("handleForm", this.dialogFormType, item);
            });

            break;
          case "view":
            this.dialogFormType = type;
            this.dialogPreviewForm = true;
            this.$nextTick(() => {
              this.$emit("handleForm", this.dialogFormType, item);
            });

            break;
          default:
            this.dialogFormType = "add";
            this.dialogPreviewForm = true;
        }
      }
    },
    handleQuery(_) {
      if (this.isPreview) {
        this.mockQueryForm = _;
      } else {
        this.$emit("handQuery", _);
      }
    },
    handleTableDataItemDelete(item) {
      if (this.isPreview) {
        const { uuid } = item;
        this.mockTableData = this.mockTableData.filter(_ => {
          return _.uuid !== uuid;
        });
      } else {
        this.$emit("handleTableDataItemDelete", item);
      }
    },
    handleDeleteBatch() {
      if (this.isPreview) {
        const uuids = this.multipleSelection.map(_ => _.uuid);
        this.mockTableData = this.mockTableData.filter(_ => {
          return uuids.indexOf(_.uuid) === -1;
        });
        this.multipleSelection = [];
      } else {
        this.$emit("handleDeleteBatch", this.multipleSelection);
      }
    },
    initQueryJson(init) {
      // !init && this.$refs["ruleForm"].clearValidate();
      console.log(init);
    },
    handleAddClose() {
      this.handlePushAddFormLoading = false;
      this.dialogPreviewForm = false;
      this.$refs["generateForm"].initJson();
    },
    handlePushAddForm() {
      this.$refs["generateForm"].getData().then(_ => {
        if (this.isPreview) {
          if (this.dialogFormType === "edit") {
            this.mockTableData = this.mockTableData.map(x => {
              if (x.uuid === this.dialogFormData.uuid) {
                return { ...x, ..._ };
              }
              return x;
            });
          } else {
            this.mockTableData.push({ ..._, uuid: uuid() });
          }
          this.dialogPreviewForm = false;
        } else {
          this.handlePushAddFormLoading = true;
          this.$emit("handlePushAddForm", this.dialogFormType, _);
        }
      });
    }
  },

  created() {
    this.initQueryJson(true);
  }
};
</script>

<style scoped lang="scss">
.preview-content {
  flex: 1;
  background-color: #fff;
  position: relative;
}
</style>
