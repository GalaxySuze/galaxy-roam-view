<template>
  <div class="list-box">
    <el-row class="list-row">
      <!-- 面包屑导航 -->
      <el-col :span="18">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- 功能栏 -->
      <el-col :span="6" class="add-btn">
        <el-button type="primary" size="small" icon="iconfont iconfont-tianjia-" @click="addDialogVisible = true">&nbsp;添加用户</el-button>
      </el-col>
      <el-col :span="24">
        <el-card class="list-card">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input placeholder="搜索邮箱" v-model="queryInfo.email" clearable @clear="getUserList"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="搜索用户名" v-model="queryInfo.username" clearable @clear="getUserList"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="success" icon="el-icon-search" :loading="searchLoading" @click="getUserList">搜索
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <el-table
          :data="usersList"
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
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
            <template v-slot="{ row }">
              <el-switch
                @change="stateChange(row)"
                v-model="row.state"
                active-color="#13ce66">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            width="260"
            fixed="right"
            label="操作">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="light" content="修改" placement="top" :enterable="false">
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="handleEdit(row)"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="删除" placement="top" :enterable="false">
                <el-button type="danger" size="medium" icon="el-icon-delete" @click="handleDelete(row)"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" size="medium" icon="el-icon-setting" @click="handleSetting(row)"
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
      title="添加用户"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="头像外链" prop="avatar">
          <el-input v-model="addForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addUser" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱地址'))
    }
    return {
      queryInfo: {
        email: '', // 搜索邮箱
        username: '', // 搜索用户名
        page: 1, // 当前页
        pageSize: 10 // 当前页数显示条数
      },
      usersList: [],
      total: 0,
      labelPosition: 'right',
      searchLoading: false,
      addLoading: false,
      addDialogVisible: false,
      addForm: {
        username: '',
        email: '',
        avatar: '',
        password: ''
      },
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      this.searchLoading = true
      const { data: res } = await this.$http.get('admin/user/list', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.usersList = res.data.list
      this.total = res.data.total
      this.searchLoading = false
    },
    handleEdit (row) {
    },
    handleDelete (row) {
    },
    handleSetting (row) {
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getUserList()
    },
    async stateChange (row) {
      const { data: res } = await this.$http.put(`admin/user/${row.id}/state/${row.state}`)
      if (res.meta.status !== 200) {
        row.state = !row.state
        return this.$message.error(res.meta.msg)
      }
      return this.$message.success('用户状态更新成功')
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    addUser () {
      this.addLoading = true
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('admin/user', this.addForm)
        this.addLoading = false
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('添加用户成功')
        this.addDialogVisible = false
        await this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
