<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <!-- 订单信息  -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input style="width:100%" v-model="orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input style="width:100%" v-model="consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input style="width:100%" v-model="phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 日期查询 -->
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickSearch" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="gridData" border style="margin-top:20px" v-loading="loadDate">
      <el-table-column fixed prop="orderNo" label="订单号" align="center"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="200" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="160" align="center"></el-table-column>
      <el-table-column prop="consignee" label="收货人" align="center"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" align="center"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="200" align="center"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" align="center"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" align="center"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editOrder(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 24.查看详情 模态框 -->
    <el-dialog width="460px" title="订单详情" :visible.sync="inforFlag" v-loading="isloading">
      <!-- 订单号 -->
      <el-form label-width="100px" disabled>
        <el-form-item label="订单号">
          <el-input :value="inforLists.orderNo" placeholder="商品名称"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input :value="inforLists.orderTime" placeholder="下单时间"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input :value="inforLists.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input :value="inforLists.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <!-- 配送地址 -->
        <el-form-item label="配送地址">
          <el-input :value="inforLists.deliverAddress" placeholder="配送地址"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-input :value="inforLists.deliveryTime" placeholder="送达时间"></el-input>
        </el-form-item>
        <!-- 用户备注 -->
        <el-form-item label="用户备注">
          <el-input :value="inforLists.remarks" placeholder="用户备注"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额">
          <el-input :value="inforLists.orderAmount" placeholder="订单金额"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-input :value="inforLists.orderState" placeholder="订单状态"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="inforSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 25.编辑商品 模态框 -->
    <el-dialog width="460px" title="修改商品" :visible.sync="editflag">
      <!-- 订单号 -->
      <el-form label-width="100px">
        <el-form-item label="订单号">
          <el-input v-model="editobj.orderNo" placeholder="商品名称"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input v-model="editobj.orderTime" placeholder="下单时间"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="editobj.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input v-model="editobj.phone" placeholder="收货人"></el-input>
        </el-form-item>
        <!-- 配送地址 -->
        <el-form-item label="配送地址">
          <el-input v-model="editobj.deliverAddress" placeholder="配送地址"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-input v-model="editobj.deliveryTime" placeholder="送达时间"></el-input>
        </el-form-item>
        <!-- 用户备注 -->
        <el-form-item label="用户备注">
          <el-input v-model="editobj.remarks" placeholder="用户备注"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额">
          <el-input v-model="editobj.orderAmount" placeholder="订单金额"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-input v-model="editobj.orderState" placeholder="订单状态"></el-input>
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
      :current-page="curPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// 引入时间处理模块
import { getChinatime } from "@/utils/utils";
import { orderList, orderDetail, orderEdit } from "@/api/apis";
export default {
  data() {
    return {
      //信息查看
      gridData: [],
      dialogTableVisible: false,
      loadDate: false,
      option: ["已完成", "派送中", "已受理", "全部"],

      //查询数据
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //手机号
      orderState: "", //订单状态
      date: [],

      curPage: 1, //当前页数
      pageSize: 5, //每页显示条数
      pageSizes: [5, 10, 15, 20], //可以切换的每页显示条数
      total: 0, //总条数
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
      inforFlag: false, //查看详情隐藏
      editflag: false, //隐藏
      isloading: false, //是否显示加载动画
      // 订单详情
      inforLists: {}, //订单详情
      editobj: {}, //当前编辑数据
    };
  },
  methods: {
    //条数发生变化
    handleSizeChange(newpagesize) {
      this.pageSize = newpagesize;
      // 调用函数 获取用户列表
      this.refreshTable();
    },

    //页码发生变化  点击页码 跳转到其他页面 传入一个形参，代表当前页数
    handleCurrentChange(newpage) {
      this.curPage = newpage;

      // 在点击翻页时, 把额外的查询数据一起带过去
      this.refreshTable(this.paramsex);
    },

    clickSearch() {
      //如果用户选择了时间

      let { orderNo, consignee, phone, orderState } = this;

      //额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date.length > 0)
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);

      this.paramsex = paramsex;

      this.refreshTable(this.paramsex);
    },

    refreshTable(paramsex) {
      orderList({
        currentPage: this.curPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        console.log(res.data.data);

        for (let obj of res.data.data) {
          console.log(obj); //先把res.data.data里面的对象obj遍历出来，obj.deliveryTime得到对应键值，然后传入处理函数。
          obj.deliveryTime = getChinatime(obj.deliveryTime); //然后传入处理函数，再给原对象赋值。
          obj.orderTime = getChinatime(obj.orderTime);
        }

        this.gridData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 24.查看订单详情
    handleClick(row) {
      this.inforFlag = true; //显示模态框
      this.isloading = true; //显示加载框
      orderDetail(row.id).then((res) => {
        this.inforLists = res.data.data; //给订单详情赋值
        this.inforLists.deliveryTime = getChinatime(
          this.inforLists.deliveryTime
        ); //把时间对象传入处理函数，然后赋值给原对象。
        this.inforLists.orderTime = getChinatime(this.inforLists.orderTime);
        this.isloading = false; //加载关闭
      });
    },
    // 关闭订单详情
    inforSure() {
      this.inforFlag = false; //关闭模态框
    },

    // 25.编辑订单
    editOrder(row) {
      // console.log(row);
      this.editobj = { ...row };
      this.editflag = true; //显示模态框
      console.log(this.editobj);
    },
    saveresetEdit() {
      orderEdit(this.editobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        // 调用函数 获取用户列表
        this.refreshTable();
        console.log(res);
      });
      this.editflag = false; //关闭模态框
    },
  },
  created() {
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
.input_el {
  display: flex;
  //   width: 24%;
  justify-content: space-around;
  align-items: center;
}
.el-input {
  width: 100%;
}
.el-button {
  margin-left: 30px;
}
.el-table-column {
  text-align: center;
}
//  分页
.el-pagination {
  margin: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>