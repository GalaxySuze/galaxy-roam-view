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
        <el-button type="primary" size="small" icon="iconfont iconfont-tianjia-" @click="addDialogVisible = true">&nbsp;添加机构
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-card class="list-card">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input placeholder="搜索机构名" v-model="queryInfo.name" clearable @clear="getTeamList"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="搜索分类" v-model="queryInfo.category_id" clearable @clear="getTeamList"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="搜索标签" v-model="queryInfo.tags_id" clearable @clear="getTeamList"></el-input>
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
            prop="avatar"
            label="头像">
            <template v-slot="{ row }">
              <el-avatar :size="30" icon="el-icon-user-solid" v-if="!row.avatar"></el-avatar>
              <el-avatar :size="30" :src="row.avatar" v-if="row.avatar"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="机构名">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="tags"
            label="标签">
          </el-table-column>
          <el-table-column
            prop="homepage"
            label="主页地址">
          </el-table-column>
          <el-table-column
            prop="class_start_date"
            label="开班时间">
          </el-table-column>
          <el-table-column
            width="260"
            fixed="right"
            label="操作">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="light" content="修改" placement="top" :enterable="false">
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="showEditDialog(row)"
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
      title="添加机构信息"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构分类" prop="category_id">
          <el-input v-model="addForm.category_id"></el-input>
        </el-form-item>
        <el-form-item label="机构标签" prop="tags_id">
          <el-input v-model="addForm.tags_id"></el-input>
        </el-form-item>
        <el-form-item label="头像外链" prop="avatar">
          <el-input v-model="addForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="主页地址" prop="homepage">
          <el-input v-model="addForm.homepage"></el-input>
        </el-form-item>
        <el-form-item label="开班时间" prop="class_start_date">
          <el-input v-model="addForm.class_start_date"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="desc">
          <el-input v-model="addForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleAdd" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      title="修改机构信息"
      :close-on-click-modal="false"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构分类" prop="category_id">
          <el-input v-model="editForm.category_id"></el-input>
        </el-form-item>
        <el-form-item label="机构标签" prop="tags_id">
          <el-input v-model="editForm.tags_id"></el-input>
        </el-form-item>
        <el-form-item label="头像外链" prop="avatar">
          <el-input v-model="editForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="主页地址" prop="homepage">
          <el-input v-model="editForm.homepage"></el-input>
        </el-form-item>
        <el-form-item label="开班时间" prop="class_start_date">
          <el-input v-model="editForm.class_start_date"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="desc">
          <el-input v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleEdit" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        name: '',
        category_id: '',
        tags_id: '',
        avatar: '',
        homepage: '',
        class_start_date: '',
        desc: ''
      },
      editForm: {
        id: '',
        name: '',
        category_id: '',
        tags_id: '',
        avatar: '',
        homepage: '',
        class_start_date: '',
        desc: ''
      },
      addFormRules: {
        name: [
          {
            required: true,
            message: '请输入机构名',
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
            message: '请输入机构名',
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
      }
    }
  },
  created () {
    this.getTeamList()
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
    showEditDialog (row) {
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.category_id = row.category_id
      this.editForm.tags_id = row.tags_id
      this.editForm.avatar = row.avatar
      this.editForm.homepage = row.homepage
      this.editForm.class_start_date = row.class_start_date
      this.editForm.desc = row.desc
      this.editDialogVisible = true
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
        const { data: res } = await this.$http.post('admin/team', this.addForm)
        this.addLoading = false
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('添加机构成功')
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
        this.$message.success('更新机构成功')
        this.$refs.editFormRef.resetFields()
        this.editDialogVisible = false
        await this.getTeamList()
      })
    }
  }
}
</script>

<style scoped>

</style>
