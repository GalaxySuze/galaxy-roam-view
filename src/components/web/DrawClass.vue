<template>
  <div class="main-list">
    <el-card class="card-main">
      <!-- 标签列表 -->
      <el-row>
        <el-button :type="(t1 < 3) ? 'danger' : 'primary'" size="mini"
                   v-for="(tagItem, t1) in hotTagList" :key="tagItem.id"
                   @click="toTagTeams(tagItem.id, tagItem.tag)">
          #{{ tagItem.tag }}
        </el-button>
      </el-row>

      <!-- 轮播图 -->
      <el-row>
        <el-carousel height="260px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="item in 3" :key="item">
            <img src="../../assets/images/cove-01.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-row>

      <!-- 数据列表 -->
      <el-row :gutter="12" v-for="teamItem in teamList" :key="teamItem.category_id">
        <el-col :span="24" class="category-title">
          <el-link icon="el-icon-star-off" :underline="false">{{ teamItem.category_name }}</el-link>
          <el-button plain size="mini" v-if="!(teamItem.items.length < 8)"
                     @click="seeMore(teamItem.category_id)">更多
          </el-button>
        </el-col>
        <el-col :span="6" v-for="(team, teamKey) in teamItem.items" :key="teamKey">
          <el-card class="card-list" :body-style="{ padding: '12px' }" shadow="hover">
            <!-- 名称 -->
            <div slot="header" class="team-name">
              <el-badge is-dot :hidden="!team.class_start_date" class="team-badge">
                <el-avatar :size="32" :src="team.avatar"></el-avatar>
              </el-badge>
              <el-tooltip effect="light" :content="team.class_start_date" placement="top"
                          v-if="team.class_start_date">
                <el-link type="primary" :underline="false" :href="team.homepage" target="_blank">
                  {{ team.name }}
                </el-link>
              </el-tooltip>
              <el-link type="primary" :underline="false" :href="team.homepage" target="_blank"
                       v-if="!team.class_start_date">
                {{ team.name }}
              </el-link>
            </div>
            <el-row>
              <!-- 标签 -->
              <el-col :span="24">
                <el-row class="team-tags">
                  <el-tag size="mini" type="info" v-for="teamTag in team.tags_name" :key="teamTag.id">
                    #{{ teamTag.tag }}
                  </el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        tag_id: '',
        category_id: 1,
        page: 1, // 当前页
        pageSize: 10 // 当前页数显示条数
      },
      teamList: [],
      hotTagList: [],
      total: 0
    }
  },
  created () {
    this.getIndexData()
  },
  methods: {
    async getIndexData () {
      const { data: res } = await this.$http.get('home/index', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取首页列表数据失败, 请联系管理员')
      }
      this.hotTagList = res.data.hot_tags
      this.teamList = res.data.teams
    },
    seeMore (categoryId) {
      this.$router.push({
        path: '/more',
        query: { category_id: categoryId }
      })
    },
    toTagTeams (tagId, tagName) {
      this.$router.push({
        path: '/tag-teams',
        query: {
          tag_id: tagId,
          tag: tagName
        }
      })
    }
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
    margin-top: 16px;
    //border-top: 2px solid #EE6E73;
    //box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    box-shadow: none;
    height: 150px;

    .team-name {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-link {
        font-weight: 700;
        font-size: 16px;
        margin-left: 12px;
      }
    }

    .team-tags {
      > .el-tag {
        margin-left: 5px;
      }
    }
  }
}

.pagination-row {
  text-align: center;
}

.category-title {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
