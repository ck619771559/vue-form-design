<template>
  <div class="preview-search" v-if="isDesign || list.length > 0">
    <div v-if="list.length === 0 && isDesign" class="preview-search-tip">
      当前搜索栏为空，保存后将不会显示搜索框
    </div>
    <el-form
      ref="searchForm"
      :model="queryForm"
      label-width="80px"
      :style="fusionOptions.style"
      size="small"
      :show-message="false"
    >
      <el-row class="search-edit">
        <el-col :span="list.length === 1 ? 6 : list.length === 2 ? 12 : 18">
          <el-row>
            <draggable
              v-if="isDesign"
              class="is-design"
              group="cistSearch"
              :list="list"
              ghostClass="ghost"
              handle=".drag-move"
              @change="listMove"
              :animation="200"
            >
              <transition-group class="warp-drag-item" name="fade" tag="div">
                <el-col
                  :key="index"
                  v-for="(item, index) in list"
                  :span="list.length === 1 ? 24 : list.length === 2 ? 12 : 8"
                  class="search-edit-item"
                >
                  <widget
                    :key="item.uuid"
                    :curSelectItem="
                      curSelectItem &&
                      curSelectItem.editType === 'cistSearchItemEdit'
                        ? curSelectItem
                        : null
                    "
                    :item="item"
                    @updateCurSelectItem="
                      ite => {
                        $emit('updateCurSelectItem', ite);
                      }
                    "
                    @handleDeleteItem="
                      uuid => {
                        $emit('handleDeleteQueryItem', uuid);
                      }
                    "
                  >
                  </widget>
                </el-col>
              </transition-group>
            </draggable>

            <el-col
              v-else
              :key="index"
              v-for="(item, index) in list"
              :span="list.length === 1 ? 24 : list.length === 2 ? 12 : 8"
              class="search-edit-item"
            >
              <et
                v-if="componentListToNameList.indexOf(item.type) > -1"
                v-model="queryForm[item.name]"
                :key="item.uuid"
                :is="`vfd_${item.type}`"
                :options="item.options"
                :name="item.name"
              ></et>
              <div v-else :key="item.uuid" class="form-item error">
                该属性编辑组件无效
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6" class="search-edit-item">
          <el-form-item label-width="10px">
            <el-button
              class="public_bg_btn"
              size="small"
              type="primary"
              @click="pushQueryForm"
              >查询</el-button
            >
            <el-button
              @click="resetQueryForm"
              class="public_or_btn"
              size="small"
              >重置</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog
      :close-on-click-modal="false"
      title="添加搜索输入框"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleAddClose"
      append-to-body
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
            @change="changeAddFormUUID"
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
        <el-form-item
          label="组件类型"
          :rules="[
            {
              required: true,
              message: `请选择组件类型`,
              trigger: 'change'
            }
          ]"
          prop="queryShowType"
        >
          <el-select
            v-model="addForm.queryShowType"
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
        <el-form-item
          required
          label="是否是范围查询"
          v-if="curAddFormDbType === 'Date'"
        >
          <el-switch v-model="addForm.isRange"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddClose">取 消</el-button>
        <el-button type="primary" @click="handlePushAddForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import component from "@/mixins/component.js";
import widget from "../../components/widget";
import draggable from "vuedraggable";
import {
  cistComponentList,
  fieldAndComponent,
  cistTableQueryToJson
} from "../../adapter/cisiTable";
const type = "cistSearch"; // 组件名称
export default {
  name: type,
  directives: {},
  components: {
    widget,
    draggable
  },
  computed: {
    list() {
      return cistTableQueryToJson(this.fields);
    },
    dbFieldTxtList() {
      return this.fields
        .filter(
          _ =>
            !(_.queryConfigFlag === "Y" && _.queryShowType) &&
            _.dbFieldName !== "id"
        )
        .map(_ => ({
          label: `${_.dbFieldName}-${_.dbFieldTxt}`,
          value: _.uuid
        }));
    },
    componentListToNameList() {
      return cistComponentList.map(item => item.data.type);
    },
    curAddFormDbType() {
      if (this.addForm.uuid) {
        return this.fields.filter(_ => _.uuid === this.addForm.uuid)[0].dbType;
      } else {
        return null;
      }
    }
  },
  watch: {
    list() {
      let tempObj = {};
      this.list.forEach(_ => {
        tempObj[_.name] = _.value;
      });
      this.queryForm = tempObj;
    }
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
    }
  },
  data() {
    return {
      dialogAddVisible: false,
      addForm: {
        uuid: "",
        queryShowType: "",
        isRange: false
      },
      queryForm: {},
      fieldAndComponent
    };
  },
  methods: {
    changeAddFormUUID() {
      if (this.curAddFormDbType) {
        const temp = fieldAndComponent[this.curAddFormDbType];
        if (
          !(
            temp &&
            temp.filter(_ => _.value === this.addForm.queryShowType).length > 0
          )
        ) {
          this.addForm.queryShowType = "";
        }
      } else {
        this.addForm.queryShowType = "";
      }
    },
    pushQueryForm() {
      this.$emit("handQuery", JSON.parse(JSON.stringify(this.queryForm)));
    },
    handlePushAddForm() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.$emit("changeField", this.addForm.uuid, {
            queryShowType: this.addForm.queryShowType,
            queryConfigFlag: "Y",
            isQuery: "Y",
            queryMode:
              this.curAddFormDbType === "Date" && this.addForm.isRange
                ? "group"
                : "single"
          });
          this.handleAddClose();
        }
      });
    },
    handleAddClose() {
      this.$refs["addForm"].resetFields();
      this.dialogAddVisible = false;
    },
    listMove({ moved: e }) {
      if (e) {
        const { oldIndex, newIndex } = e;
        const list = JSON.parse(JSON.stringify(this.list));

        let trueIndex;
        if (newIndex > oldIndex) {
          trueIndex = list[newIndex - 1].oIndex;
        } else {
          trueIndex = list[newIndex + 1].oIndex;
        }

        this.$emit(
          "changeFieldItemQueryIndex",
          e.element.uuid,
          e.element.oIndex,
          trueIndex
        );
      }
    },

    addItem() {
      this.dialogAddVisible = true;
    },
    clearAll() {
      this.$emit("changeAllField", { queryConfigFlag: "N" });
    },
    resetQueryForm() {
      this.$refs["searchForm"].resetFields();
      this.pushQueryForm({});
    },
    getMenus() {
      return [
        { name: "新增搜索项", onClick: this.addItem },
        { name: "清空搜索项", onClick: this.clearAll }
      ];
    }
  },
  mixins: [component],
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    scope: "page", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "container", // 基础组件 base 高级组件 advanced 容器组件 container
    scopeList: [], // 可用组件列表
    options: {
      labelWidth: 100,
      style: ""
    }
  },
  editConfig: {}
};
</script>

<style scoped lang="scss">
::v-deep.preview-search {
  .is-design {
    .drag-item {
      padding: 0 !important;
      border: initial !important;
      position: relative;
      &:hover {
        background: initial !important;
        &:before {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          border: $border-dashed-minor;
        }
      }
    }
  }

  .drag-item {
    padding: 0 !important;
    border: initial !important;
    position: relative;
    &:hover {
      background: initial;
    }
  }
  .drag-move {
    top: 0 !important;
    left: 0 !important;
    height: 20px !important;
    width: 20px !important;
  }
  .item-delete {
    right: 0 !important;
    bottom: 0 !important;
    height: 20px !important;
    width: 20px !important;
  }
}

// 按钮样式（公共类）  来自cist系统
/* 有背景色 */
.public_bg_btn {
  border-color: #00a4e0 !important;
  background-color: #00a4e0 !important;
  color: #ffffff !important;
  .public_bg_btn span {
    font-size: 14px;
  }
}
.public_bg_btn:hover {
  border-color: #40d7db !important;
  background-color: #40d7db !important;
  color: #ffffff !important;
  box-shadow: 0 0 10px #ccc;
  .public_bg_btn span {
    font-size: 14px;
  }
}
/* 无背景色 */
.public_or_btn {
  border-color: #c8cdcf !important;
  background-color: rgba(0, 0, 0, 0) !important;
  color: #595959 !important;
  .public_or_btn span {
    font-size: 14px;
  }
}
.public_or_btn:hover {
  border-color: #c8cdcf !important;
  color: #595959 !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 10px #ccc;
  .public_or_btn span {
    font-size: 14px;
  }
}
.preview-search {
  box-sizing: border-box;
  background: white;
  padding: 18px 15px 0 15px;
  flex-shrink: 0;
  border-bottom: $border-table;
  position: relative;
  > .preview-search-tip {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: $font-size-small;
    color: red;
  }
  .search-edit {
    .search-edit-item {
      position: relative;
      user-select: none;
    }
  }
}
</style>
