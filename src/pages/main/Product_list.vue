<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <div>
      <div class="title_div">商品列表</div>
      <!-- 表单    :data="datalist" 获取渲染数据源 -->
      <el-table :data="datalist" v-loading="isloading">
        <!-- 折叠菜单 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img style="width: 80px;height:80px" :src="GET_ITEMS_IMG + scope.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 21.修改商品 模态框 -->
      <el-dialog width="460px" title="修改商品" :visible.sync="editflag">
        <!-- 商品名称 -->
        <el-form label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="editobj.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select
              style="width:300px; margin:20px"
              v-model="editobj.category"
              placeholder="商品分类"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格">
            <el-input-number
              style="width:180px; margin:20px"
              v-model="editobj.price"
              :min="1"
              :max="99999"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片">
            <el-upload
              list-type="text"
              :action="ITEMS_IMG_UPLOAD"
              :on-success="handleAvatarSuccess"
            >
              <i v-show="!editobj.imgUrl" class="el-icon-plus"></i>
              <img
                style="width: 100px"
                v-show="editobj.imgUrl"
                :src="GET_ITEMS_IMG  + editobj.imgUrl"
              />
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input
              style="width:300px; margin:18px"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="editobj.goodsDesc"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveresetEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curpage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  list,
  del,
  edit,
  categories,
  ITEMS_IMG_UPLOAD,
  GET_ITEMS_IMG,
} from "@/api/apis";
export default {
  data() {
    return {
      datalist: [], //数据源
      total: 0, //总条数
      curpage: 1, //当前页数
      pagesize: 5, //每页显示条数
      pagesizes: [5, 10, 15, 20], //可以切换的每页显示条数
      GET_ITEMS_IMG: "", //图片IP地址
      isloading: false, //是否显示加载动画

      editID: "", //修改id
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
      editflag: false,
      imgUrl: "",
      name: "", //商品名称
      goodsDesc: "", //商品描述
      category: "", //商品分类
      price: "", //商品价格
      // 回填数据
      editobj: {}, //当前编辑数据
      options: [], //分类数组
    };
  },
  methods: {
    //  16.获取表单    刷新表格数据
    refreshTable() {
      this.isloading = true;
      list(this.curpage, this.pagesize).then((res) => {
        this.total = res.data.total; //总条数
        this.datalist = res.data.data; //数据源
        this.isloading = false; //加载关闭
      });
    },
    //条数发生变化
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshTable();
    },

    //页码发生变化  点击页码 跳转到其他页面 传入一个形参，代表当前页数
    handleCurrentChange(newpage) {
      this.curpage = newpage; //选择新的页码后，重新赋值当前页。
      this.refreshTable(); //然后重新调用获取列表刷新
    },

    // 20.删除商品  //传入index, row  index确认位置，找到id
    handleDelete(index, row) {
      //弹出确认删除框
      this.$confirm("即将删除该商品，确定吗?", "系统温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            // 弹出删除成功提示
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 删除成功，刷新列表
            this.refreshTable();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 21.修改商品
    //编辑
    handleEdit(index, row) {
      //获取分类数据
      categories().then((res) => {
        this.options = res.data.categories;
      });
      this.editobj = { ...row };
      console.log(this.editobj);

      this.editflag = true; //显示模态框
    },
    // 保存修改 发送请求
    saveresetEdit() {
      // 发送修改请求
      console.log(this.editobj);
      // 发送请求
      delete this.editobj.rating;
      delete this.editobj.ratings;
      delete this.editobj.sellCount;

      edit(this.editobj).then((res) => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        // 调用函数 获取用户列表
        this.refreshTable();
      });
      this.editflag = false; //隐藏模态框
    },

    //图片上传成功回调
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.editobj.imgUrl = res.imgUrl;
      }
    },
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    // 调用函数 获取用户列表
    this.refreshTable();
  },
};
</script>

<style lang="less" scoped>
.bgc {
  background-color: #ffffff;
  padding: 20px;
}
// 头部样式
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 小标题
.title_div {
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
// 表格样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>