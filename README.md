# vue-form-design


基于 Vue element 的表单设计工具

**预览地址：http://192.168.0.193:3000/**

# 使用指南
1. 为尽可能减小组件大小，组件不包含其他大型组件。故需在正式项目中引入element与VueQuillEditor 
2. 使用npm install git+项目地址#tag版本号 --save
3. 在项目的入口文件中引入该组件
```js
import vueFormDesign from "vue-form-design";
Vue.use(vueFormDesign);
```

# 注意事项
1. 生成器与设计器传入参数后将不会监听json，如果使用dialog可以使用destroy-on-close参数。其他页面中如果需要更新，请先删除实例再生成。
