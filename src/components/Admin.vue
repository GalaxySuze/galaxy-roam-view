<template>
  <el-container class="admin-container">
    <el-aside :width="menuCollapse ? '64px' : '240px'">
      <el-card class="admin-card">
        <span>银河漫游</span>
      </el-card>
      <el-menu
        :collapse="menuCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        unique-opened
        router
        background-color="#FFFFFF"
        text-color="#000"
        active-text-color="#EE6E73">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in menus" :key="item.id">
          <template slot="title">
            <i :class="'iconfont '+ item.icon"></i>&nbsp;
            <span>{{ item.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="'/' + subItem.url" v-for="subItem in item.children" :key="subItem.id">
            <template slot="title">
              <i :class="'iconfont '+ subItem.icon"></i>&nbsp;
              <span>{{ subItem.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-button type="danger" size="small" icon="el-icon-s-fold" circle @click="toggleCollapse"></el-button>
          <el-button type="primary" size="small" icon="el-icon-s-home" @click="toHome" circle></el-button>
        </div>
        <div class="header-user">
          <el-avatar :size="32" :src="loginAvatar"></el-avatar>&nbsp;&nbsp;
          <el-button type="danger" size="small" icon="el-icon-bell" circle @click="checkNotify"></el-button>
          <el-button type="danger" size="mini" icon="iconfont iconfont-tuichu" circle @click="logout"></el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: [],
      menuCollapse: false,
      loginAvatar: window.sessionStorage.getItem('login_avatar')
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async logout () {
      await this.$http.post('auth/logout')
      this.$message.success('Goodbye~')
      window.sessionStorage.clear()
      await this.$router.push('/admin/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('admin/menu/data')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res.data)
      this.menus = res.data
    },
    toggleCollapse () {
      this.menuCollapse = !this.menuCollapse
    },
    checkNotify () {
    },
    toHome () {
      const routerJump = this.$router.resolve('/index')
      window.open(routerJump.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.admin-container {
  background-color: #F6F7FB;
  height: 100%;
}

.el-header {
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.el-aside {
  background-color: #FFFFFF;
  color: #8FA0B9;

  .iconfont {
    color: #1F4173;
    font-size: 20px;
  }

  .admin-card {
    border-radius: 0;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #8A8A91;
    font-size: 26px;
    background-color: #161624;
    color: #FFFFFF;
    width: 100%;
    text-align: center;
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-item.is-active {
    border-right: solid 3px #EE6E73;
    background-color: rgb(231, 235, 240) !important;
  }
}

.el-main {
  background-color: #F6F7FB;
}
</style>
