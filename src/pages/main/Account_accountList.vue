<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <div>
      <div class="title_div">账号列表</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="account" label="账号" width="160"></el-table-column>

        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组" width="160"></el-table-column>

        <!-- 创建时间 -->
        <!--   <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>-->
        <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑的模态框 -->
      <el-dialog width="460px" title="编辑账号" :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form style="width: 337px;" :model="editForm">
          <!-- 账号 -->
          <el-form-item label="账号" label-width="120px">
            <el-input v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 用户组 -->
          <el-form-item item label="用户组" label-width="120px">
            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>

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
      <!-- 按钮 -->
      <el-button
        type="danger"
        @click="toggleSelection([tableData[0],tableData[1], tableData[2]] )"
      >批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
// 引入时间处理模块
import { getChinatime } from "@/utils/utils";
import { accountList, dellAccount, batchDel, editorAccount } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [
        {
          account: "", //用户名
          userGroup: "", //用户组
          ctime: "", //创建时间
        },
      ],
      ctime: "",
      total: 0, //总条数
      pagesize: 5, //每页显示条数
      pagesizes: [5, 10, 15, 20], //可以切换的每页显示条数
      curpage: 1, //当前页数
      id: "",
      // currentPage: 2,
      // pageSize: 3,
      detelArray: [], //选中id数据数字
      // 编辑表单数据
      editForm: {
        account: "",
        userGroup: "",
      },
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
      uid: "",
    };
  },

  methods: {
    // 4.删除账号
    handleDelete(index, row) {
      //弹出确认删除框
      this.$confirm("即将删除此账号，确定吗?", "系统温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dellAccount(row.id).then((res) => {
            if (res.data.code == 0) {
              // 弹出提示信息
              this.$message({
                message: "用户删除成功!",
                type: "success",
              });
              // 调用函数 获取用户列表
              this.refreshTable();
              this.account = "";
              this.password = "";
              this.userGroup = "";
            } else {
              this.$message({
                message: "用户删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取选中的id 然后添加到数组
    handleSelectionChange(row) {
      for (const key in row) {
        this.detelArray.push(row[key].id);
      }
    },
    // 5.批量删除
    toggleSelection(rows) {
      // 转字符串后传参
      batchDel(JSON.stringify(this.detelArray)).then((res) => {
        if (res.data.code == 0) {
          // 调用函数 获取用户列表
          this.refreshTable();
        }
      });

      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 6.编辑 修改账号
    handleEdit(index, row) {
      this.dialogFormVisible = true; //显示模态框

      this.uid = row.id; //保存当前的id到变量，方便后面的saveEdit确定修改调用
    },
    // 确定修改
    saveEdit() {
      this.dialogFormVisible = false; // 隐藏模态框
      editorAccount(
        this.uid,
        this.editForm.account,
        this.editForm.userGroup
      ).then((res) => {
        if (res.data.code == 0) {
          // 弹出提示信息
          this.$message({
            message: "用户删除成功!",
            type: "success",
          });
          // 调用函数 获取用户列表
          this.refreshTable();
        }
      });
    },

    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshTable();
    },
    //页码发生变化  点击页码 跳转到其他页面 传入一个形参，代表当前页数
    handleCurrentChange(newpage) {
      this.curpage = newpage; //选择新的页码后，重新赋值当前页。
      this.refreshTable(); //然后重新调用获取列表刷新
    },

    // 3.获取用户列表   刷新表格数据
    refreshTable() {
      // 3.获取用户列表
      accountList(this.curpage, this.pagesize).then((res) => {
        // 先转换
        let arr = res.data.data;
        for (let obj of arr) {
          // 调用时间转换函数
          obj.ctime = getChinatime(obj.ctime);
        }
        // 本页数据
        this.tableData = res.data.data;
        // 总商品条数
        this.total = res.data.total;
      });
    },
  },
  created() {
    console.log(this.curpage);
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
.title_div {
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
//  分页
.el-pagination {
  margin: 20px;
}
</style>