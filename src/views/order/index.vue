<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      width="100%"
    >
      <el-table-column align="center" label="购买者订单ID" width="50">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="购买者手机号">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看详细订单内容</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="detailxianshi" width="100%">
      <el-table
        v-loading="datailLoading"
        :data="detaillist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="购买者订单ID" width="200">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="购买者手机号">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            {{ scope.row.good_name }}
          </template>
        </el-table-column>
        <el-table-column label="商品数量">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.created_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
import { getList, getinfo } from '@/api/gouwuche'

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
      detailxianshi: false,
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
      },
      detaillist: [],
      detailLoading: false
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
    getdetail(data) {
      const id = data.id
      getinfo().then(response => {
        this.detaillist = response.data.rows
        this.detailLoading = false
      })
    },
    handleClick(row) {
      this.detailLoading = true
      this.detailxianshi = true
      const id = row.id
      getinfo({ id }).then(response => {
        this.detaillist = response.data.rows
        this.detailLoading = false
      })
      console.log(row)
    },
    createCategory() {

    }
  }
}
</script>
