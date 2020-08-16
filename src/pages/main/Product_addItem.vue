<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <div>
      <div class="title_div">商品添加</div>
      <div class="el-input">
        <span style="padding-top:20px;font-size:16px">商品名称</span>
        <el-input style="width:400px; margin:20px" v-model="name" placeholder="商品名称"></el-input>
      </div>
      <br />
      <!-- 商品分类 -->
      <div>
        <span>商品分类</span>
        <el-select style="width:300px; margin:20px" v-model="selectvalue" placeholder="商品分类">
          <el-option
            v-for="item in categories"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </div>
      <br />
      <!-- 商品价格 -->
      <label>
        <span>商品价格</span>
        <el-input-number
          style="width:180px; margin:20px"
          v-model="price"
          @change="handleChange"
          :min="0"
          :max="99999"
          label="描述文字"
        ></el-input-number>
      </label>
      <br />
      <!-- 商品图片 -->
      <div class="upload">
        <span style="margin-right:20px">商品图片</span>
        <el-upload
          :action="ITEMS_IMG_UPLOAD"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>

      <!-- 商品描述 -->
      <div class="el-input">
        <span style="padding-top:20px;font-size:16px">商品描述</span>
        <el-input
          style="width:300px; margin:18px"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="goodsDesc"
        ></el-input>
      </div>
      <!-- 添加商品 -->
      <el-button @click="clickBtn" type="primary">添加商品</el-button>
      <br />
    </div>
  </div>
</template>

<script>
import { categories, add, ITEMS_IMG_UPLOAD, GET_ITEMS_IMG } from "@/api/apis";
export default {
  data() {
    return {
      imgUrl: "", //新图片路径
      ITEMS_IMG_UPLOAD: "", //图片上传地址
      GET_ITEMS_IMG: "", //图片下载地址
      name: "", //商品名称
      goodsDesc: "", //商品描述
      selectvalue: "", //商品分类
      price: 0, //商品价格
      categories: [], //分类数组
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.imgUrl = res.imgUrl;
      }
    },
    // 18.添加商品
    clickBtn() {
      add(
        this.name,
        this.selectvalue,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          // 弹出提示信息
          this.$message({
            message: "商品添加成功!",
            type: "success",
          });
          (this.imgUrl = ""), //商品图片地址
            (this.name = ""), //商品名称
            (this.goodsDesc = ""), //商品描述
            (this.category = ""), //商品分类
            (this.price = ""); //商品价格
        }
        console.log(res.data.code);
        console.log(res.data.msg);
      });
    },
    handleChange(value) {
      console.log(value);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created() {
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    // 16.获取商品分类
    categories().then((res) => {
      this.categories = res.data.categories;
      //设置默认选项
      this.selectvalue = this.categories[0].cateName;
    });
  },
};
</script>

<style lang="less" scoped>
.bgc {
  background-color: #ffffff;
  padding: 20px;
}
// 头部
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 商品添加
.title_div {
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
.upload {
  display: flex;
}
.el-input {
  display: flex;
  align-items: flex-start;
}
</style>