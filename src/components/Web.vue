<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-box">
        <div class="header-logo">
          银河漫游
        </div>
        <el-menu class="header-menu" mode="horizontal" background-color="#98A9F9"
                 text-color="#fff"
                 active-text-color="#fff" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/">动态</el-menu-item>
          <el-menu-item index="/">留言</el-menu-item>
        </el-menu>
        <div class="header-search">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="main-box">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer>
      <div class="footer-box"></div>
    </el-footer>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #98A9F9;
  color: #fff;
  text-align: center;
  line-height: 60px;

  .header-box {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;

    .header-logo {
      width: 200px;
      text-align: left;
      font-size: 28px;
    }

    .header-menu {
      width: 900px;
    }

    .header-search {
      width: 100px;
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

.el-footer {
  background-color: #EE6E73;
  color: #fff;
}
</style>
