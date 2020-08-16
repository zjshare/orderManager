<template>
  <el-container>
    <!-- 左侧边栏 -->
    <!-- 在开始标签里面添加router -->
    <el-aside width="200px">
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#333399"
        text-color="#CCCC00"
        active-text-color="#FF0033"
        router
        unique-opened
      >
        <!-- 从过滤的新数组中去获取 -->
        <div v-for="item in powerArr " :key="item.url">
          <!-- 单页面 -->
          <el-menu-item v-if="! item.children" :index="item.url">
            <i :class="item.icon"></i>

            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <!-- 折叠页面 -->
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 左边面包屑 -->
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 右边个人中心 -->
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/main/Login_item">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="logOut" style="color:rgb(87,153,228)">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ username }}</span>
          <!-- <a href="http://localhost:8080/#/main/Login_item">{{ username }}</a> -->
          <img style="width: 50px;border-radius: 50%" :src="headimg" />
        </div>
      </el-header>
      <!-- 二级路由区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { checktoken, accountInfo } from "@/api/apis";
export default {
  // 变量模块
  data() {
    return {
      headimg: "", //头像
      username: "", //用户名
      curhash: "", //当前hash值
      breadlist: [],
      list: [
        // 后台首页
        {
          url: "/main/index",
          icon: "el-icon-menu",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        // 订单管理
        {
          url: "/main/Order_manger",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        // 商品管理
        {
          url: "/main/Product",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          children: [
            { url: "/main/Product_list", name: "商品列表" },
            { url: "/main/Product_addItem", name: "商品添加" },
            { url: "/main/Product_category", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        //店铺管理
        {
          url: "/main/Store_manage",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        // 账号管理
        {
          url: "/main/Account",
          icon: "el-icon-coin",
          name: "账号管理",
          children: [
            { url: "/main/Account_accountList", name: "账号列表" },
            { url: "/main/Account_addAccount", name: "添加账号" },
            { url: "/main/Account_restAccount", name: "修改密码" },
          ],
          roles: ["super"],
        },
        // 销售统计
        {
          url: "/main/Sell",
          icon: "el-icon-receiving",
          name: "销售统计",
          children: [
            { url: "/main/Sell_statistics", name: "商品统计" },
            { url: "/main/Sell_order", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
    };
  },

  // 计算模块
  computed: {
    // 权限数组
    powerArr() {
      // 根据获取到的用户rule进行权限运算，返回运算完毕的数组
      // 运用filter过滤掉权限属性
      // 再让大盒子从这个过滤的新数组中去渲染
      let newArr = this.list.filter((item) => {
        // 返回从本地获取到包含的用户权限
        return item.roles.includes(localStorage.role);
      });
      // 将获取的新数组返回出去。
      return newArr;
    },
  },

  // 方法模块
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    //刷新个人信息
    refreshinfo() {
      //获取个人信息
      accountInfo(localStorage.id).then((res) => {
        // console.log(res.data.accountInfo.imgUrl);
        this.headimg = res.data.accountInfo.imgUrl;
      });
    },
    // 退出登录
    logOut() {
      this.$confirm("此操作将退出登录，是否继续", "系统温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/");
          localStorage.removeItem("token");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "暂不退出",
          });
        });
    },
  },
  // 创造阶段
  created() {
    this.curhash = this.$route.path; //当前HASH值得路由对象
    // token验证
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        // 返回码为0，登录有效。 将存储在本地的用户名取出来。
        this.username = localStorage.acc;
      } else {
        // 无效
        this.username = "请登录";
      }
    });
    //调用  刷新个人信息
    this.refreshinfo();
    // 3. 监听bus的传递事件
    this.$bus.$on("imguploadfinish", () => {
      this.refreshinfo(); //刷新头像
    });
    //初始化给二级导航赋值
    this.breadlist = this.$route.meta.breadlist;
  },
  //可以观察vue很多属性的变化(包括hash变化)
  watch: {
    //监听当前路由的变化
    //to: 要切换到哪里, from: 来自哪里
    // $route(to, from){
    $route(to) {
      this.breadlist = to.meta.breadlist;
    },
  },
};
</script>


<style lang="less" scoped>
//利用less变量，定义一个基础色，方便以后更改主体颜色
@base: #333399;

// @base: #f60;
html,
body {
  height: 100%;
}
.el-main {
  height: 100%;
  background-color: #f0f2f5;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: @base;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 消除外边框一像素
.el-menu {
  border: none;
  // border: 1px solid red;
}
</style>

