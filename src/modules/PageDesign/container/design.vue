<template>
  <div class="design">
    <div class="control-bar">
      <div class="control-bar_left">
        <el-select
          size="mini"
          v-model="tableJson.head.themeTemplate"
          style="margin-left: 10px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in pagesDesign"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="control-bar_right">
        <el-button
          @click="
            () => {
              $emit('handleSave');
            }
          "
          :loading="saveLoading"
          size="mini"
          type="primary"
          >保存</el-button
        >
        <el-button
          @click="dialogPreviewPage = true"
          size="mini"
          type="primary"
          style="    background: rgba(40, 173, 204, 0.9);
    border-color: rgba(40, 173, 204, 0.9);"
          >预览</el-button
        >
        <el-button @click="dialogPreviewJson = true" size="mini" type="success"
          >JSON</el-button
        >

        <el-button
          @click="
            () => {
              $emit('resetTable');
            }
          "
          size="mini"
          type="danger"
          >重置</el-button
        >
      </div>
    </div>
    <div class="preview">
      <div class="preview-content" v-contextmenu:contextmenu>
        <template v-for="item in curPage.design">
          <hello
            :isDesign="true"
            :options="item.options"
            :fields="tableJson.fields"
            :head="tableJson.head"
            :curSelectItem="curSelectItem"
            :key="item.type"
            :is="`dd_${item.type}`"
            v-contextmenu:contextmenu
            @updateCurSelectItem="
              ite => {
                $emit('updateCurSelectItem', ite);
              }
            "
            @handleDeleteQueryItem="
              uuid => {
                $emit('handleDeleteQueryItem', uuid);
              }
            "
            @changeFieldItemQueryIndex="
              (uuid, oldIndex, newIndex) => {
                $emit('changeFieldItemQueryIndex', uuid, oldIndex, newIndex);
              }
            "
            @changeField="
              (uuid, values) => {
                $emit('changeField', uuid, values);
              }
            "
            @changeAllField="
              values => {
                $emit('changeAllField', values);
              }
            "
            @changeHeadItem="
              (name, data) => {
                $emit('changeHeadItem', name, data);
              }
            "
            @update:fields="
              _ => {
                $emit('update:tableJson', { ...tableJson, fields: _ });
              }
            "
            @handleAddField="
              _ => {
                $emit('handleAddField', _);
              }
            "
          ></hello>
        </template>
      </div>
    </div>

    <contextmenu
      ref="contextmenu"
      theme="default"
      @contextmenu="handleContextmenu"
      style="user-select: none"
    >
      <template v-for="(item, index) in menuData">
        <contextmenu-item
          :key="index"
          v-if="!item.childList"
          :divider="item.divider"
          :disabled="item.disabled"
          :autoHide="item.autoHide"
          @click="
            () => {
              item.onClick && item.onClick();
            }
          "
          >{{ item.name }}</contextmenu-item
        >
        <contextmenu-submenu :key="index" v-else :title="item.name">
          <contextmenu-item
            :divider="ite.divider"
            :disabled="ite.disabled"
            :autoHide="ite.autoHide"
            @click="
              () => {
                ite.onClick && ite.onClick();
              }
            "
            v-for="(ite, ind) in item.childList"
            :key="ind"
            ><span style="padding: 0 10px">{{ ite.name }}</span>
          </contextmenu-item>
        </contextmenu-submenu>
      </template>
    </contextmenu>

    <el-dialog
      :close-on-click-modal="false"
      title="帮助说明"
      :visible.sync="dialogHelpVisible"
      width="30%"
    >
      <div>
        测试文案
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="帮助说明"
      :visible.sync="dialogHelpVisible"
      width="30%"
    >
      <div>
        测试文案
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="表单设计"
      :visible.sync="dialogFormEditVisible"
      width="30%"
      class="vue-form-design__formDesignDialog"
    >
      <formEdit
        @changeField="
          (uuid, values) => {
            $emit('changeField', uuid, values);
          }
        "
        :fields="tableJson.fields"
        v-contextmenu:contextmenu
      >
      </formEdit>
    </el-dialog>

    <el-dialog
      append-to-body
      title="JSON预览"
      :visible.sync="dialogPreviewJson"
      destroy-on-close
    >
      <json-viewer
        boxed
        copyable
        :expand-depth="2"
        :value="tableJson"
      ></json-viewer>
    </el-dialog>

    <el-dialog
      append-to-body
      title="表单预览"
      width="600px"
      :visible.sync="dialogPreviewForm"
      destroy-on-close
    >
      <formPreview v-if="dialogPreviewForm" :fields="tableJson.fields">
      </formPreview>
    </el-dialog>

    <el-dialog
      append-to-body
      width="80%"
      title="列表预览"
      :visible.sync="dialogPreviewPage"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <GeneratePage
        v-if="dialogPreviewPage"
        :tableJson="tableJson"
        :isPreview="true"
      ></GeneratePage>
    </el-dialog>
  </div>
</template>

<script>
import "v-contextmenu/dist/index.css";
import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu
} from "v-contextmenu";
import { pagesDesign } from "../pages";
import formEdit from "../components/formEdit";
import formPreview from "../components/formPreview";
import JsonViewer from "vue-json-viewer";
export default {
  name: "design",
  directives: {
    contextmenu: directive
  },
  props: ["tableJson", "curSelectItem", "saveLoading"],
  data() {
    return {
      dialogPreviewPage: false,
      dialogPreviewForm: false,
      dialogPreviewJson: false,
      dialogHelpVisible: false,
      dialogFormEditVisible: false,
      menuData: [],
      pagesDesign
    };
  },
  computed: {
    curPage() {
      return this.pagesDesign.filter(
        _ => _.value === this.tableJson.head.themeTemplate
      )[0];
    }
  },
  components: {
    Contextmenu,
    ContextmenuItem,
    ContextmenuSubmenu,
    formEdit,
    JsonViewer,
    formPreview
  },
  methods: {
    test(e, x) {
      console.log(e, x);
    },
    handleContextmenu(_) {
      const temp = _.componentInstance ? _.componentInstance.getMenus() : [];
      if (temp.length > 1) {
        temp.push({ name: "分割线", divider: true });
      }
      if (this.curSelectItem) {
        temp.push({
          name: "取消选择",
          onClick: () => {
            this.$emit("updateCurSelectItem", null);
          }
        });
      }
      this.menuData = [
        ...temp,
        {
          name: "打开表单编辑(f)",
          onClick: () => {
            this.dialogFormEditVisible = true;
          }
        },
        {
          name: "打开编辑器(e)",
          onClick: () => {
            this.$emit("openFullEditor");
          }
        },
        {
          name: "帮助(h)",
          onClick: () => {
            this.dialogHelpVisible = true;
          }
        }
      ];
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep.design {
  .search-edit-item {
    .el-form-item {
      margin-bottom: 18px;
    }
  }
  .drag-item {
    background: initial;
  }
}
.form-edit-tip {
  font-size: $font-size-small;
  color: red;
  margin: 0 0 10px 0;
}

.design {
  flex: 1;
  @include flex-col();
  height: 100%;
  box-sizing: border-box;

  .edit-item__cover {
    content: " ";
    @include abs-cover;
    z-index: 100;
    &:hover {
      &:before {
        content: " ";
        @include abs-cover;
        box-sizing: border-box;
        border: $border-dashed-base;
      }
    }
  }

  .control-bar {
    @include flex-s-b-c(row);
    padding-right: 15px;
    height: 40px;
    flex-shrink: 0;
    background: #fff;
    box-sizing: border-box;
    border-top: $border-box;
    border-bottom: $border-box;
  }
  .preview {
    background: #f3f3f5;
    padding: 15px;
    height: 100%;
    @include flex-col();

    .preview-content {
      flex: 1;
      background-color: #fff;
      position: relative;
    }
  }
}
</style>

<style lang="scss">
.vue-form-design__formDesignDialog {
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>
