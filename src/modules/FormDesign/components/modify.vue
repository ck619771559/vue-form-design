<template>
  <el-tabs class="modify trdcaqcagttdbrfuxmny" v-model="activeName" stretch>
    <el-tab-pane label="组件属性" name="one">
      <el-form
        class="modify-form"
        label-position="top"
        size="small"
        ref="itemform"
        v-if="curSelectItem"
      >
        <nameEdit
          v-if="curSelectItem.group !== 'container'"
          class="modify-item"
          is="vfd_singleLineInput"
          v-model="curSelectItem.name"
          :options="{ label: '字段名称' }"
        >
        </nameEdit>
        <template
          v-for="(item, key) in componentEditList[`vfd_${curSelectItem.type}`]"
        >
          <et
            v-if="componentListToNameList.indexOf(item.type) > -1"
            class="modify-item"
            :key="key"
            :is="`vfd_${item.type}`"
            :options="item.options"
            :editItem="curSelectItem"
            :value="
              key === 'value' ? curSelectItem.value : curSelectItem.options[key]
            "
            @change="
              (value) => {
                $emit('changeCurSelectItemChild', { key, value });
              }
            "
          ></et>
          <div v-else :key="key" class="modify-item error">
            该属性编辑组件无效
          </div>
        </template>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="two">
      <el-form
        :model="formJson"
        class="modify-form"
        label-position="top"
        size="small"
        ref="form"
      >
        <nameEdit
          v-if="!isNotTableName"
          class="modify-item"
          is="vfd_singleLineInput"
          :value="formJson.tableName"
          @change="changeTableName"
          :options="{
            label: '表单名称',
            max: 20,
            rules: [
              {
                type: 'required',
                msg: '',
              },
            ],
          }"
        >
        </nameEdit>

        <template v-for="(item, key) in formEditJson">
          <et
            :name="key"
            v-if="componentListToNameList.indexOf(item.type) > -1"
            class="modify-item"
            :key="key"
            :is="`vfd_${item.type}`"
            :options="item.options"
            :value="formJson[key]"
            @change="
              (value) => {
                $emit('updateFormJsonItem', { key, value });
              }
            "
          ></et>
          <div v-else :key="key" class="modify-item error">
            该属性编辑组件无效
          </div>
        </template>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="调试配置" name="three">
      <div class="tips">调试配置仅用于本次调试，不会影响实际使用</div>
      <el-form class="modify-form" label-position="top" size="small" ref="form">
        <template v-for="(item, key) in debugConfig">
          <et
            v-if="componentListToNameList.indexOf(item.type) > -1"
            class="modify-item"
            :key="key"
            :is="`vfd_${item.type}`"
            :options="item.options"
            v-model="debugConfigForm[key]"
          ></et>
          <div v-else :key="key" class="modify-item error">
            该属性编辑组件无效
          </div>
        </template>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { componentEditList, componentList } from "@/components";
import formEditJson from "@/config/formEditJson";
import { simulatorSizeNameSelectInput } from "@/config/simulatorSize";

export default {
  name: "modify",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      activeName: "one",
      debugConfig: {
        deviceTypes: {
          type: "radioGroup",
          options: {
            label: "设备类型",
            isButton: true,
            options: {
              showLabel: true,
              isRemote: false,
              list: [
                { value: "desktop", label: "桌面端" },
                { value: "mobile", label: "移动端" },
              ],
            },
          },
        },
        mobileTypes: {
          type: "selectInput",
          options: {
            label: "设备类型",
            options: {
              showLabel: false,
              isRemote: false,
              list: simulatorSizeNameSelectInput,
            },
          },
        },
      },
      componentEditList,
      formEditJson,
    };
  },
  props: {
    isNotTableName: {
      type: Boolean,
    },
    formJson: {
      type: Object,
    },
    curSelectItem: {},
    formListJson: {
      type: Array,
    },
    debugConfigForm: {
      type: Object,
    },
  },
  computed: {
    componentListToNameList() {
      return componentList.map((item) => item.type);
    },
  },
  methods: {
    changeTableName(value) {
      const x = String(value).replace(/[\W]/g, "");
      this.$emit("updateFormJsonItem", { key: "tableName", value: x });
    },
    log(_) {
      console.log(_);
    },
  },
  mounted() {
    console.log(this.curSelectItem);
  },
};
</script>

<style lang="scss" scoped>
.tips {
  font-size: $font-size-small;
  color: $font-color-label;
  padding: 20px 15px;
  border-bottom: $border-box;
}
</style>

<style lang="scss">
.trdcaqcagttdbrfuxmny {
  --modify-width: 300px;
  width: var(--modify-width);
  height: 100%;
  border: $border-box;
  box-sizing: border-box;
  .el-tabs__header {
    margin: 0 !important;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
    .el-tab-pane {
      height: 100%;
      overflow-y: auto;
    }
  }
  .modify-item {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: $border-box;
    &.error {
      color: red;
      font-size: $font-size-base;
    }
  }
}
.trdcaqcagttdbrfuxmny {
  .el-form--label-top .el-form-item__label {
    padding-bottom: 2px;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .modify-form {
  }
}
</style>
