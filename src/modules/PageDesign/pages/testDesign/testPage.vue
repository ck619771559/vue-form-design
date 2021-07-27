<template>
  <div class="test">这是测试页面</div>
</template>

<script>
import component from "@/mixins/component.js";
const type = "testPage"; // 组件名称
export default {
  name: type,
  mixins: [component],
  defaultConfig: {
    // 组件配置json 将有组件目录index自动注册
    type: type,
    scope: "page", // 可用范围 通用组件 common  表单组件 form  编辑器组件  edit  这个type在注册的时候分辨类型
    group: "container", // 基础组件 base 高级组件 advanced 容器组件 container
    options: {
      labelWidth: 100,
      style: "",
      list: [{ col: 6, item: null }]
    }
  }
};
</script>

<style scoped lang="scss">
.test {
  height: 100%;
  width: 100%;
  @include flex-c-c();
  color: #fff;
  font-size: $font-size-big;
  font-weight: bold;
  background: #333333;
}
</style>
