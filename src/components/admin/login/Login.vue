<template>
  <div class="login_container">
    <el-row class="login_box">
      <el-col :span="10">
        <!-- 登录栏 -->
        <el-card class="login_card">
          <div slot="header">
            <span class="card_header"><i class="el-icon-user"></i>&nbsp;用户登录</span>
          </div>
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
            <el-form-item prop="username">
              <el-input prefix-icon="iconfont iconfont-email" v-model="loginForm.username"
                        placeholder="邮箱地址"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="iconfont iconfont-mima" v-model="loginForm.password" type="password"
                        placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" icon="el-icon-s-promotion" @click="login">立即登录</el-button>&nbsp;
              <el-button type="info" icon="el-icon-question">忘记密码</el-button>
            </el-form-item>
            <el-form-item>
              <el-divider content-position="center">第三方登录</el-divider>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="iconfont iconfont-weixin">&nbsp;使用微信登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="iconfont iconfont-QQ-circle-fill">&nbsp;&nbsp;使用QQ登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <!-- 图片栏 -->
      <el-col :span="14">
        <el-image
          class="login_image"
          src="https://wx1.sinaimg.cn/mw2000/9d369144gy1gkp5salxxzj20u011iq3h.jpg"
          fit="cover"></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入登录邮箱',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 60,
            message: '长度在 6 到 16 个有效字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/auth/login', this.loginForm)
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #F7FAFC;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_box {
    width: 1000px;
    background-color: #fff;

    .login_card {
      height: 720px;
      text-align: center;
      border-radius: 0;
      border-top: 2px solid #EE6E73;

      .card_header {
        font-size: 26px;
      }
    }

    .login_image {
      width: 100%;
      height: 720px;
    }
  }
}
</style>
