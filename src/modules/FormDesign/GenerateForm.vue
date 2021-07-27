<template>
  <el-form
    :style="json.formJson.style"
    class="generateForm"
    :label-position="json.formJson['label-position']"
    :label-width="`${json.formJson['label-width']}px`"
    :size="json.formJson.size"
    :model="formData"
    ref="ruleForm"
  >
    <template v-for="item in json.formListJson">
      <et
        v-if="componentListToNameList.indexOf(item.type) > -1"
        :key="item.uuid"
        :is="`vfd_${item.type}`"
        :options="item.options"
        :name="item.name"
        v-model="formData[item.name]"
        :formData="formData"
      ></et>
      <div v-else :key="item.uuid" class="form-item error">
        该组件无效
      </div>
    </template>
  </el-form>
</template>

<script>
import { componentList } from "@/components";

export default {
  name: "GenerateForm",
  data() {
    return {
      formData: {}
    };
  },
  props: {
    json: {
      type: Object
    }
  },
  computed: {
    componentListToNameList() {
      return componentList.map(item => item.type);
    }
  },
  created() {
    this.initJson(true);
  },

  methods: {
    getNameList(json) {
      let temp = {};
      json.forEach(element => {
        if (element.group === "container") {
          element.options.list.forEach(ite => {
            temp = { ...temp, ...this.getNameList(ite.list) };
          });
        } else {
          temp[element.name] = element.value;
        }
      });
      return temp;
    },
    initJson(init) {
      this.formData = this.getNameList(this.json.formListJson);
      !init && this.$refs["ruleForm"].clearValidate();
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            resolve(JSON.parse(JSON.stringify(this.formData)));
          } else {
            reject();
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
