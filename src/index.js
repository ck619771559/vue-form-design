import { requireComponentFuc } from "./components";

import { GeneratePage, PageDesign } from "./modules/PageDesign";
import { GenerateForm, FormDesign } from "./modules/FormDesign";

import { requirePagesDesignFuc } from "./modules/PageDesign/pages/index";

const install = function(Vue) {
  requireComponentFuc(Vue);
  requirePagesDesignFuc(Vue);
  Vue.component(FormDesign.name, FormDesign);
  Vue.component(GenerateForm.name, GenerateForm);
  Vue.component(PageDesign.name, PageDesign);
  Vue.component(GeneratePage.name, GeneratePage);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
