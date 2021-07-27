<template>
  <div class="formEdit">
    <GenerateForm
      ref="generateForm"
      :json="{
        ...json,
        formListJson: formDesign
      }"
    ></GenerateForm>

    <el-dialog
      append-to-body
      title="添加表单选项"
      width="25%"
      :close-on-click-modal="false"
      :visible.sync="dialogAddComponentVisible"
      :before-close="addComponentClose"
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
              v-for="item in dbShowFormList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="组件类型"
          :rules="[
            {
              required: true,
              message: `请选择组件类型`,
              trigger: 'change'
            }
          ]"
          prop="fieldShowType"
        >
          <el-select
            v-model="addForm.fieldShowType"
            placeholder="请选择组件类型"
            style="width: 100% "
          >
            <el-option
              v-for="item in fieldAndComponent[curAddFormDbType]
                ? fieldAndComponent[curAddFormDbType]
                : []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addComponentClose">取 消</el-button>
        <el-button type="primary" @click="handlePushAddForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  cistComponentList,
  cistTableFormToJson,
  fieldAndComponent
} from "../adapter/cisiTable";

export default {
  name: "formEdit",
  props: ["dialogFormEditVisible", "fields"],
  data() {
    return {
      addForm: {
        uuid: "",
        fieldShowType: ""
      },
      dialogAddComponentVisible: false,
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
      cistComponentList,
      fieldAndComponent
    };
  },
  computed: {
    formDesign() {
      return cistTableFormToJson(this.fields);
    },
    dbShowFormList() {
      return this.fields
        .filter(
          _ =>
            !(_.isShowForm === "Y" && _.fieldShowType) && _.dbFieldName !== "id"
        )
        .map(_ => ({
          label: `${_.dbFieldName}-${_.dbFieldTxt}`,
          value: _.uuid
        }));
    },
    curAddFormDbType() {
      if (this.addForm.uuid) {
        return this.fields.filter(_ => _.uuid === this.addForm.uuid)[0].dbType;
      } else {
        return null;
      }
    }
  },
  created() {
    console.log(this.formDesign);
  },
  methods: {
    changeAddFormUUID() {
      if (this.curAddFormDbType) {
        const temp = fieldAndComponent[this.curAddFormDbType];
        if (
          !(
            temp &&
            temp.filter(_ => _.value === this.addForm.fieldShowType).length > 0
          )
        ) {
          this.addForm.fieldShowType = "";
        }
      } else {
        this.addForm.fieldShowType = "";
      }
    },
    handlePushAddForm() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.$emit("changeField", this.addForm.uuid, {
            fieldShowType: this.addForm.fieldShowType,
            isShowForm: "Y"
          });
          this.addComponentClose();
        }
      });
    },
    addComponentClose() {
      this.$refs["addForm"].resetFields();
      this.dialogAddComponentVisible = false;
    },
    getMenus() {
      return [
        {
          name: "新增表单项",
          onClick: () => {
            this.dialogAddComponentVisible = true;
          }
        }
      ];
    }
  }
};
</script>

<style scoped lang="scss">
.formEdit {
  padding: 20px;
}
</style>
