<template>
  <div class="studentList">
    <el-form :inline="true" :model="selectData" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
        <el-input v-model="selectData.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentTableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"/>
      <el-table-column prop="age" label="年龄" align="center"/>
      <el-table-column prop="sex" label="性别" align="center"/>
      <el-table-column prop="number" label="学号" align="center"/>
      <el-table-column prop="class" label="班级" align="center"/>
      <el-table-column prop="phone" label="电话" align="center"/>
      <el-table-column prop="address" label="地址" align="center"/>
      <el-table-column prop="state" label="状态" align="center"/>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {deleteStudent, getStudentList} from "@/api/student";

export default {
  data() {
    return {
      selectData: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    currentTableData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }

  },
  methods: {
    find() {
      this.getData(this.selectData)
      this.currentPage = 1
    },
    reset() {
      this.selectData = {}
      this.getData(this.selectData)
      this.currentPage = 1
    },
    del(row) {
      deleteStudent(row.id).then(res => {
        if (res.data.status === 200) {
          this.getData()
          this.$message.success("删除成功")
        }
      })
    },
    getData(params) {
      getStudentList(params).then(res => {
        if (res.status === 200) {

          this.tableData = res.data.data
          this.tableData.forEach(e => {
            e.sex === 1 ? e.sex = '男' : e.sex = '女'
            e.state === '1' ? e.state = '已入学' : e.state === '2' ? e.state = '未入学' : e.state = '休学中'
          })
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.studentList {
  .el-form, el-form-item {
    text-align: left;
  }

  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>