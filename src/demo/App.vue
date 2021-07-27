<template>
  <div class="demo">
    <div class="head">
      <div
        class="head-item"
        :class="action === 1 ? 'action' : ''"
        @click="action = 1"
      >
        表单生成器
      </div>
      <div
        class="head-item "
        :class="action === 0 ? 'action' : ''"
        @click="action = 0"
      >
        页面生成器
      </div>
    </div>
    <div class="content">
      <PageDesign v-if="action === 0"></PageDesign>
      <FormDesign v-else></FormDesign>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      action: 1
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.demo {
  height: 100%;
  @include flex-col();
  .head {
    flex-shrink: 0;
    height: 40px;
    @include flex-c-c();
    justify-content: flex-start;
    background: #f7f7f7;
    .head-item {
      @include btn-radio();
      &.action {
        @include btn-radio(true);
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
<style lang="css">
html,
body {
  height: 100%;
  width: 100%;
}
</style>
