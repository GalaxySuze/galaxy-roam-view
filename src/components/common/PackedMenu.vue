<template>
  <div id="packed-menu">
    <!-- 联系站长 -->
    <el-popover
      placement="left"
      trigger="hover"
      width="200">
      <el-alert
        show-icon
        :closable="false"
        title="如遇问题, 请联系站长"
        type="info">
      </el-alert>
      <div class="contact-btn">
        <el-button type="primary" size="mini" round>QQ联系</el-button>
        <el-button type="primary" size="mini" round>在线邮箱</el-button>
      </div>
      <el-button slot="reference" class="menu-btn" plain icon="el-icon-chat-dot-round" circle></el-button>
    </el-popover>
    <!-- 扫码关注 -->
    <el-popover
      placement="left"
      trigger="hover"
      width="180">
      <el-alert
        show-icon
        :closable="false"
        title="微信扫一扫关注"
        type="success">
      </el-alert>
      <div class="wechat-btn">
        <el-image
          class="wechat-btn-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"></el-image>
      </div>
      <el-button slot="reference" class="menu-btn" plain icon="el-icon-full-screen" circle></el-button>
    </el-popover>
    <el-tooltip effect="light" content="返回顶部" placement="left">
      <el-button class="menu-btn" plain icon="el-icon-top" circle>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#packed-menu {
  position: fixed;
  right: 100px;
  bottom: 100px;
  z-index: 999;
  width: 40px;
  height: 200px;
  display: flex;
  flex-direction: column;

  .menu-btn {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    margin-left: 0;
  }
}

.contact-btn {
  display: flex;
  flex-direction: column;

  .el-button {
    margin-left: 0;
    margin-top: 8px;
  }
}

.wechat-btn {
  display: flex;
  justify-content: center;

  .wechat-btn-img {
    width: 160px;
    height: 160px;
    margin-top: 10px;
  }
}
</style>
