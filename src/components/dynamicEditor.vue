<template>
  <el-form-item class="dynamicEditor" :label="fusionOptions.label">
    <div style="margin-bottom: 5px">
      <span class="label">显示标签</span>
      <el-switch
        style="margin-left: 10px;"
        v-model="value.showLabel"
        @change="handleChangeShowLabel"
      ></el-switch>
    </div>

    <el-radio-group v-model="value.isRemote">
      <el-radio-button :label="false">静态数据</el-radio-button>
      <el-radio-button disabled :label="true">动态数据</el-radio-button>
    </el-radio-group>
    <draggable
      style="margin-top: 10px"
      :list="value.list"
      v-bind="{
        group: { name: 'options' },
        ghostClass: 'ghost',
        handle: '.drag-item'
      }"
      handle=".drag-item"
    >
      <li
        class="dynamic-options"
        v-for="(item, index) in value.list"
        :key="index"
      >
        <el-input
          class="dynamic-options_item"
          size="mini"
          v-model="item.value"
          placeholder="值"
        ></el-input>
        <el-input
          v-if="value.showLabel"
          class="dynamic-options_item"
          size="mini"
          v-model="item.label"
          placeholder="选项名称"
        ></el-input>
        <div class="drag-item"><i class="el-icon-rank "></i></div>
        <div>
          <el-button
            class="dynamic-options_item"
            @click="handleOptionsRemove(index)"
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-minus"
          ></el-button>
        </div>
      </li>
    </draggable>
    <div v-if="errorTip" class="error-tip">值必须唯一</div>
    <el-button
      @click="handleOptionsAdd"
      class="dynamic-options_add"
      type="text"
      size="small"
      >添加选项</el-button
    >
  </el-form-item>
</template>

<script>
import component from "@/mixins/component.js";
import draggable from "vuedraggable";

const type = "dynamicEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  mixins: [component],
  components: { draggable },
  computed: {
    errorTip() {
      const list = this.value.list.map(_ => _.value);
      let hash = {};
      for (let i in list) {
        if (hash[list[i]]) {
          return true;
        }
        hash[list[i]] = true;
      }
      return false;
    }
  },
  data() {
    return {};
  },
  props: {
    value: {}
  },
  defaultConfig: {
    type: type,
    index: 0,
    scope: "edit", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "el-icon-edit",
    label: "动态自定义编辑器", // 并非组件配置的label
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {}
  },
  editConfig: {},
  methods: {
    handleChangeShowLabel() {
      this.$emit("change", {
        ...this.value,
        list: this.value.list.map(_ => ({ value: _.value, label: "" }))
      });
    },
    handleOptionsRemove(index) {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.splice(index, 1);
      this.$emit("change", { ...this.value, list: temp });
    },
    handleOptionsAdd() {
      let temp = JSON.parse(JSON.stringify(this.value.list));
      temp.push({
        label: `Option ${temp.length + 1}`,
        value: `Option ${temp.length + 1}`
      });
      this.$emit("change", { ...this.value, list: temp });
    }
  },
  mounted() {
    console.log(this.fusionOptions);
  }
};
</script>

<style scoped lang="scss">
.label {
  @include inline-label;
}
.dynamicEditor {
  .ghost {
    @include move-style();
  }
  .dynamic-options {
    @include flex-s-b(row);
    margin-top: 5px;
    &:first-child {
      margin-top: 0;
    }
  }
  .dynamic-options_item {
  }
  .drag-item {
    margin: 0 5px;
    font-size: 16px;
    color: $font-color-base;
    transition: color 0.2s;
    @include flex-c-c;
    &:hover {
      color: $font-color-select;
    }
  }
  .dynamic-options_add {
    margin-top: 5px;
  }
  .error-tip {
    font-size: $font-size-mini;
    color: red;
  }
}
</style>
