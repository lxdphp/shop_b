<template>
  <div class="app-container">
    <div>
      <el-button type="text" size="small" @click="createGoods()">创建商品</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      width="100%"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="所属分类">
        <template slot-scope="scope">
          {{ scope.row.category_name }}
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <img :src="scope.row.img" width="100" height="100">
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.des }}
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
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
          <!-- <el-button @click="infoGoods(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small" @click="delGoods(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="创建商品" :visible.sync="dialogFormVisible" width="100%">
      <el-form :model="form">
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品价格:" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品图片:" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:7001/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="form.category_id" placeholder="请选择商品分类">
            <el-option v-for="(item,index) in categorylist" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoods()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getList, add, del, getinfo } from '@/api/goods'
import { categoryList } from '@/api/category'
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
      imageUrl: '',
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        title: '',
        price: '',
        des: '',
        category_id: ''
      },
      categorylist: [],
      image: ''
    }
  },
  created() {
    this.fetchData()
    this.getcategorylist()
  },
  methods: {
    getcategorylist() {
      categoryList().then(response => {
        this.categorylist = response.data.rows
      })
    },
    handleAvatarSuccess(res, file) {
      console.log('file', res)
      this.image = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 200

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.rows
        this.listLoading = false
      })
    },
    handleClick(row) {
      console.log(row)
    },
    createGoods() {
      this.dialogFormVisible = true
    },
    addGoods() {
      this.form.img = this.image
      console.log(this.form, this.image)
      add(this.form).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
      }).catch(() => {

      })
    },
    delGoods(data) {
      const id = data.id
      del({ id }).then(() => {
        this.fetchData()
      }).catch(() => {

      })
    },
    infoGoods(data) {
      const id = data.id
      getinfo({ id }).then(() => {
      }).catch(() => {

      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
