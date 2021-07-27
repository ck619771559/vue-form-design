import Vue from "vue";
import "reset-css";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";

// 富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
Vue.use(VueQuillEditor /* { default global options } */);

Vue.config.productionTip = false;

import ElementUI from "element-ui";

Vue.use(ElementUI);

// 引入 vue-form-desgin
// import vueFormDesign from "vue-form-design";
import vueFormDesign from "../index";
Vue.use(vueFormDesign);

new Vue({
  render: h => h(App)
}).$mount("#app");
