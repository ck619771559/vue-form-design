<template>
  <div>
    <el-row class="full-edit__row" type="flex" justify="center" :gutter="40">
      <el-col :span="8">
        <el-form-item
          label="表名"
          prop="head.tableName"
          :rules="[{ required: true, message: '请输入表名', trigger: 'blur' }]"
        >
          <el-input
            v-model="tableJson.head.tableName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="表描述"
          prop="head.tableTxt"
          :rules="[
            { required: true, message: '请输入表描述', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="tableJson.head.tableTxt"
            placeholder="请输入内容"
          ></el-input> </el-form-item
      ></el-col>
      <el-col :span="8">
        <el-form-item label="表类型" prop="head.tableType">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.tableType"
            placeholder="请选择表单类型"
          >
            <el-option
              v-for="item in tableTypeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="full-edit__row" type="flex" justify="center" :gutter="40">
      <el-col :span="8">
        <el-form-item label="表单类型" prop="head.formCategory">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.formCategory"
            placeholder="请选择表单分类"
            clearable
          >
            <el-option
              v-for="item in formCategoryDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主键策略" prop="head.idType">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.idType"
            placeholder="请选择表单类型"
          >
            <el-option
              v-for="item in idTypeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="查询模式" prop="head.queryMode">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.queryMode"
            placeholder="请选择表单类型"
          >
            <el-option
              v-for="item in queryModeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> </el-form-item
      ></el-col>
    </el-row>

    <el-row class="full-edit__row" type="flex" justify="center" :gutter="40">
      <el-col :span="8">
        <el-form-item label="主题模板" prop="head.themeTemplate">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.themeTemplate"
            placeholder="请选择主题模型"
          >
            <el-option
              v-for="item in pagesDesign"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="表单风格" prop="head.formTemplate">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.formTemplate"
            placeholder="请选择表单风格"
          >
            <el-option
              v-for="item in formTemplateDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="显示复选框" prop="head.isCheckbox">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.isCheckbox"
            placeholder="是否显示复选框"
          >
            <el-option :value="'Y'" label="是"></el-option>
            <el-option :value="'N'" label="否"></el-option>>
          </el-select>
        </el-form-item>
      </el-col>
      <!--      <el-col :span="8">-->
      <!--        <el-form-item label="搜索栏标签宽度" prop="head.searchLabelWidth">-->
      <!--          <el-input-->
      <!--            v-model.number="tableJson.head.searchLabelWidth"-->
      <!--            oninput="value=value.replace(/[^\d]/g,'')"-->
      <!--            placeholder="请输入搜索栏标签宽度"-->
      <!--          ></el-input>-->
      <!--        </el-form-item>-->
      <!--      </el-col>-->
    </el-row>
    <el-row class="full-edit__row" type="flex" justify="start" :gutter="40">
      <el-col :span="8">
        <el-form-item label="是否分页" prop="head.isPage">
          <el-select
            style="width: 100%"
            v-model="tableJson.head.isPage"
            placeholder="是否分页"
          >
            <el-option :value="'Y'" label="是"></el-option>
            <el-option :value="'N'" label="否"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--      <el-col :span="8">-->
      <!--        <el-form-item label="是否树" prop="head.isTree">-->
      <!--          <el-select-->
      <!--            style="width: 100%"-->
      <!--            v-model="tableJson.head.isTree"-->
      <!--            placeholder="是否树"-->
      <!--          >-->
      <!--            <el-option :value="'Y'" label="是"></el-option>-->
      <!--            <el-option :value="'N'" label="否"></el-option>-->
      <!--          </el-select> </el-form-item-->
      <!--      ></el-col>-->
    </el-row>
  </div>
</template>

<script>
import {
  tableTypeDict,
  formCategoryDict,
  idTypeDict,
  queryModeDict,
  formTemplateDict
} from "@/config/tableFormDict";

import { pagesDesign } from "../pages";

export default {
  name: "headConfig",
  props: ["tableJson"],
  data() {
    return {
      tableTypeDict,
      formCategoryDict,
      idTypeDict,
      queryModeDict,
      formTemplateDict,
      pagesDesign
    };
  }
};
</script>

<style scoped></style>
