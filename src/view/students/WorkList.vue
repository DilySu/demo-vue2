<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center"/>
      <el-table-column prop="userId" label="所属班级" align="center"/>
      <el-table-column prop="title" label="作业名称" align="center"/>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

import {getTableData} from "@/utils/table";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: true
    }
  },
  methods: {
    getData() {
      const params = {page: this.currentPage, size: this.pageSize}
      getTableData(this, '/works', params, ['completed'])
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.workList {
  .el-form, el-form-item {
    text-align: left;
  }

  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>