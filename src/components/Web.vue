<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-box">
        <div class="header-logo">
          银河漫游
        </div>
        <div class="header-menu">
          <el-menu mode="horizontal" background-color="#98A9F9"
                   text-color="#fff"
                   active-text-color="#fff" router>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/site-nav">站点推荐</el-menu-item>
            <el-submenu index="2" class="header-submenu-title">
              <template slot="title">绘画相关</template>
              <el-menu-item index="2-1">书籍推荐</el-menu-item>
              <el-menu-item index="/draw-class">网络班一览</el-menu-item>
            </el-submenu>
            <el-menu-item index="/">个人博客</el-menu-item>
            <el-menu-item index="/">欢迎留言</el-menu-item>
            <el-menu-item index="/">请喝咖啡</el-menu-item>
          </el-menu>
        </div>
        <div class="header-search">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="main-box" :style="{minHeight: minHeight + 'px'}">
        <router-view></router-view>
      </div>
      <div class="footer-box">
        <div class="footer-info">
          <el-row :gutter="12">
            <el-col :span="6" class="footer-info-col">
              <ul class="info-ul">
                <li class="info-title">关于「银河漫游」</li>
                <li class="info-li">
                  Hello World
                </li>
                <li class="info-li">
                  摒弃世俗浮躁，追求技术精湛
                </li>
              </ul>
            </el-col>
            <el-col :span="6" class="footer-info-col">
              <ul class="info-ul">
                <li class="info-title">资源推荐</li>
                <li class="info-li">《社区使用指南》</li>
                <li class="info-li">《文档撰写指南》</li>
                <li class="info-li">《XXXX规范》</li>
                <li class="info-li">《提问的智慧》</li>
              </ul>
            </el-col>
            <el-col :span="6" class="footer-info-col">
              <ul class="info-ul">
                <li class="info-title">其他信息</li>
                <li class="info-li">XXXX</li>
                <li class="info-li">成为版主</li>
                <li class="info-li">XXXX</li>
                <li class="info-li">联系站长</li>
              </ul>
            </el-col>
            <el-col :span="6" style="height: 160px;display: flex;justify-content: center;align-items: center;">
              ⭐⭐⭐⭐⭐
            </el-col>
          </el-row>
          <el-row :gutter="12" class="footer-record">
            <span>浙ICP备88888888号-1</span>
            <el-divider direction="vertical"></el-divider>
            <span> 浙公网安备 8888888888888号</span>
            <el-divider direction="vertical"></el-divider>
            <span>由 Vick 设计和编码 ❤</span>
          </el-row>
        </div>
      </div>
      <!-- 返回顶部 -->
      <PackedMenu></PackedMenu>
    </el-main>
  </el-container>
</template>

<script>
import PackedMenu from './common/PackedMenu'

export default {
  components: {
    PackedMenu
  },
  data () {
    return {
      minHeight: 0
    }
  },
  mounted () {
    this.minHeight = document.documentElement.clientHeight - 60
    const that = this
    window.onresize = function () {
      that.minHeight = document.documentElement.clientHeight - 60
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #98A9F9;
  color: #fff;

  .header-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 60px;

    .header-logo {
      width: 10%;
      text-align: left;
      font-size: 28px;
    }

    .header-menu {
      width: 80%;
      display: flex;
      justify-content: center;
    }

    .header-search {
      width: 10%;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.el-main {
  background-color: #F5F8FA;
  color: #fff;
  margin: 0;
  padding: 0;

  .main-box {
    display: flex;
    justify-content: center;
  }

}

.footer-box {
  background-color: #EE6E73;
  color: #fff;
  height: 260px;
  width: 100%;
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  .footer-info {
    text-align: center;
    width: 1200px;
    line-height: 26px;
  }

  .footer-record {
    border-top: 1px dashed #f3f3f3;
    margin-top: 16px;
    padding-top: 16px;
    font-size: 14px;
    color: #f3f3f3;
  }

  .footer-info-col {
    border-right: 1px dashed #f3f3f3;
    height: 160px;
    padding: 0 !important;

    .info-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .info-ul {
      list-style-type: none;
      padding: 0;
    }

    .info-li {
      font-size: 14px;
      color: #f3f3f3;
      padding: 0;
    }
  }
}

</style>
