<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button
          @click="clickSave"
          style="float: right; padding: 10px 20px"
          type="primary"
          size="small"
        >保存</el-button>
      </div>

      <!-- 店铺信息-->
      <!-- 店铺名称  -->
      <el-row>
        <el-col :span="10">
          店铺名称
          <el-input v-model="name" placeholder="店铺名称"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺广告 -->
      <el-row>
        店铺公告
        <el-col :span="8">
          <el-input v-model="bulletin" type="textarea" :rows="8" placeholder="商品描述"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺头像 -->
      <el-row>
        店铺头像
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="UPLOAD_SHOP_IMG"
              :on-success="avatarUploadSuccess"
              :show-file-list="false"
            >
              <img width="100%" :src="avatar == '' ? '' : GET_SHOPS_IMG + avatar" alt />
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺图片 -->
      <el-row>
        店铺图片
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="UPLOAD_SHOP_IMG"
              list-type="picture-card"
              :on-success="shopimgsUploadSuccess"
              :on-remove="removeImg"
              :file-list="shopimgs"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 配送费  -->
      <el-row>
        <el-col :span="10">
          配送费
          <div class="distribution">
            <el-input v-model="deliveryPrice" placeholder="配送费"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 配送时间  -->
      <el-row>
        <el-col :span="10">
          配送时间
          <el-input v-model="deliveryTime" placeholder="配送时间"></el-input>
        </el-col>
      </el-row>
      <!-- 配送描述  -->
      <el-row>
        <el-col :span="10">
          配送描述
          <el-input v-model="description" placeholder="配送描述"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺评分  -->
      <el-row>
        <el-col :span="10">
          店铺评分
          <el-input v-model="score" placeholder="店铺评分"></el-input>
        </el-col>
      </el-row>
      <!-- 销量  -->
      <el-row>
        <el-col :span="10">
          销量
          <div class="sales">
            <el-input v-model="sellCount" placeholder="销量"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 活动 -->
      <el-row>
        活动
        <el-col :span="8">
          <div class="sales">
            <el-checkbox-group v-model="supports">
              <el-checkbox label="夏日大促全场饮品8折"></el-checkbox>
              <el-checkbox label="套餐限时5折"></el-checkbox>
              <el-checkbox label="满30-20"></el-checkbox>
              <el-checkbox label="充值100送100"></el-checkbox>
              <el-checkbox label="充值1000送500"></el-checkbox>
              <el-checkbox label="首单额外减5块"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- 营业时间 -->
      <el-row>
        <el-col :span="10">
          营业时间
          <div class="time">
            <el-time-picker
              is-range
              v-model="date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { shopInfo, shopEdit, GET_SHOPS_IMG, UPLOAD_SHOP_IMG } from "@/api/apis";
import { getChinatime } from "@/utils/utils";

export default {
  data() {
    return {
      GET_SHOPS_IMG: "", //获取店铺图片地址
      UPLOAD_SHOP_IMG: "",
      dialogImageUrl: "",

      shopimgs: [], //回填店铺图片数组

      avatar: "", //店铺头像
      bulletin: "", //公告
      date: [], //营业时间
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      id: 0,
      minPrice: 0, //起送费
      name: "",
      pics: [], //店铺图片
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //店铺头像上传成功
    avatarUploadSuccess(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
      }
    },
    //店铺图片上传成功
    shopimgsUploadSuccess(res) {
      if (res.code == 0) {
        this.pics.push(res.imgUrl); //把上传的图片加到pics中
        console.log(this.pics);
        // console.log(this.shopimgs)
      }
    },

    //移除店铺图片
    removeImg(res) {
      // 要移除的图片名字
      console.log(res.name);
      // 找到并移除
      this.pics.splice(this.pics.indexOf(res.name), 1);

      console.log(this.pics);
    },

    //修改店铺数据
    clickSave() {
      var params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        //字符串数组
        date: JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]),
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics),
      };
      // 发送修改请求
      shopEdit(params).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "店铺信息修改成功！",
          });
        }
      });
    },
  },
  created() {
    // 赋值
    this.GET_SHOPS_IMG = GET_SHOPS_IMG;
    this.UPLOAD_SHOP_IMG = UPLOAD_SHOP_IMG;
    shopInfo().then((res) => {
      for (let key in res.data.data) {
        this[key] = res.data.data[key];
      }

      //回填照片墙图片
      this.shopimgs = this.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: GET_SHOPS_IMG + imgstr,
        };
      });
    });
  },
};
</script>

<style lang="less" scoped>
.el-col {
  display: flex;
  align-items: center;
  .el-input,
  .el-textarea,
  .el-select {
    flex: 1;
    margin-left: 5px;
  }
  .el-input-number,
  .inner {
    margin-left: 5px;
  }
}
.el-row {
  margin: 20px 0;
  display: flex;
  .el-upload,
  .time {
    margin-left: 5px;
  }
  .el-button {
    margin-left: 100px;
  }
  .distribution {
    margin-left: 15px;
  }
  .sales {
    margin-left: 31px;
  }
  .el-checkbox {
    margin-bottom: 15px;
  }
}

// 上传图片样式
</style>