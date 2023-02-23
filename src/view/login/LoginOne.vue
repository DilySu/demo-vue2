<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="formRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const validateName = (rule, value, callback) => {
      let reg = /(^[a-zA-Z0-9]{4,10}$)/
      if (value === ''){
        callback(new Error("请输入用户名"))
      }else if (!reg.test(value)){
        callback(new Error("请输入4-10位用户名"))
      }
      callback()
    }
    // const validatePass = (rule, value, callback) => {
    //   // 6-12位密码包含大小写字母和数字以及特殊符号
    //   let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    //   if (value === ''){
    //     callback(new Error("请输入用户名"))
    //   }else if (!reg.test(value)){
    //     callback(new Error("6-12位密码包含大小写字母和数字以及特殊符号"))
    //   }
    //   callback()
    // }
    return {
      form: {
        username: 'dily',
        password: '123456'
      },
      formRules: {
        username: [
          {validator: validateName, trigger: 'blur'},
          // {required: true, message: '请输入用户名', trigger: 'blur'},
          // {min: 4, max: 12, message: '长度在6-12位字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在6-12位字符', trigger: 'blur'},
          // {validator: validatePass, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['form'].validate((v) => {
        if (v) {
          // console.log(this.form)
          this.axios.post("http://1.116.64.64:5004/api2/login", this.form)
              .then(res => {
                if (res.data.status === 200) {
                  localStorage.setItem("username", res.data.username)
                  this.$message.success(res.data.message)
                  this.$router.push("/home")
                }
                console.log(res)
              })
        } else {
          console.log("失败")
          console.log(this.form)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #409EFF;

  .box-card {
    width: 450px;
    margin: 200px auto;

    ::v-deep .el-card__header {
      font-size: 34px;
    }

    .el-button {
      width: 100%;
    }
  }
}

</style>