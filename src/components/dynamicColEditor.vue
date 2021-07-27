<template>
  <el-form-item class="dynamicEditor" :label="fusionOptions.label">
    <draggable
      style="margin-top: 10px"
      :list="value.list"
      v-bind="{
        group: { name: 'options' },
        ghostClass: 'ghost',
        handle: '.drag-item',
      }"
      handle=".drag-item"
    >
      <div class="dynamic-options" v-for="(item, index) in value" :key="index">
        <div
          class="dynamic-options_input"
          v-if="!editItem.options.useResponsive"
        >
          <el-input-number
            size="mini"
            controls-position="right"
            :max="24"
            :min="0"
            v-model="item.col"
            placeholder="栅格值"
          ></el-input-number>
        </div>
        <div v-else class="dynamic-options_input">
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">xs:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.xs"
              placeholder="xs"
            ></el-input-number>
          </div>

          <div style="display:inline-block">
            <span class="dynamic-options_input_label">sm:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.sm"
              placeholder="sm"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">md:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.md"
              placeholder="md"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">lg:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.lg"
              placeholder="lg"
            ></el-input-number>
          </div>
          <div style="display:inline-block">
            <span class="dynamic-options_input_label">xl:</span>
            <el-input-number
              size="mini"
              controls-position="right"
              :max="24"
              :min="0"
              v-model="item.xl"
              placeholder="xl"
            ></el-input-number>
          </div>
        </div>

        <div class="drag-item"><i class="el-icon-rank "></i></div>
        <div style="display: inline-block">
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
      </div>
    </draggable>
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

const type = "dynamicColEditor"; // 组件名称

export default {
  name: type,
  enable: true,
  mixins: [component],
  components: { draggable },
  data() {
    return {};
  },
  watch: {
    "editItem.options.useResponsive": function(_) {
      let list = [];
      if (_) {
        if (this.value.length > 0) {
          this.value.forEach((ele) => {
            list.push({
              ...ele,
              xs: ele.col,
              sm: ele.col,
              md: ele.col,
              lg: ele.col,
              xl: ele.col,
            });
          });
        } else {
          list.push({
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            list: [],
          });
        }
      } else {
        if (this.value.length > 0) {
          this.value.forEach((ele) => {
            list.push({ col: ele.lg, list: ele.list });
          });
        } else {
          list.push({ col: 12, list: [] });
        }
      }
      this.changeValue(list);
    },
  },
  props: {
    value: {},
  },
  defaultConfig: {
    type: type,
    index: 0,
    scope: "edit", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "el-icon-edit",
    label: "动态自定义编辑器", // 并非组件配置的label
    group: "advanced", // 基础组件 base 高级组件 advanced 容器组件 container
    value: "", // 如果没有props 使用此值作为默认值
    options: {},
  },
  editConfig: {},
  methods: {
    handleOptionsRemove(index) {
      let temp = JSON.parse(JSON.stringify(this.value));
      temp.splice(index, 1);
      this.$emit("change", temp);
    },
    handleOptionsAdd() {
      let temp = JSON.parse(JSON.stringify(this.value));
      temp.push({ col: 12, list: [] });
      this.$emit("change", temp);
    },
  },
  mounted() {
    console.log(this.editItem);
  },
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
    border:$border-dashed-minor;
    padding: 2px 5px;
    margin-top: 5px;
    &:first-child {
      margin-top: 0;
    }
  }
  .dynamic-options_input {
  
    display: inline-block;
    width: 166px;
    vertical-align: top;
    .dynamic-options_input_label {
      width: 30px;
      @include inline-label();
    }
  }
  .drag-item {
    margin: 0 5px;
    font-size: 16px;
    color: $font-color-base;
    transition: color 0.2s;
    @include flex-c-c(inline-flex);
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
