<template>
  <div class="list-box">
    <el-row class="list-row">
      <!-- 面包屑导航 -->
      <el-col :span="18">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>机构列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- 功能栏 -->
      <el-col :span="6" class="add-btn">
        <el-button type="primary" size="small" icon="iconfont iconfont-tianjia-" @click="showAddDialog">&nbsp;添加机构
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-card class="list-card">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input placeholder="搜索机构名" v-model="queryInfo.name" clearable @clear="getTeamList"></el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="queryInfo.category_id" clearable placeholder="请选择分类" @clear="getTeamList">
                <el-option
                  v-for="queryCateItem in categoryList"
                  :key="queryCateItem.id"
                  :label="queryCateItem.title"
                  :value="queryCateItem.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="queryInfo.tags_id" clearable placeholder="请选择标签" @clear="getTeamList">
                <el-option
                  v-for="queryTagItem in tagList"
                  :key="queryTagItem.id"
                  :label="queryTagItem.tag"
                  :value="queryTagItem.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="success" icon="el-icon-search" :loading="searchLoading" @click="getTeamList">搜索
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <el-table
          :data="teamList"
          stripe>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            width="100px"
            prop="homepage"
            label="主页地址">
            <template v-slot="{ row }">
              <el-link type="info" disabled href="#" v-if="!row.homepage">暂无地址</el-link>
              <el-link type="primary" :href="row.homepage" v-if="row.homepage" target="_blank">点击访问</el-link>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            prop="avatar"
            label="头像">
            <template v-slot="{ row }">
              <el-avatar :size="30" icon="el-icon-user-solid" v-if="!row.avatar"></el-avatar>
              <el-avatar :size="30" :src="row.avatar" v-if="row.avatar"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            width="100px"
            prop="category_name"
            label="分类">
          </el-table-column>
          <el-table-column
            width="220px"
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="tags_name"
            label="标签">
            <template v-slot="{ row }">
              <el-tag
                v-for="(item, i1) in row.tags_id"
                :key="i1" type="info">
                {{ item.tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="class_start_date"
            label="最近开班">
          </el-table-column>
          <el-table-column
            width="260"
            fixed="right"
            label="操作">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="light" content="修改" placement="top" :enterable="false">
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="showEditDialog(row)"
                           :loading="row.show_loading"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="删除" placement="top" :enterable="false">
                <el-button type="danger" size="medium" icon="el-icon-delete" @click="handleDelete(row.id)"
                           circle></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 分页 -->
      <el-col :span="24">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryInfo.page"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹框 -->
    <el-dialog
      title="添加团队信息"
      :fullscreen="dialogFullscreen"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="团队分类" prop="category_id">
          <el-select v-model="addForm.category_id" clearable placeholder="请选择">
            <el-option
              v-for="cateItem in categoryList"
              :key="cateItem.id"
              :label="cateItem.title"
              :value="cateItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队标签" prop="tags_id">
          <el-select v-model="addForm.tags_id" multiple clearable placeholder="请选择">
            <el-option
              v-for="tagItem in tagList"
              :key="tagItem.id"
              :label="tagItem.tag"
              :value="tagItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主页地址" prop="homepage">
          <el-input v-model="addForm.homepage"></el-input>
        </el-form-item>
        <el-form-item label="头像外链" prop="avatar">
          <el-input v-model="addForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="最近开班" prop="class_start_date">
          <el-input v-model="addForm.class_start_date"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="desc">
          <quill-editor v-model="addForm.desc"></quill-editor>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogFullscreen = !dialogFullscreen" icon="el-icon-monitor"></el-button>
        <el-button type="info" @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleAdd" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      title="修改团队信息"
      :fullscreen="dialogFullscreen"
      :close-on-click-modal="false"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="editDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="团队分类" prop="category_id">
          <el-select v-model="editForm.category_id" clearable placeholder="请选择">
            <el-option
              v-for="editCateItem in categoryList"
              :key="editCateItem.id"
              :label="editCateItem.title"
              :value="editCateItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队标签" prop="tags_id">
          <el-select v-model="editForm.tags_id" multiple clearable placeholder="请选择">
            <el-option
              v-for="editTagItem in tagList"
              :key="editTagItem.id"
              :label="editTagItem.tag"
              :value="editTagItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主页地址" prop="homepage">
          <el-input v-model="editForm.homepage"></el-input>
        </el-form-item>
        <el-form-item label="头像外链" prop="avatar">
          <el-input v-model="editForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="最近开班" prop="class_start_date">
          <el-input v-model="editForm.class_start_date"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="desc">
          <quill-editor v-model="editForm.desc"></quill-editor>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogFullscreen = !dialogFullscreen" icon="el-icon-monitor"></el-button>
        <el-button type="info" @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleEdit" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      queryInfo: {
        name: '', // 搜索名称
        category_id: '', // 搜索类别
        tags_id: '', // 搜索标签
        page: 1, // 当前页
        pageSize: 10 // 当前页数显示条数
      },
      teamList: [],
      total: 0,
      labelPosition: 'right',
      searchLoading: false,
      addLoading: false,
      showEditLoading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      dialogFullscreen: false,
      addForm: {
        name: '',
        category_id: '',
        tags_id: [],
        avatar: '',
        homepage: '',
        class_start_date: '',
        desc: ''
      },
      editForm: {
        id: '',
        name: '',
        category_id: '',
        tags_id: [],
        avatar: '',
        homepage: '',
        class_start_date: '',
        desc: ''
      },
      addFormRules: {
        name: [
          {
            required: true,
            message: '请输入团队名',
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ]
      },
      editFormRules: {
        name: [
          {
            required: true,
            message: '请输入团队名称',
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ]
      },
      categoryList: [],
      tagList: []
    }
  },
  created () {
    this.getTeamList()
    this.getFormInitData()
  },
  methods: {
    // 获取列表数据
    async getTeamList () {
      this.searchLoading = true
      const { data: res } = await this.$http.get('admin/team/list', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.teamList = res.data.list
      this.total = res.data.total
      this.searchLoading = false
    },
    async showEditDialog (row) {
      row.show_loading = true
      const { data: res } = await this.$http.get(`admin/team/${row.id}`)
      if (res.meta.status !== 200) {
        row.show_loading = false
        return this.$message.error(res.meta.msg)
      }
      this.editForm = res.data
      const tagsArr = []
      for (const item in res.data.tags_id) {
        tagsArr.push(parseInt(res.data.tags_id[item].id))
      }
      this.editForm.tags_id = tagsArr
      this.editDialogVisible = true
      row.show_loading = false
      console.log(this.editForm)
    },
    async getFormInitData () {
      this.categoryList = []
      this.tagList = []
      const { data: res } = await this.$http.get('admin/team/form-init-data')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.categoryList = res.data.category
      this.tagList = res.data.tag
    },
    // 删除处理
    async handleDelete (id) {
      const confirmRes = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmRes === 'confirm') {
        const { data: res } = await this.$http.delete(`admin/team/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('删除成功')
        await this.getTeamList()
      }
    },
    // 分页数量变更处理
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTeamList()
    },
    // 分页当前页跳转处理
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getTeamList()
    },
    // 获取表单初始显示数据
    showAddDialog () {
      this.addDialogVisible = true
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    // 添加处理
    handleAdd () {
      this.addLoading = true
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) {
          this.addLoading = false
          return
        }
        const newForm = _.cloneDeep(this.addForm)
        newForm.tags_id = this.addForm.tags_id.join(',')
        const { data: res } = await this.$http.post('admin/team', newForm)
        this.addLoading = false
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('添加团队成功')
        this.$refs.addFormRef.resetFields()
        this.addDialogVisible = false
        await this.getTeamList()
      })
    },
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
    // 更新处理
    handleEdit () {
      this.addLoading = true
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) {
          this.addLoading = false
          return
        }
        const { data: res } = await this.$http.put(`admin/team/${this.editForm.id}`, this.editForm)
        this.addLoading = false
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('更新团队成功')
        this.$refs.editFormRef.resetFields()
        this.editDialogVisible = false
        await this.getTeamList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin-left: 5px;
}
</style>
