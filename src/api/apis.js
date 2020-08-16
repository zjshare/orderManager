// 引入axios
import axios from "axios";

// 设置 基本请求路径（defaults）
axios.defaults.baseURL = "http://127.0.0.1:5000";

//商品图片上传接口地址
export const ITEMS_IMG_UPLOAD =
  axios.defaults.baseURL + "/goods/goods_img_upload";
//获取商品图片地址
export const GET_ITEMS_IMG = axios.defaults.baseURL + "/upload/imgs/goods_img/";
// ````````````````````````````店铺管理  图片地址``````````````````````````````
//上传店铺头像
export const UPLOAD_SHOP_IMG = axios.defaults.baseURL + "/shop/upload";
//获取店铺图片地址
export const GET_SHOPS_IMG = axios.defaults.baseURL + "/upload/shop/";

//1. 登录  把login函数暴露出去，在Login.vue里面引用这个函数
export var login = (account, password) =>
  // 请求路径    用户名  密码
  axios.post("/users/checkLogin", { account, password });

//2. 添加账号  addAccount.vue里面引用这个函数
export var addAccount = (account, password, userGroup) =>
  axios.post("/users/add", { account, password, userGroup });

//3. 获取账号列表
// 当前页数 每页条数
export var accountList = (currentPage, pageSize) =>
  axios.get("/users/list", { params: { currentPage, pageSize } });

// 4.删除账号
export var dellAccount = (id) => axios.get("/users/del", { params: { id } });

// 5.批量删除账号
export var batchDel = (ids) =>
  axios.get("/users/batchdel", { params: { ids } });

// 6.修改账号
export var editorAccount = (id, account, userGroup) =>
  axios.post("/users/edit", { id, account, userGroup });

// 7.检查旧密码是否正确
export var checkOldPwd = (oldPwd, id) =>
  axios.get("/users/checkoldpwd", { params: { oldPwd, id } });

// 8.修改密码
export var editPwd = (newPwd, id) =>
  axios.post("/users/editpwd", { newPwd, id });

// 9.获取账号（个人中心）信息
export var accountInfo = (id) =>
  axios.get("/users/accountinfo", { params: { id } });

// ☆商品管理模块
// 12.添加分类
export var addCate = (cateName, state) =>
  axios.post("/goods/addcate", { cateName, state });

// 13.获取分类
export var cateList = (currentPage, pageSize) =>
  axios.get("/goods/catelist", { params: { currentPage, pageSize } });

// 14.删除分类
export var delCate = (id) => axios.get("/goods/delcate", { params: { id } });

// 15.修改分类
export var editCate = (params) => axios.post("/goods/editcate", params);

// 16.查询所有分类名称
export var categories = () => axios.get("/goods/categories", { params: {} });

// 18.添加商品
export var add = (name, category, price, imgUrl, goodsDesc) =>
  axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc });

// 19.获取商品列表
export var list = (currentPage, pageSize) =>
  axios.get("/goods/list", { params: { currentPage, pageSize } });

// 20.删除商品
export var del = (id) => axios.get("/goods/del", { params: { id } });

// 21.修改商品
export var edit = (params) => axios.post("/goods/edit", params);

// 22.获取订单列表(带查询功能)
export var orderList = (params) => axios.get("/order/list", { params });

// 24.获取订单详情
export var orderDetail = (id) => axios.get("/order/detail", { params: { id } });

// 25.修改订单
export var orderEdit = (params) => axios.post("/order/edit", params);

// ```````````````````````````☆店铺管理模块：``````````````````````````````

// 26.获取店铺详情
export var shopInfo = () => axios.get("/shop/info", { params: {} });

// 28.店铺内容修改
export var shopEdit = (params) => axios.post("/shop/edit", params);

//29.首页echarts报表
export var echarts_totaldata = () => axios.get("/order/totaldata");

//30.订单统计
export var echarts_orderdata = (date) =>
  axios.get("/order/ordertotal", { params: { date } });

//11.验证token   token：用户令牌
export var checktoken = (token) =>
  axios.get("users/checktoken", { params: { token } });
