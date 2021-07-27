<template>
  <div class="editor_wrap">
    <div v-if="isOpen" @click="isOpen = !isOpen" class="editor_mask"></div>
    <div class="editor" :class="{ action: isOpen }">
      <div
        class="open_btn"
        @mousedown="dropOpenEditor"
        @click="handleOpenEditor"
      ></div>
      <el-form
        class="modify-form"
        label-position="top"
        size="small"
        ref="item-edit"
        v-if="!isOpen"
      >
        <template v-if="curSelectItem">
          <template v-for="item in editItemArray[curSelectItem.editType]">
            <et
              v-if="componentListToNameList.indexOf(item.type) > -1"
              class="modify-item"
              :key="item.target"
              :is="`vfd_${item.type}`"
              :options="item.options"
              :editItem="curSelectItem"
              :value="
                item.source === 'value' ||
                curSelectItem.editType !== 'cistSearchItemEdit'
                  ? curSelectItem[item.source]
                  : curSelectItem.options[item.source]
              "
              @change="
                value => {
                  $emit('changeCurSelectItemChild', item, value);
                }
              "
            ></et>
          </template>
        </template>
      </el-form>
      <el-form
        v-show="isOpen"
        ref="full-edit"
        class="full-edit"
        label-position="right"
        label-width="110px"
        size="small"
        :model="tableJson"
      >
        <head-config :tableJson.sync="tableJson"></head-config>

        <el-tabs class="full-edit__table" v-model="activeName">
          <el-tab-pane label="数据库属性" name="first">
            <database-properties
              :fields="tableJson.fields"
              @update:fields="
                _ => {
                  $emit('update:tableJson', { ...this.tableJson, fields: _ });
                }
              "
              @handleAddItem="
                () => {
                  $emit('handleAddFieldsItem');
                }
              "
              @handleDeleteItems="
                items => {
                  $emit('handleDeleteFieldsItems', items);
                }
              "
            ></database-properties>
          </el-tab-pane>
          <el-tab-pane label="页面属性" name="second">
            <page-properties :fields="tableJson.fields"></page-properties>
          </el-tab-pane>
          <el-tab-pane label="校验字段" name="third">
            <verification-field :fields="tableJson.fields"></verification-field>
          </el-tab-pane>
          <el-tab-pane label="外键" name="fourth">
            <foreign-key :fields="tableJson.fields"></foreign-key>
          </el-tab-pane>
          <!--          <el-tab-pane label="索引" name="sy">-->
          <!--            <indexes></indexes>-->
          <!--          </el-tab-pane>-->
          <el-tab-pane label="查询配置" name="cxpz">
            <query-configuration
              @changeFieldItemQueryIndex="
                (uuid, oldIndex, newIndex) => {
                  $emit('changeFieldItemQueryIndex', uuid, oldIndex, newIndex);
                }
              "
              :fields="tableJson.fields"
            ></query-configuration>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
import { componentEditList, componentList } from "@/components";

import databaseProperties from "../components/tableConfig/databaseProperties";
import pageProperties from "../components/tableConfig/pageProperties";
import VerificationField from "../components/tableConfig/verificationField";
import ForeignKey from "../components/tableConfig/foreignKey";
import QueryConfiguration from "../components/tableConfig/queryConfiguration";
// import Indexes from "../components/tableConfig/indexes";
import HeadConfig from "../components/headConfig";

import { editItemArray } from "../adapter/cisiTable";

export default {
  name: "editor",
  props: ["tableJson", "curSelectItem"],
  components: {
    HeadConfig,
    // Indexes,
    QueryConfiguration,
    ForeignKey,
    VerificationField,
    databaseProperties,
    pageProperties
  },
  data() {
    return {
      editItemArray,
      isOpen: false,
      activeName: "first",
      componentEditList,
      mouseX: null,
      input: "",
      rules: {}
    };
  },
  methods: {
    test(_) {
      console.log(_);
    },
    handleTest() {
      this.$refs["full-edit"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOpenEditor() {
      this.isOpen = !this.isOpen;
    },
    dropOpenEditorEnd(e) {
      const x = e.clientX - this.mouseX;
      Math.abs(x) > 50 && (this.isOpen = x < 0);

      window.removeEventListener("mouseup", this.dropOpenEditorEnd);
    },

    dropOpenEditor(e) {
      this.mouseX = e.clientX;
      window.addEventListener("mouseup", this.dropOpenEditorEnd);
    }
  },

  created() {},
  computed: {
    componentListToNameList() {
      return componentList.map(item => item.type);
    }
  }
};
</script>

<style scoped lang="scss">
.editor_mask {
  position: absolute;
  z-index: 998;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
::v-deep.editor {
  border-top: $border-box;
  box-sizing: border-box;
  border-left: $border-box;
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background: #fff;
  /*transition: width 0.2s;*/
  user-select: none;
  .modify-form {
    height: 100%;
    overflow-y: auto;
    .modify-item {
      padding: 20px;
      box-sizing: border-box;
      border-bottom: $border-box;
      margin-bottom: 0 !important;
      position: relative;
      z-index: 1000;
      &.error {
        color: red;
        font-size: $font-size-base;
      }
    }
  }

  .open_btn {
    content: " ";
    border: $border-box;
    border-right-width: 0;
    box-sizing: border-box;
    height: 60px;
    width: 15px;
    position: absolute;
    top: 150px;
    left: -15px;
    background: #fff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &.action {
    width: 80%;
  }

  .full-edit {
    padding: 20px 80px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    .el-form-item {
      margin-bottom: 0 !important;
    }
    .full-edit__row {
      padding: 15px 0;
      border-bottom: $border-box;
      /*&:last-of-type {*/
      /*  border-bottom: none;*/
      /*}*/
    }
    .full-edit__table {
      margin-top: 20px;
      .full-edit__table__control {
        margin-bottom: 10px;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .el-form-item__error {
        @include tooltip;
        display: none;
      }
      .el-table .cell {
        overflow: initial !important;
      }
      .el-table__body-wrapper {
        overflow: initial !important;
      }
      .el-form-item__content {
        &:hover {
          .el-form-item__error {
            display: block;
          }
        }
      }
      .el-table {
        overflow: initial !important;
      }
    }
  }
}
</style>
