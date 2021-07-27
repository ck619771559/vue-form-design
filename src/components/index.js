// 自动化加载组件
// author: ekxs
// date: 2020年5月17日22点00分

// 组件

let inited = false;

let componentInstanceList = []; // 组件实例列表
let componentList = []; //组件数据列表
let componentEditList = {}; // 组件编辑器数据列表
if (!inited) {
  inited = true;
  const requireComponent = require.context("@/components/", true, /\.(vue)$/);
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const ctrl = componentConfig.default || componentConfig;
    if (!ctrl.enable) return;

    componentInstanceList.push(ctrl);
    componentList.push(ctrl.defaultConfig);
    !componentEditList[`vfd_${ctrl.name}`]
      ? (componentEditList[`vfd_${ctrl.name}`] = ctrl.editConfig)
      : console.error(`组件 vfd_${ctrl.name} 重复，请修改`);
  });
  componentList.sort((x, y) => x.index - y.index);
  console.info("Auto initialize component completed");
}
const requireComponentFuc = Vue => {
  componentInstanceList.forEach(ctrl => {
    Vue.component(`vfd_${ctrl.name}`, ctrl);
  });
};

export { componentEditList, componentList, requireComponentFuc };
