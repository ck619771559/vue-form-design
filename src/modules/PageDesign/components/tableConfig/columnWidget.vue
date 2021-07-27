<template>
  <el-table-column
    :resizable="false"
    :prop="item.model"
    :label="item.label"
    :width="item.width ? item.width : 'auto'"
    :align="item.align ? item.align : 'left'"
  >
    <template slot-scope="scope">
      <el-form-item
        :prop="`fields[${scope.$index}][${item.model}]`"
        :rules="
          item.rules
            ? item.rules
            : item.require
            ? [
                {
                  required: true,
                  message: `请输入${item.label}`,
                  trigger: 'change'
                }
              ]
            : undefined
        "
      >
        <el-checkbox
          v-if="item.type === 'checkbox'"
          false-label="N"
          true-label="Y"
          :disabled="
            scope.row.isRequired ? scope.row.isRequired : item.disabled
          "
          @change="
            _ => {
              item.change && item.change(scope.$index, _, scope.row);
            }
          "
          v-model="scope.row[item.model]"
        ></el-checkbox>

        <template v-else-if="item.type === 'input'">
          <el-input
            :disabled="
              scope.row.isRequired ? scope.row.isRequired : item.disabled
            "
            v-if="item.isNumber"
            v-model.number="scope.row[item.model]"
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="
              item.placeholder ? item.placeholder : `请输入${item.label}`
            "
          ></el-input>
          <el-input
            v-else
            :disabled="
              scope.row.isRequired ? scope.row.isRequired : item.disabled
            "
            v-model="scope.row[item.model]"
            :placeholder="
              item.placeholder ? item.placeholder : `请输入${item.label}`
            "
          >
          </el-input>
        </template>
        <el-select
          :clearable="item.clearable"
          :disabled="
            scope.row.isRequired ? scope.row.isRequired : item.disabled
          "
          v-else-if="item.type === 'select'"
          v-model="scope.row[item.model]"
          :placeholder="
            item.placeholder ? item.placeholder : `请选择${item.label}`
          "
          @change="
            _ => {
              item.change && item.change(scope.$index, _, scope.row);
            }
          "
        >
          <template v-if="item.isComponentSelect">
            <el-option
              v-for="item in fieldAndComponent[scope.row.dbType]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </template>
          <template v-else>
            <el-option
              v-for="item in item.selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </template>
        </el-select>

        <div v-else-if="item.type === 'text'">
          {{ scope.row[item.model] }}
        </div>
      </el-form-item>
    </template>
  </el-table-column>
</template>

<script>
import { fieldAndComponent } from "../../adapter/cisiTable";
export default {
  name: "columnWidget",
  props: ["item"],
  data() {
    return {
      fieldAndComponent
    };
  }
};
</script>

<style scoped></style>
