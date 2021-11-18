<template>
  <div class="main-list">
    <el-card class="card-main">
      <!-- 标签 -->
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover" class="tag-title-img">
            <!-- 分类标题 -->
            <div class="tag-title">
              #{{ queryTagName }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 数据列表 -->
      <el-row :gutter="12" v-for="teamItem in teamList" :key="teamItem.category_id">
        <el-col :span="24" class="category-title">
          <el-link icon="el-icon-star-off" :underline="false">{{ teamItem.category_name }}</el-link>
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
                  <el-tag size="mini" type="info" v-for="teamTag in team.tags_name" :key="teamTag.id"
                          @click="toTagTeams(teamTag.id, teamTag.tag)">
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
      queryTagId: this.$route.query.tag_id,
      queryTagName: this.$route.query.tag,
      teamList: []
    }
  },
  created () {
    this.getCategoryTeams()
  },
  methods: {
    async getCategoryTeams () {
      const { data: res } = await this.$http.get(`home/tag-teams/${this.queryTagId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取标签列表数据失败, 请在右下角联系管理员')
      }
      this.teamList = res.data.teams
    },
    toTagTeams (tagId, tagName) {
      const routerJump = this.$router.resolve({
        path: '/tag-teams',
        query: {
          tag_id: tagId,
          tag: tagName
        }
      })
      window.open(routerJump.href, '_blank')
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
        cursor: pointer;
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

.tag-title-img {
  width: 100%;
  height: 60px;
  background-image: url('https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  .tag-title {
    color: #FFFFFF;
    text-align: center;
    font-weight: 700;
    line-height: 22px;
    font-size: 28px;
  }
}
</style>
