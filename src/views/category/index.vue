<template>
  <div class="app-container">
    <div>
      <el-button type="text" size="small" @click="createCategory()">创建分类</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="分类名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small" @click="delCategory(scope.row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-dialog title="创建分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择一级分类">
            <el-option label="分类1" value="shanghai"></el-option>
            <el-option label="分类二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import { getList, add, del } from '@/api/category'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.rows
        this.listLoading = false
      })
    },

    addCategory() {
      add(this.form).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
      }).catch(() => {

      })
    },
    delCategory(data) {
      const id = data.id;
      del({ id }).then(() => {
        this.fetchData()
      }).catch(() => {

      })
    },
    handleClick(row) {
      console.log(row)
    },
    createCategory() {
      this.dialogFormVisible = true
    }
  }
}
</script>
