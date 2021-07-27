<template>
  <div class="page-design">
    <design
      ref="design"
      :saveLoading="saveLoading"
      :tableJson.sync="tableJson"
      :curSelectItem="curSelectItem"
      @updateCurSelectItem="updateCurSelectItem"
      @changeFieldItemQueryIndex="changeFieldItemQueryIndex"
      @handleDeleteQueryItem="handleDeleteQueryItem"
      @changeField="changeField"
      @changeAllField="changeAllField"
      @changeHeadItem="changeHeadItem"
      @openFullEditor="openFullEditor"
      @handleAddField="handleAddField"
      @resetTable="resetTable"
      @handleSave="handleSave"
      class="design"
    ></design>

    <editor
      ref="editor"
      :tableJson.sync="tableJson"
      :curSelectItem="curSelectItem"
      @changeCurSelectItemChild="changeCurSelectItemChild"
      @changeFieldItemQueryIndex="changeFieldItemQueryIndex"
      @handleAddFieldsItem="handleAddFieldsItem"
      @handleDeleteFieldsItems="handleDeleteFieldsItems"
    ></editor>
  </div>
</template>

<script>
import design from "./container/design";
import editor from "./container/editor";
import { uuid } from "../../utils/uuid";
import { defaultField, defaultTableJson } from "../../config/tableFormDict";

export default {
  name: "PageDesign",
  components: { design, editor },
  data() {
    return {
      saveLoading: false,
      tableJson: JSON.parse(JSON.stringify(defaultTableJson)),
      curSelectItem: null // 当前编辑对象
    };
  },
  methods: {
    handleSave() {
      this.$refs["editor"].$refs["full-edit"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.$emit("handleSave", this.tableJson);
        } else {
          this.$refs["editor"].isOpen = true;
          console.log("error submit!!");
          this.$message.error("请修改编辑器内所有错误");
          return false;
        }
      });
    },
    resetTable() {
      this.tableJson = JSON.parse(JSON.stringify(defaultTableJson));
      this.curSelectItem = null;
    },
    handleAddField(item) {
      this.tableJson.fields.push({
        ...defaultField,
        ...item,
        order_num: this.tableJson.fields.length,
        queryOrderNum: this.tableJson.fields.length,
        orderNum: this.tableJson.fields.length + 1,
        uuid: uuid()
      });
    },

    handleDeleteFieldsItems(items) {
      this.tableJson.fields = this.tableJson.fields.filter(
        _ => !items.includes(_.uuid)
      );
    },
    handleAddFieldsItem() {
      this.tableJson.fields.push({
        ...defaultField,
        order_num: this.tableJson.fields.length,
        queryOrderNum: this.tableJson.fields.length,
        orderNum: this.tableJson.fields.length + 1,
        uuid: uuid()
      });
    },
    openFullEditor() {
      this.$refs["editor"].isOpen = true;
    },
    changeHeadItem(name, value) {
      this.tableJson.head[name] = value;
    },
    changeCurSelectItemChild(item, value) {
      const cur = this.tableJson.fields.filter(
        _ => _.uuid === this.curSelectItem.uuid
      )[0];

      switch (item.target) {
        case "queryLabelWidth":
          value.checked
            ? (cur[item.target] = value.width)
            : (cur[item.target] = null);
          break;
        default:
          cur[item.target] = value;
          break;
      }

      if (
        item.source === "value" ||
        this.curSelectItem.editType !== "cistSearchItemEdit"
      ) {
        this.curSelectItem[item.source] = value;
      } else {
        this.curSelectItem["options"][item.source] = value;
        console.log(this.curSelectItem);
      }
    },
    handleDeleteQueryItem(uuid) {
      this.tableJson.fields.filter(
        _ => _.uuid === uuid
      )[0].queryConfigFlag = false;
    },
    updateCurSelectItem(_) {
      this.curSelectItem = _;
    },
    changeFieldItemQueryIndex(uuid, oldIndex, newIndex) {
      console.log(newIndex, oldIndex);
      this.tableJson.fields.forEach(_ => {
        if (_.uuid === uuid) {
          _.queryOrderNum = newIndex;
        } else {
          if (newIndex > oldIndex) {
            if (_.queryOrderNum > oldIndex && _.queryOrderNum <= newIndex) {
              _.queryOrderNum--;
            }
          } else {
            if (_.queryOrderNum < oldIndex && _.queryOrderNum >= newIndex) {
              _.queryOrderNum++;
            }
          }
        }
      });
      this.tableJson = JSON.parse(JSON.stringify(this.tableJson));
    },
    changeField(uuid, values) {
      let _ = this.tableJson.fields.filter(_ => _.uuid === uuid)[0];
      for (let item of Object.entries(values)) {
        _[item[0]] = item[1];
      }
    },
    changeAllField(values) {
      this.tableJson.fields.forEach(_ => {
        if (_.dbFieldName !== "id") {
          for (let item of Object.entries(values)) {
            _[item[0]] = item[1];
          }
        }
      });
      this.curSelectItem = null;
    }
  },
  mounted() {
    document.onkeydown = e => {
      if (!this.$refs["editor"].isOpen) {
        switch (e.key) {
          case "e":
            this.$refs["editor"].isOpen = true;
            break;
          case "h":
            !this.$refs["design"].dialogFormEditVisible &&
              (this.$refs["design"].dialogHelpVisible = !this.$refs["design"]
                .dialogHelpVisible);
            break;
          case "f":
            !this.$refs["design"].dialogHelpVisible &&
              (this.$refs["design"].dialogFormEditVisible = !this.$refs[
                "design"
              ].dialogFormEditVisible);
            break;
          default:
            break;
        }
      }
    };
  },
  created() {},
  destroyed() {
    document.onkeydown = null;
  }
};
</script>

<style scoped lang="scss">
.page-design {
  height: 100%;
  width: 100%;
  position: relative;
  .design {
    margin-right: 300px;
  }
}
</style>
