<template>
  <div class="list-box">
    <el-row class="list-row">
      <!-- 面包屑导航 -->
      <el-col :span="18">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>站点列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- 功能栏 -->
      <el-col :span="6" class="add-btn">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="showAddDialog">添加站点</el-button>
      </el-col>
      <el-col :span="24">
        <el-card class="list-card">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input placeholder="搜索站点名" v-model="queryInfo.name" clearable @clear="getSiteList"></el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="queryInfo.category_id" clearable placeholder="请选择分类" @clear="getSiteList">
                <el-option
                  v-for="queryCateItem in categoryList"
                  :key="queryCateItem.id"
                  :label="queryCateItem.title"
                  :value="queryCateItem.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="queryInfo.tags_id" clearable filterable placeholder="请选择标签" @clear="getSiteList">
                <el-option
                  v-for="queryTagItem in tagList"
                  :key="queryTagItem.id"
                  :label="queryTagItem.tag"
                  :value="queryTagItem.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="success" icon="el-icon-search" :loading="searchLoading" @click="getSiteList">搜索
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <el-table
          :data="siteList"
          stripe>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            width="100px"
            prop="url"
            label="地址">
            <template v-slot="{ row }">
              <el-link type="info" disabled href="#" v-if="!row.url">暂无地址</el-link>
              <el-link type="primary" :href="row.url" v-if="row.url" target="_blank">点击访问</el-link>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            prop="thumb"
            label="缩略图">
            <template v-slot="{ row }">
              <el-thumb :size="30" icon="el-icon-user-solid" v-if="!row.thumb"></el-thumb>
              <el-thumb :size="30" :src="row.thumb" v-if="row.thumb"></el-thumb>
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
          :page-sizes="[5, 10, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹框 -->
    <el-dialog
      title="添加站点信息"
      :fullscreen="dialogFullscreen"
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="批量导入">
          <el-upload
            :action="importURL"
            :limit="1"
            :on-success="handleSuccess"
            :headers="headerObj">
            <el-button type="primary" size="medium" icon="el-icon-upload2">上传Excel</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="站点名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="站点分类" prop="category_id">
          <el-select v-model="addForm.category_id" clearable placeholder="请选择">
            <el-option
              v-for="cateItem in categoryList"
              :key="cateItem.id"
              :label="cateItem.title"
              :value="cateItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点标签" prop="tags_id">
          <el-select v-model="addForm.tags_id" multiple clearable placeholder="请选择">
            <el-option
              v-for="tagItem in tagList"
              :key="tagItem.id"
              :label="tagItem.tag"
              :value="tagItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点地址" prop="url">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumb">
          <el-input v-model="addForm.thumb"></el-input>
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
      title="修改站点信息"
      :fullscreen="dialogFullscreen"
      :close-on-click-modal="false"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="editDialogClose">
      <!-- 内容主题区域 -->
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="100px"
               :label-position="labelPosition">
        <el-form-item label="站点名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="站点分类" prop="category_id">
          <el-select v-model="editForm.category_id" clearable placeholder="请选择">
            <el-option
              v-for="editCateItem in categoryList"
              :key="editCateItem.id"
              :label="editCateItem.title"
              :value="editCateItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点标签" prop="tags_id">
          <el-select v-model="editForm.tags_id" multiple clearable placeholder="请选择">
            <el-option
              v-for="editTagItem in tagList"
              :key="editTagItem.id"
              :label="editTagItem.tag"
              :value="editTagItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点地址" prop="url">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumb">
          <el-input v-model="editForm.thumb"></el-input>
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
      siteList: [],
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
        thumb: '',
        url: '',
        desc: ''
      },
      editForm: {
        id: '',
        name: '',
        category_id: '',
        tags_id: [],
        thumb: '',
        url: '',
        desc: ''
      },
      addFormRules: {
        name: [
          {
            required: true,
            message: '请输入站点名',
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入站点地址',
            trigger: 'blur'
          }
        ]
      },
      editFormRules: {
        name: [
          {
            required: true,
            message: '请输入站点名称',
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入站点地址',
            trigger: 'blur'
          }
        ]
      },
      categoryList: [],
      tagList: [],
      importURL: 'http://galaxyroam.test:8080/api/admin/site/import',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    this.getSiteList()
    this.getFormInitData()
  },
  methods: {
    // 获取列表数据
    async getSiteList () {
      this.searchLoading = true
      const { data: res } = await this.$http.get('admin/site/list', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        this.searchLoading = false
        return this.$message.error(res.meta.msg)
      }
      this.siteList = res.data.list
      this.total = res.data.total
      this.searchLoading = false
    },
    async showEditDialog (row) {
      row.show_loading = true
      const { data: res } = await this.$http.get(`admin/site/${row.id}`)
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
    },
    async getFormInitData () {
      this.categoryList = []
      this.tagList = []
      const { data: res } = await this.$http.get('admin/site/form-init-data')
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
        const { data: res } = await this.$http.delete(`admin/site/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('删除成功')
        await this.getSiteList()
      }
    },
    // 分页数量变更处理
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getSiteList()
    },
    // 分页当前页跳转处理
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getSiteList()
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
        const { data: res } = await this.$http.post('admin/site', newForm)
        this.addLoading = false
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('添加站点成功')
        this.$refs.addFormRef.resetFields()
        this.addDialogVisible = false
        await this.getSiteList()
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
        const { data: res } = await this.$http.put(`admin/site/${this.editForm.id}`, this.editForm)
        this.addLoading = false
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('更新站点成功')
        this.$refs.editFormRef.resetFields()
        this.editDialogVisible = false
        await this.getSiteList()
      })
    },
    // 上传成功回调
    handleSuccess (response) {
      this.$message.success(`导入完毕: 导入总条数[${response.data.total}], 成功[${response.data.success}]条, 失败[${response.data.fail}]条`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin-left: 5px;
}
</style>
