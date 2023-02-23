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
import { validateUsername} from "@/utils/validate";
import {setToken} from "@/utils/auth";
import {login} from "@/api/user";

export default {
  data() {
    return {
      form: {
        username: 'dily',
        password: '123456'
      },
      formRules: {
        username: [
          {validator: validateUsername, trigger: 'blur'},
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
          login(this.form)
              .then(res => {
                if (res.data.status === 200) {
                  setToken("username",res.data.username)
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
  background: url("@/assets/img/login-background.png") center no-repeat;

  .el-card{
    background: #65768557;
  }

  .box-card {
    margin: 200px auto; // 左右居中，上200px
    width: 450px;

    ::v-deep .el-form .el-form-item__label{
      color: #fff;
    }

    ::v-deep .el-card__header {
      font-size: 34px;
    }

    .el-button {
      width: 100%;
    }
  }
}

</style>