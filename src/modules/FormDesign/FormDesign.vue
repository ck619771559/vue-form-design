<template>
  <div id="app">
    <assembly @updateItemToFormListJson="updateItemToFormListJson"></assembly>
    <preview
      ref="preview"
      :formListJson.sync="formListJson"
      :curSelectItem.sync="curSelectItem"
      :formJson.sync="formJson"
      :debugConfigForm="debugConfigForm"
      @clearData="clearData"
      @backAction="backAction"
      @redoAction="redoAction"
      @handleDeleteItem="handleDeleteItem"
      :errFormListByNull="errFormListByNull"
      :errFormListByRepeat="errFormListByRepeat"
      :saveLoading="saveLoading"
      @save="save"
    ></preview>
    <modify
      ref="modify"
      @changeCurSelectItemChild="changeCurSelectItemChild"
      :isNotTableName="isNotTableName"
      :formListJson="formListJson"
      :formJson="formJson"
      :curSelectItem.sync="curSelectItem"
      :debugConfigForm.sync="debugConfigForm"
      @updateFormJsonItem="updateFormJsonItem"
    ></modify>
  </div>
</template>
<script>
// components
import assembly from "./components/assembly";
import preview from "./components/preview";
import modify from "./components/modify";
import storage from "@/utils/storage";

import "@/assets/iconfont/iconfont.css";

export default {
  name: "FormDesign",
  components: {
    assembly,
    preview,
    modify
  },
  props: {
    isNotTableName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formListJson: [],
      formJson: {
        tableName: "",
        "label-width": 100,
        size: "small",
        "label-position": "right",
        style: ""
      },
      debugConfigForm: {
        deviceTypes: "desktop",
        mobileTypes: "iphone X"
      },
      curSelectItem: null, // 当前编辑对象
      skipWatch: false,
      saveLoading: false
    };
  },
  computed: {
    uuidNameList() {
      return this.getUUIDList(this.formListJson);
    },
    errFormListByNull() {
      const tempErrListNull = [];
      Object.entries(this.uuidNameList).forEach(item => {
        if (!item[1]) {
          tempErrListNull.push(item[0]);
        }
      });
      return tempErrListNull;
    },
    errFormListByRepeat() {
      const tempErrListRepeat = [];
      const tempValues = Object.values(this.uuidNameList);
      Object.entries(this.uuidNameList).forEach(item => {
        if (tempValues.filter(_ => _ === item[1]).length > 1) {
          tempErrListRepeat.push(item[0]);
        }
      });
      return tempErrListRepeat;
    }
  },
  watch: {
    formListJson() {
      if (!this.skipWatch) {
        this.addFormListJsonCache();
      }
      this.skipWatch = false;
    }
  },
  methods: {
    getUUIDList(json) {
      let temp = {};
      json.forEach(element => {
        if (element.group === "container") {
          element.options.list.forEach(ite => {
            temp = { ...temp, ...this.getUUIDList(ite.list) };
          });
        } else {
          temp[element.uuid] = element.name;
        }
      });
      return temp;
    },
    setDbField(json) {
      json.forEach(element => {
        if (element.group === "container") {
          element.options.list.forEach(ite => {
            this.setDbField(ite.list);
          });
        } else {
          element["dbField"] = {
            dbFieldName: element.name,
            dbFieldTxt: element.options.label,
            dbType: "varchar",
            dbLength: element.options.max ? element.options.max : 200
          };
        }
      });
    },
    save() {
      if (!this.isNotTableName && !this.formJson.tableName) {
        this.$message.error("表单名称未填写,请在右侧补填");
        this.$refs["modify"].activeName = "two";
        return;
      }

      if (
        this.errFormListByNull.length > 0 ||
        this.errFormListByRepeat.length > 0
      ) {
        this.$message.error("表单数据错误，请修改红框内容后重新保存。");
      } else {
        const tempformJson = JSON.parse(JSON.stringify(this.formJson));
        tempformJson["formTable"] = { tableName: tempformJson.tableName };
        const tempListJson = JSON.parse(JSON.stringify(this.formListJson));
        this.setDbField(tempListJson);
        this.$emit("save", {
          formJson: tempformJson,
          formListJson: tempListJson
        });
      }
    },
    updateItemToFormListJson(item) {
      this.formListJson.push(item);
    },
    deleteItem(json, uuid) {
      json.forEach((item, index) => {
        if (item.uuid === uuid) {
          json.splice(index, 1)[0];
        }
        if (item.group === "container") {
          item.options.list.forEach(_ => {
            this.deleteItem(_.list, uuid);
          });
        }
      });
    },
    handleDeleteItem(uuid) {
      this.deleteItem(this.formListJson, uuid);
      this.curSelectItem = null;
    },
    updateFormJsonItem(data) {
      const { key, value } = data;
      console.log(key,value);
      this.formJson[key] = value;
    },
    changeCurSelectItemChild(data) {
      const { key, value } = data;
      if (key === "value") {
        this.curSelectItem.value = value;
      } else {
        this.curSelectItem["options"] = {
          ...this.curSelectItem["options"],
          [key]: value
        };
      }
    },
    addFormListJsonCache() {
      let length = storage.ss.get("historyLength") + 1;
      const max = storage.ss.get("historyMax");
      if (!length) {
        length = 1;
      }
      storage.ss.set(`history_${length}`, this.formListJson);
      storage.ss.set("historyLength", length);
      storage.ss.set("historyMax", length);
      setTimeout(() => {
        let len = length + 1;
        while (len <= max) {
          storage.ss.remove(`history_${len}`);
          len++;
        }
      }, 0);
    },
    clearData() {
      const max = storage.ss.get("historyMax");
      storage.ss.remove("historyLength");
      storage.ss.remove("historyMax");
      let len = 1;
      while (len <= max) {
        storage.ss.remove(`history_${len}`);
        len++;
      }
      this.formListJson = [];
      this.curSelectItem = null;
    },
    backAction() {
      let length = storage.ss.get("historyLength") - 1;
      if (length > 0) {
        this.skipWatch = true;
        this.formListJson = storage.ss.get(`history_${length}`);
        storage.ss.set("historyLength", length);
        this.curSelectItem = null;
      } else if (Number(length) === 0) {
        this.skipWatch = true;
        this.formListJson = [];
        storage.ss.set("historyLength", length);
        this.curSelectItem = null;
      }
    },
    redoAction() {
      let length = storage.ss.get("historyLength") + 1;
      const max = storage.ss.get("historyMax");
      if (length <= max) {
        this.skipWatch = true;
        this.formListJson = storage.ss.get(`history_${length}`);
        storage.ss.set("historyLength", length);
        this.curSelectItem = null;
      }
    }
  },
  mounted() {
    document.onkeydown = e => {
      switch (e.key) {
        case "Delete":
          this.curSelectItem &&
            !this.$refs["preview"].dialogPreviewForm &&
            !this.$refs["preview"].dialogPreviewJson &&
            this.handleDeleteItem(this.curSelectItem.uuid);
          break;
        default:
          break;
      }
    };
  },
  created() {
    this.clearData();
    console.log(this.isNotTableName, "isNotTableName");
  },
  destroyed() {
    this.clearData();
    document.onkeydown = null;
  }
};
</script>

<style scoped lang="scss">
#app {
  @include flex-s-b(row);
  height: 100%;
}
</style>
