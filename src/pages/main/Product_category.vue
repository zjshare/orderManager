<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <div>
      <div class="title_div">
        <div>商品分类</div>
        <!-- 添加分类 -->
        <el-button @click="clickBtn" type="primary">添加分类</el-button>
      </div>

      <!-- 表单 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column sortable prop="id" label="序号"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <!-- 开关 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加分类的模态框 -->
      <el-dialog width="460px" title="添加分类" :visible.sync="dialogFormVisible">
        <el-form label-width="80px">
          <el-form-item label="添加分类">
            <el-input v-model="cateName"></el-input>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-switch v-model="state"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改分类的模态框 -->
      <!--    <el-dialog width="460px" title="添加分类" :visible.sync="editflag">
        <el-form label-width="80px">
          <el-form-item label="修改分类">
            <el-input v-model="resetcateName"></el-input>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-switch v-model="state"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveresetEdit">确 定</el-button>
        </div>
      </el-dialog>-->
      <!-- 分页 -->
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
import { addCate, cateList, delCate, editCate } from "@/api/apis";
export default {
  data() {
    return {
      value: true,
      tableData: [
        {
          id: "", //序号   来自服务器返回的值   所以对应返回的属性名
          cateName: "", //分类  来自服务器返回的值  所以对应返回的属性名
        },
      ],
      total: 0, //总条数
      pagesize: 5, //每页显示条数
      pagesizes: [5, 10, 15, 20], //可以切换的每页显示条数
      curpage: 1, //当前页数
      id: "",
      state: true,
      cateName: "",
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
      editflag: false,
      resetcateName: "", //修改分类
      editID: "",
    };
  },
  methods: {
    // 编辑分类 显示模态框
    handleEdit(scope) {
      console.log(scope.row.isedit);
      if (scope.row.isedit) {
        //发送请求，修改数据
        console.log(scope.row);
        editCate(scope.row).then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            this.$message({
              message: "玉团系统提示：店铺分类修改成功",
              type: "success",
            });
            scope.row.isedit = false;
          }
        });
      } else {
        //开启编辑状态
        scope.row.isedit = true;
      }
      this.editID = scope.row.id; // 存一个id
      this.editflag = true; //显示模态框
      // 15.发送修改类名请求
    },
    /*    // 编辑分类  确认
    saveresetEdit() {
      this.editflag = false; //隐藏模态框

      // 发送编辑分类请求
      editCate(this.editID, this.resetcateName, this.state).then((res) => {
        //重新调用列表
        this.getData();
      });
    },
 */
    // 添加分类
    clickBtn() {
      this.dialogFormVisible = true; //显示模态框
    },
    // 确认  添加分类
    saveEdit() {
      addCate(this.cateName, this.state).then((res) => {
        if (res.data.code == 0) {
          // 弹出提示信息
          this.$message({
            message: "分类添加成功!",
            type: "success",
          });
          //重新调用列表
          this.getData();
        }
      });
      // 清空输入框
      (this.cateName = ""),
        // 隐藏模态框
        (this.dialogFormVisible = false);
    },

    //删除
    handleDelete(index, row) {
      //弹出确认删除框
      this.$confirm("即将删除此分类，确定吗?", "系统温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 14.删除分类
        delCate(row.id).then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            // 弹出提示信息
            this.$message({
              message: "删除分类成功!",
              type: "success",
            });
            //重新调用列表
            this.getData();
          }
        });
      });
      console.log(row.id);
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.getData();
    },
    handleCurrentChange(newpage) {
      this.curpage = newpage; //选择新的页码后，重新赋值当前页。
      this.getData(); //然后重新调用获取列表刷新
    },
    async getData() {
      await cateList(this.curpage, this.pagesize).then((res) => {
        let dataarr = res.data.data; //数据源
        for (let i = 0; i < dataarr.length; i++) {
          dataarr[i].state = dataarr[i].state == 1;
          dataarr[i].isedit = false;
        }
        // 本页数据
        this.tableData = res.data.data;
        // 总商品条数
        this.total = res.data.total;
      });
    },
  },
  created() {
    // console.log(this.currentPage);
    this.getData();
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
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
//  分页
.el-pagination {
  margin: 20px;
}
</style>