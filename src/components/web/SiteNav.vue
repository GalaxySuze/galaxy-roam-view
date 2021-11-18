<template>
  <div class="main-list">
    <el-card class="card-main">
      <!-- 标签列表 -->
      <el-row>
        <el-button :type="(t1 < 3) ? 'danger' : 'primary'" size="mini"
                   v-for="(tagItem, t1) in categoryList" :key="tagItem.category_id"
                   @click="toTagsites(tagItem.category_id, tagItem.category_name)">
          #{{ tagItem.category_name }}
        </el-button>
      </el-row>

      <!-- 数据列表 -->
      <el-row :gutter="12" v-for="siteItem in siteList" :key="siteItem.category_id">
        <el-col :span="24" class="category-title">
          <el-link icon="el-icon-star-off" :underline="false">{{ siteItem.category_name }}</el-link>
        </el-col>
        <el-col :span="6" v-for="(site, siteKey) in siteItem.items" :key="siteKey">
          <el-card class="card-list" :body-style="{ padding: '12px' }" shadow="hover">
            <!-- 名称 -->
            <div slot="header" class="site-name">
              <el-avatar :size="32" :src="site.thumb"></el-avatar>
              <el-link type="primary" :underline="false" :href="site.url" target="_blank">
                {{ site.name }}
              </el-link>
            </div>
            <el-row>
              <!-- 标签 -->
              <el-col :span="24">
                <el-row class="site-desc-row">
                  {{ site.desc }}
                </el-row>
                <el-row class="site-tags">
                  <el-tag size="mini" type="info" v-for="siteTag in site.tags_name" :key="siteTag.id"
                          @click="toTagSites(siteTag.id, siteTag.tag)">
                    #{{ siteTag.tag }}
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
      categoryList: [],
      siteList: []
    }
  },
  created () {
    this.getCategorySites()
  },
  methods: {
    async getCategorySites () {
      const { data: res } = await this.$http.get('home/site-nav')
      if (res.meta.status !== 200) {
        return this.$message.error('获取页面数据失败, 请在右下角联系管理员')
      }
      this.siteList = res.data.sites
      this.categoryList = res.data.category_list
    },
    toTagSites (tagId, tagName) {
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

  .card-list {
    margin-top: 16px;
    //border-top: 2px solid #EE6E73;
    //box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    box-shadow: none;
    height: 150px;

    .site-name {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-link {
        font-weight: 700;
        font-size: 16px;
        margin-left: 12px;
      }
    }

    .site-tags {
      > .el-tag {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
}

.category-title {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-link {
    font-size: 18px;
    font-weight: 700;
  }
}

.site-desc-row {
  font-size: 14px;
}
</style>
