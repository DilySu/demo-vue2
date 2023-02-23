<template>
  <div class="infoList">
    <el-form :inline="true" :model="selectData" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addData">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentTableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"/>
      <el-table-column prop="age" label="年龄" align="center"/>
      <el-table-column prop="sex" label="性别" align="center"/>
      <el-table-column prop="father" label="父亲姓名" align="center"/>
      <el-table-column prop="mather" label="母亲姓名" align="center"/>
      <el-table-column prop="phone" label="联系电话" align="center"/>
      <el-table-column prop="address" label="家庭住址" align="center"/>
      <el-table-column prop="time" label="入校时间" align="center"/>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)">修改</el-button>
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
    <el-dialog :title="editFlag ? '修改学生信息' :'添加学生信息'" :visible.sync="dialogFormVisible" width="500px"
               onclose="closeInfo('form')">
      <el-form inline :model="formData" :rules="formRules" ref="form">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formData.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="formData.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-radio v-model="formData.sex" label="1">男</el-radio>
          <el-radio v-model="formData.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="class" :label-width="formLabelWidth">
          <el-input v-model="formData.class" autocomplete="off" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="父亲姓名" prop="father" :label-width="formLabelWidth">
          <el-input v-model="formData.father" autocomplete="off" placeholder="请输入父亲姓名"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" prop="mather" :label-width="formLabelWidth">
          <el-input v-model="formData.mather" autocomplete="off" placeholder="请输入母亲姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="formData.phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="formData.address" autocomplete="off" placeholder="请输入家庭住址"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="time" :label-width="formLabelWidth">
          <el-date-picker v-model="formData.time" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                          placeholder="请选择入学时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeInfo('form')">取消</el-button>
        <el-button type="primary" @click="sure('form')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { addOrUpdateInfo, deleteInfo, getInfoList} from "@/api/Info";

export default {
  data() {
    return {
      selectData: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      editFlag: false,
      formLabelWidth: '80px',
      formData: {
        name: '',
        age: '',
        sex: '1',
        father: '',
        mather: '',
        address: '',
        time: '',
        phone: '',
      },
      formRules: {
        name: [{required: true, message: '请输入字段'}],
        age: [{required: true, message: '请输入字段'}],
        sex: [{required: true, message: '请输入字段'}],
        father: [{required: true, message: '请输入字段'}],
        mather: [{required: true, message: '请输入字段'}],
        address: [{required: true, message: '请输入字段'}],
        time: [{required: true, message: '请输入字段'}],
        phone: [{required: true, message: '请输入字段'}],
      }
    }
  },
  computed: {
    currentTableData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
    edit(row) {
      this.editFlag = true
      this.formData = {...row}
      this.dialogFormVisible = true
      this.$refs['form'].resetFields()
    },
    find() {
      this.currentPage = 1
    },
    del(row) {
      this.$alert('你确定要删除嘛？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          deleteInfo(row.id).then(res => {
            if (res.data.status === 200) {
              this.getData()
              this.$message.success("删除成功")
            }
          })
        }
      })

    },
    addData() {
      this.editFlag = false
      this.dialogFormVisible = true
      this.$refs['form'].resetFields()
    },
    closeInfo(form) {
      console.log(form)
      this.dialogFormVisible = false
    },
    sure(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addOrUpdateInfo(this.editFlag ? 'PUT' : 'POST', this.formData).then(res => {
            this.$message.success(res.data.message)
            this.dialogFormVisible = false
            this.getData()
          })
        }
      })
    },
    getData(params) {
      getInfoList(params).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.tableData = res.data.data
          this.tableData.forEach(e => {
            e.sex === '1' ? e.sex = '男' : e.sex = '女'
          })
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
.infoList {
  .el-form, el-form-item {
    text-align: left;
  }

  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>