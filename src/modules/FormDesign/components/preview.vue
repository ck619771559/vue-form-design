<template>
  <div class="preview__wrap">
    <div class="action-bar">
      <el-button
        @click="
          () => {
            $emit('backAction');
          }
        "
        icon="el-icon-back"
        type="info"
        size="mini"
        >撤销</el-button
      >
      <el-button
        @click="
          () => {
            $emit('redoAction');
          }
        "
        icon="el-icon-right"
        type="info"
        size="mini"
        >重做</el-button
      >
      <el-button
        type="primary"
        @click="
          () => {
            $emit('save');
          }
        "
        size="mini"
        :loading="saveLoading"
        >保存</el-button
      >
      <el-button
        type="success"
        @click="dialogPreviewJson = !dialogPreviewJson"
        size="mini"
        >JSON</el-button
      >
      <el-button
        type="info"
        style="background: rgba(40, 173, 204, 0.9);border-color: rgba(40, 173, 204, 0.9)"
        @click="handlePreviewForm"
        size="mini"
        >预览</el-button
      >
      <el-button
        type="danger"
        @click="
          () => {
            $emit('clearData');
          }
        "
        size="mini"
        >清空</el-button
      >
    </div>
    <simulator
      class="preview"
      :mobileTypes="debugConfigForm.mobileTypes"
      :is="debugConfigForm.deviceTypes === 'mobile' ? 'simulator' : 'div'"
    >
      <el-form
        class="preview-form"
        ref="form"
        :label-width="`${String(formJson['label-width'])}px`"
        :size="formJson['size']"
        :style="formJson.style"
        :label-position="formJson['label-position']"
      >
        <draggable
          class="drag-area"
          :class="debugConfigForm.deviceTypes === 'mobile' ? 'simulator' : ''"
          :list="formListJson"
          group="formDesign"
          ghostClass="ghost"
          handle=".drag-move"
          :animation="200"
        >
          <transition-group class="warp-drag-item" name="fade" tag="div">
            <widget
              :key="item.uuid"
              v-for="item in formListJson"
              :item="item"
              :curSelectItem="curSelectItem"
              :errFormListByNull="errFormListByNull"
              :errFormListByRepeat="errFormListByRepeat"
              @updateCurSelectItem="
                item => {
                  $emit('update:curSelectItem', item);
                }
              "
              @handleDeleteItem="
                uuid => {
                  $emit('handleDeleteItem', uuid);
                }
              "
            ></widget>
          </transition-group>
        </draggable>
      </el-form>
    </simulator>

    <el-dialog
      append-to-body
      title="JSON预览"
      :visible.sync="dialogPreviewJson"
    >
      <json-viewer
        boxed
        copyable
        :expand-depth="3"
        :value="{ formJson, formListJson }"
      ></json-viewer>
    </el-dialog>

    <el-dialog append-to-body title="JSON预览" :visible.sync="dialogGetJson">
      <json-viewer
        boxed
        copyable
        :expand-depth="3"
        :value="getJson"
      ></json-viewer>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      title="表单生成预览"
      :visible.sync="dialogPreviewForm"
    >
      <GenerateForm
        v-if="dialogPreviewForm"
        ref="generateForm"
        :json="{ formJson, formListJson }"
      ></GenerateForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickResetForm">重置表单</el-button>
        <el-button type="primary" @click="handleClickPush"
          >获取填写数据</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import JsonViewer from "vue-json-viewer";
import widget from "./widget";
import simulator from "./simulator";

export default {
  name: "preview",
  components: {
    draggable,
    JsonViewer,
    widget,
    simulator
  },
  props: {
    formJson: {
      type: Object
    },
    curSelectItem: {
      type: Object
    },
    formListJson: {
      type: Array
    },
    debugConfigForm: {
      type: Object
    },
    errFormListByRepeat: {
      type: Array
    },
    errFormListByNull: {
      type: Array
    },
    saveLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogPreviewJson: false,
      dialogPreviewForm: false,
      dialogGetJson: false,
      getJson: {}
    };
  },
  methods: {
    handlePreviewForm() {
      if (
        this.errFormListByNull.length > 0 ||
        this.errFormListByRepeat.length > 0
      ) {
        this.$message.error("表单数据错误，请修改红框内容后重新点击预览。");
      } else {
        this.dialogPreviewForm = !this.dialogPreviewForm;
      }
    },
    handleClickResetForm() {
      this.$refs["generateForm"].initJson();
    },
    handleClickPush() {
      this.$refs["generateForm"].getData().then(_ => {
        this.dialogGetJson = true;
        this.getJson = _;
      });
    },
    updateData() {
      console.log(123);
    },
    log(e) {
      console.info(e);
    }
  }
};
</script>

<style scoped lang="scss">
.warp-drag-item {
  flex: 1;
}
.preview__wrap {
  --action-bar-height: 39px; //操作类高度;
  height: 100%;
  position: relative;
  flex: 1;
  background: #fff;
  @include flex-col;
}

.action-bar {
  height: var(--action-bar-height);
  border-bottom: $border-box;
  border-top: $border-box;
  text-align: right;
  padding-right: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.preview {
  flex: 1;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
  //@include hide-scrollbar;
  .preview-form {
    height: 100%;
  }

  .drag-area {
    display: flex;
    border: $border-dashed-base;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
    min-height: 100%;
    margin-bottom: 10px;
    &.simulator {
      margin-bottom: 0;
      overflow-x: hidden;
    }
    .ghost {
      @include move-style();
    }
  }
}
</style>

<style scoped>
/deep/ .preview .w-e-menu {
  z-index: 1 !important;
}
/deep/ .preview .w-e-text-container {
  z-index: 1 !important;
}
/deep/ .preview .el-slider__button-wrapper {
  z-index: 1 !important;
}
</style>

<style>
.disabled-enter-active,
.disabled-leave-active {
  transition: none !Important;
}
</style>
