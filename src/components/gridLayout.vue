<template>
  <el-row
    :style="fusionOptions.style"
    style="z-index: 4"
    :type="fusionOptions.useFlex ? 'flex' : undefined"
    :justify="fusionOptions.justify"
    :align="fusionOptions.align"
  >
    <el-col
      :key="index"
      v-for="(item, index) in fusionOptions.list"
      :span="!fusionOptions.useResponsive ? item.col : undefined"
      :xs="fusionOptions.useResponsive ? item.xs : undefined"
      :sm="fusionOptions.useResponsive ? item.sm : undefined"
      :md="fusionOptions.useResponsive ? item.md : undefined"
      :lg="fusionOptions.useResponsive ? item.lg : undefined"
      :xl="fusionOptions.useResponsive ? item.xl : undefined"
    >
      <draggable
        v-if="isPreview"
        class="widget-col-list"
        :list="item.list"
        group="formDesign"
        ghostClass="ghost"
        handle=".drag-move"
        :animation="200"
      >
        <transition-group
          :style="item.list.length === 0 ? 'min-height:100px' : ''"
          class="warp-drag-item"
          name="fade"
          tag="div"
        >
          <widget
            :key="ite.uuid"
            v-for="ite in item.list"
            :item="ite"
            :errFormListByNull="errFormListByNull"
            :errFormListByRepeat="errFormListByRepeat"
            :curSelectItem="curSelectItem"
            @updateCurSelectItem="
              it => {
                $emit('updateCurSelectItem', it);
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

      <template v-else>
        <template v-for="ite in item.list">
          <et
            :is="`vfd_${ite.type}`"
            :options="ite.options"
            v-model="formData[ite.name]"
            :formData="formData"
            :name="ite.name"
            :key="ite.uuid"
          >
          </et>
        </template>
      </template>
    </el-col>
  </el-row>
</template>

<script>
// 组件通用代码抽离放入mixin
// 虽然mixin官方已经不推荐了，但是在vue3 来临前依然是高效开发的神器
import component from "@/mixins/component.js";
import draggable from "vuedraggable";
import widget from "@/modules/FormDesign/components/widget";
const type = "gridLayout"; // 组件名称

export default {
  name: type,
  enable: true, // 启用否
  components: {
    draggable,
    widget
  },
  mixins: [component],
  data() {
    return {};
  },
  methods: {
    handleAdd(e) {
      console.log(e);
    },
    log(_) {
      console.log(_);
    }
  },

  props: {
    curSelectItem: {},
    formData: {},
    errFormListByRepeat: {
      type: Array
    },
    errFormListByNull: {
      type: Array
    }
  },

  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    index: 0,
    scope: "form", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    icon: "icon-fenlan",
    label: "栅格", // 并非组件配置的label
    group: "container", // 基础组件 base 高级组件 advanced 容器组件 container
    options: {
      label: "栅格", // 对应editConfig ，如果不存在 便不可编辑
      gutter: 0, // 间隔
      useFlex: true, // 使用flex布局
      useResponsive: false, // 使用响应式设计
      justify: "start",
      align: "top",
      style: "",
      list: [
        {
          col: 12,
          list: []
        },
        { col: 12, list: [] }
      ]
    }
  },
  editConfig: {
    gutter: {
      type: "counterInput",
      options: {
        label: "栅格间隔"
      }
    },
    useFlex: {
      type: "switchInput",
      options: {
        label: "使用Flex布局"
      }
    },
    useResponsive: {
      type: "switchInput",
      options: {
        label: "使用响应式布局"
      }
    },
    list: {
      type: "dynamicColEditor",
      options: {}
    },
    justify: {
      type: "selectInput",
      options: {
        label: "水平排列方式",
        options: {
          showLabel: true,
          isRemote: false,
          list: [
            { value: "start", label: "开始位置" },
            { value: "end", label: "结束位置" },
            { value: "center", label: "水平居中" },
            { value: "space-between", label: "两端分布" },
            { value: "space-around", label: "两端分布但有两端有间隔" }
          ]
        }
      }
    },
    align: {
      type: "selectInput",
      options: {
        label: "垂直排列方式",
        options: {
          showLabel: true,
          isRemote: false,
          list: [
            { value: "top", label: "顶部" },
            { value: "middle", label: "水平居中" },
            { value: "bottom", label: "底部" }
          ]
        }
      }
    },
    style: {
      type: "multiLineInput",
      options: {
        label: "自定义样式"
      }
    }
  }
};
</script>

<style scoped lang="scss">
.widget-col-list {
  border: $border-dashed-minor;
  padding: 3px;
  position: relative;
  margin: 1px 0;
}
.warp-drag-item {
  height: 100%;
}
</style>
