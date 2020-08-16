<template>
  <div class="bgc">
    <!-- main内容部分 -->
    <div>
      <div class="title_div">管理员信息</div>
      <div class="title_p">
        管理员id:
        <span>{{info.id}}</span>
      </div>
      <div class="title_p">
        账号:
        <span>{{info.account}}</span>
      </div>
      <div class="title_p">
        用户组:
        <span>{{info.userGroup}}</span>
      </div>
      <div class="title_p">
        创建时间:
        <span>{{info.ctime}}</span>
      </div>
      <div class="title_img">
        <div>
          <span>管理员头像:</span>
        </div>
        <!-- 上传头像 -->
        <div>
          <template>
            <div>
              <el-upload
                action="http://127.0.0.1:5000/users/avatar_upload"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :data="uploaddata"
              >
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { accountInfo } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      username: "", //用户名
      uploaddata: {}, //上传头像
      // url1: require("../../assets/imgs/pic1.png"),
      info: [{ id: "", account: "", userGroup: "", ctime: "" }],
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //图片上传成功!   2.发送信息
        this.$bus.$emit("imguploadfinish");
      }
    },
  },
  // 9.获取账号（个人中心）信息

  created() {
    accountInfo(Number(localStorage.id)).then((res) => {
      this.info = res.data.accountInfo;
      this.info.ctime = getChinatime(this.info.ctime); //把数据库返回的时间传入时间函数处理。然后返回赋值。
    });
    this.uploaddata = { id: localStorage.id };
  },
};
</script>

<style lang="less" scoped>
.bgc {
  background-color: #ffffff;
  padding: 20px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title_div {
  font-size: 20px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
.title_p {
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
.title_img {
  span {
    margin-right: 20px;
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 80px;
}
</style>