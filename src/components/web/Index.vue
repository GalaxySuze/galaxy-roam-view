<template>
  <div class="main-list">
    <el-card class="card-main">
      <!-- 标签列表 -->
      <el-row>
        <el-button size="mini">#游戏原画</el-button>
        <el-button type="primary" size="mini">#场景设计</el-button>
        <el-button type="success" size="mini">#商业插画</el-button>
        <el-button type="info" size="mini">#插画</el-button>
        <el-button type="warning" size="mini">#扁平风</el-button>
        <el-button type="danger" size="mini">#日韩</el-button>
        <el-button type="danger" size="mini">#水彩</el-button>
        <el-button type="danger" size="mini">#厚涂</el-button>
        <el-button type="danger" size="mini">#平涂</el-button>
        <el-button type="danger" size="mini">#黑白</el-button>
      </el-row>

      <el-row>
        <el-carousel height="260px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="item in 3" :key="item">
            <img src="../../assets/images/cove-01.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-row>

      <!-- 数据列表 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="card-list">
            <el-row>
              <el-col :span="8" class="art-avatar">
                <el-avatar :size="50"
                           src="https://tvax4.sinaimg.cn/crop.46.38.627.627.180/6f14ac2ely8fy1ndvj9dlj20k40k9hdt.jpg?KID=imgbed,tva&Expires=1636140360&ssig=bVmGOLM0Hh"></el-avatar>
              </el-col>
              <el-col :span="14">
                <el-row class="art-name">
                  <el-link type="primary" icon="el-icon-price-tag">牟真民show</el-link>
                </el-row>
                <el-row class="art-info">
                  <el-tag size="mini" type="danger">#场景原画</el-tag>
                  <el-tag size="mini" type="success">@微博</el-tag>
                  <el-tag size="mini" type="warning">最近开班: 2020/18/20</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-list">
            <el-row>
              <el-col :span="8" class="art-avatar">
                <el-avatar :size="50"
                           src="https://tvax3.sinaimg.cn/crop.0.0.1080.1080.180/5f3874d7ly8gi0t4hufv9j20u00u0jtb.jpg?KID=imgbed,tva&Expires=1636142348&ssig=uUDKR%2F6E2X"></el-avatar>
              </el-col>
              <el-col :span="14">
                <el-row class="art-name">
                  <el-link type="primary" icon="el-icon-price-tag">钢铁小麻雀</el-link>
                </el-row>
                <el-row class="art-info">
                  <el-tag size="mini" type="danger">#人物设计</el-tag>
                  <el-tag size="mini" type="success">@微博</el-tag>
                  <el-tag size="mini" type="warning">最近开班: 2022/1/20</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-list">
            <el-row>
              <el-col :span="8" class="art-avatar">
                <el-avatar :size="50"
                           src="https://tvax4.sinaimg.cn/crop.0.0.800.800.180/66ff28fcly8gq5e0mdl7xj20m80m8djw.jpg?KID=imgbed,tva&Expires=1636142402&ssig=8ta%2BeHGfmg"></el-avatar>
              </el-col>
              <el-col :span="14">
                <el-row class="art-name">
                  <el-link type="primary" icon="el-icon-price-tag">疯景CrazyJN</el-link>
                </el-row>
                <el-row class="art-info">
                  <el-tag size="mini" type="danger">#三辅二</el-tag>
                  <el-tag size="mini" type="success">@微博</el-tag>
                  <el-tag size="mini" type="warning">最近开班: 2022/1/10</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-list">
            <el-row>
              <el-col :span="8" class="art-avatar">
                <el-avatar :size="50"
                           src="https://tvax3.sinaimg.cn/crop.92.97.273.273.180/4dff74c2ly8frka8r98esj20ci0dktes.jpg?KID=imgbed,tva&Expires=1636142443&ssig=WderfIvB41"></el-avatar>
              </el-col>
              <el-col :span="14">
                <el-row class="art-name">
                  <el-link type="primary" icon="el-icon-price-tag">俊西JUNC</el-link>
                </el-row>
                <el-row class="art-info">
                  <el-tag size="mini" type="danger">#厚涂</el-tag>
                  <el-tag size="mini" type="success">@微博</el-tag>
                  <el-tag size="mini" type="warning">最近开班: 2020/18/20</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second',
      currentDate: new Date()
    }
  },
  // created () {
  // this.getIndexData()
  // },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
    // async getIndexData () {
    //   const { data: res } = await this.$http.get('/api/web')
    //   console.log(res.data)
    // }
  }
}
</script>

<style lang="less" scoped>
.main-list {

  .card-main {
    width: 1200px;
    background-color: #F5F8FA;
    border: none;
    border-radius: 0;
    box-shadow: none !important;
  }

  .el-carousel {
    margin-top: 20px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .card-list {
    margin-top: 20px;
    border-top: 2px solid #EE6E73;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;

    .art-avatar {
      display: flex;
      align-items: center;
      height: 82px;
    }

    .art-name {
      padding-bottom: 10px;
      margin-left: 5px;
      text-align: left;

      > .el-link {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .art-info {
      > .el-tag {
        margin-left: 5px;
        margin-top: 5px;
      }
    }
  }
}
</style>
