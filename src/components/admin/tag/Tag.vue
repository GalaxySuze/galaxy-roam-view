<template>
  <div class="list-box">
    <el-row class="list-row">
      <!-- 面包屑导航 -->
      <el-col :span="18">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>标签列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- 功能栏 -->
      <el-col :span="6" class="add-btn">
        <el-button type="primary" size="small" icon="iconfont iconfont-tianjia-" @click="showAddDialog">&nbsp;添加标签
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-card class="list-card">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input placeholder="搜索标签" v-model="queryInfo.tag" clearable @clear="getTagList"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="success" icon="el-icon-search" :loading="searchLoading" @click="getTagList">搜索
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <el-table
          :data="tagList"
          stripe>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签名称">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间">
            <template v-slot="{ row }">
              {{ row.created_at | DateFormat }}
            </template>
          </el-table-column>
          <el-table-column
            width="260"
            fixed="right"
            label="操作">
            <template v-slot="{ row }">
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
      title="添加标签信息"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="标签名称" prop="title">
          <el-input v-model="addForm.tag"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleAdd" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        tag: '', // 搜索项
        page: 1, // 当前页
        pageSize: 10 // 当前页数显示条数
      },
      tagList: [],
      total: 0,
      labelPosition: 'right',
      searchLoading: false,
      addLoading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        tag: ''
      },
      editForm: {
        id: '',
        tag: ''
      },
      addFormRules: {
        tag: [
          {
            required: true,
            message: '请输入标签名',
            trigger: 'blur'
          }
        ]
      },
      editFormRules: {
        tag: [
          {
            required: true,
            message: '请输入标签名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    // 获取列表数据
    async getTagList () {
      this.searchLoading = true
      const { data: res } = await this.$http.get('admin/tag/list', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.tagList = res.data.list
      this.total = res.data.total
      this.searchLoading = false
    },
    showAddDialog () {
      this.addForm = { tag: '' }
      this.addDialogVisible = true
    },
    // 删除处理
    async handleDelete (id) {
      const confirmRes = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmRes === 'confirm') {
        const { data: res } = await this.$http.delete(`admin/tag/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('删除成功')
        await this.getTagList()
      }
    },
    // 分页数量变更处理
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTagList()
    },
    // 分页当前页跳转处理
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getTagList()
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
        const { data: res } = await this.$http.post('admin/tag', this.addForm)
        this.addLoading = false
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('添加标签成功')
        this.addDialogVisible = false
        this.$refs.addFormRef.resetFields()
        await this.getTagList()
      })
    }
  }
}
</script>

<style scoped>

</style>
