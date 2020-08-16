import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue"; //引进来了后就要去下面routes配路由
// import Main from "../pages/Main.vue"//因为进来不用立即加载，所有采用懒加载
import { checktoken } from "@/api/apis";

Vue.use(VueRouter);
// 定义router  然后底部暴露出去
var router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/main",
      name: "Main",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 懒加载, 当hash值被匹配成功时,才会动态加载此页面
      //  箭头函数，括号里填写目标,没有vue后缀。
      component: () => import("../pages/Main"),
      // 二级子路由 children
      children: [
        // 首页
        {
          path: "/main/index",
          name: "/main/index",
          component: () => import("../pages/main/index"),
          // 自定义数据
          meta: { breadlist: ["首页"] },
        },

        // -------------------------------  账号管理 ----------------------------------//
        // 账号管理 修改密码
        {
          path: "/main/Account_restAccount",
          name: "/main/Account_restAccount",
          component: () => import("../pages/main/Account_restAccount"),
          meta: { breadlist: ["账号管理", "修改用户"] },
        },
        // 账号管理 添加账号
        {
          path: "/main/Account_addAccount",
          name: "/main/Account_addAccount",
          component: () => import("../pages/main/Account_addAccount"),
          meta: { breadlist: ["账号管理", "添加用户"] },
        },
        // 账号管理 账号列表
        {
          path: "/main/Account_accountList",
          name: "/main/Account_accountList",
          component: () => import("../pages/main/Account_accountList"),
          meta: { breadlist: ["账号管理", "用户列表"] },
        },
        // 首页 商品分类
        {
          path: "/main/Product_category",
          name: "/main/Product_category",
          component: () => import("../pages/main/Product_category"),
          meta: { breadlist: ["商品管理", "商品分类"] },
        },

        // 商品管理-添加商品
        {
          path: "/main/Product_addItem",
          name: "/main/Product_addItem",
          component: () => import("../pages/main/Product_addItem"),
          meta: { breadlist: ["商品管理", "商品添加"] },
        },
        // 首页 商品列表
        {
          path: "/main/Product_list",
          name: "/main/Product_list",
          component: () => import("../pages/main/Product_list"),
          meta: { breadlist: ["商品管理", "商品列表"] },
        },
        // 订单管理
        {
          path: "/main/Order_manger",
          name: "/main/Order_manger",
          component: () => import("../pages/main/Order_manger"),
          // 自定义数据
          meta: { breadlist: ["订单管理"] },
        },
        // 店铺管理
        {
          path: "/main/Store_manage",
          name: "/main/Store_manage",
          component: () => import("../pages/main/Store_manage"),
          // 自定义数据
          meta: { breadlist: ["店铺管理"] },
        },
        //    销售统计 商品统计
        {
          path: "/main/Sell_statistics",
          name: "/main/Sell_statistics",
          component: () => import("../pages/main/Sell_statistics"),
          meta: { breadlist: ["销售统计", "商品统计"] },
        },
        //    销售统计 订单统计
        {
          path: "/main/Sell_order",
          name: "/main/Sell_order",
          component: () => import("../pages/main/Sell_order"),
          meta: { breadlist: ["销售统计", "订单统计"] },
        },
        //  个人中心
        {
          path: "/main/Login_item",
          name: "/main/Login_item",
          component: () => import("../pages/main/Login_item"),
        },
      ],
    },
  ],
});

// 在切换路由前  to跳转去哪里  from来自哪里(哪个hash地址)  next放行(next是一个函数)
router.beforeEach((to, from, next) => {
  //to: 要跳转到的路由
  //from: 我来自于哪里
  console.log(from);

  // 只要不是默认登录,都开启路由验证
  if (to.path != "/") {
    // 验证用户是否登录
    checktoken(localStorage.token).then((res) => {
      //在登录状态
      if (res.data.code == 0) next();
      //让它正常跳转
      //不在登录状态
      else next("/");
    });
  } else next();

  //让路由继续跳转
  // next()
});
export default router; //暴露router出去 */
