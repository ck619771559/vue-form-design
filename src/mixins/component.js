import rulesDict from "@/config/rulesDict.js";
export default {
  data() {
    return {
      fusionOptions: {}
    };
  },
  computed: {
    rules() {
      let tempList = [];
      if (this.fusionOptions.rules) {
        this.fusionOptions.rules.forEach(element => {
          switch (element.type) {
            case "required":
              tempList.push({
                required: true,
                message: element.msg ? element.msg : "该字段必填"
              });
              break;
            case "preinstall":
              tempList.push({
                required: false,
                type: element.rule,
                message: element.msg
                  ? element.msg
                  : `该字段必须为${
                      rulesDict.find(_ => _.value === element.rule).label
                    }`
              });
              break;
            default:
              break;
          }
        });
      }
      return tempList;
    },
    preinstall() {
      if (this.fusionOptions.rules) {
        return this.fusionOptions.rules.find(_ => _.type === "preinstall");
      } else {
        return null;
      }
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    name: {
      type: String
    },
    editItem: {
      type: Object
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    options(_) {
      this.fusionOptions = {
        ...this.$options.defaultConfig.options,
        ..._
      };
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    changeValue(_) {
      if (this.preinstall) {
        switch (this.preinstall.rule) {
          case "float":
          case "integer":
          case "number":
            if (_[_.length - 1] === ".") {
              // 笨办法排除输入小数点
              this.$emit("change", _);
            } else {
              this.$emit("change", Number(_) ? parseFloat(_) : _);
            }
            break;
          default:
            this.$emit("change", _);
            break;
        }
      } else {
        this.$emit("change", _);
      }
    }
  },
  created() {
    this.fusionOptions = {
      ...this.$options.defaultConfig.options,
      ...this.options
    };
  }
};
