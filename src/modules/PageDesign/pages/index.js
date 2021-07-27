import { cistTableList } from "./cistTableDesign/";
import { testDesign } from "./testDesign";

let inited = false;
let pagesDesign;
if (!inited) {
  inited = true;
  pagesDesign = [
    {
      label: "列表-统一平台",
      value: "cistTable",
      design: cistTableList.map(_ => _.defaultConfig)
    }
  ];
}
const requirePagesDesignFuc = Vue => {
  [...cistTableList, ...testDesign].forEach(ctrl => {
    Vue.component(`dd_${ctrl.name}`, ctrl);
  });
};

export { requirePagesDesignFuc, pagesDesign };
