<template>
  <GenerateForm :json="{ ...json, formListJson: list }"></GenerateForm>
</template>

<script>
import { cistTableFormToJson } from "../adapter/cisiTable";

export default {
  name: "formPreview",
  props: ["fields"],
  computed: {
    list() {
      return cistTableFormToJson(this.fields);
    }
  },
  data() {
    return {
      json: {
        formJson: {
          tableName: "",
          "label-width": 100,
          size: "small",
          "label-position": "right",
          style: ""
        },
        formListJson: []
      }
    };
  },
  methods: {},
  mounted() {
    console.log(this.fields);
  }
};
</script>

<style scoped></style>
