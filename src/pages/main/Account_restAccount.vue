<template>
  <div class="bgc">
    <!-- main内容部分 -->

    <div class="contant">
      <div class="title_div">修改密码</div>
      <label>
        <span>原密码</span>
        <el-input style="width:300px; margin:20px" v-model="input_old" placeholder="请输入内容"></el-input>
      </label>
      <br />
      <label>
        <span>新密码</span>
        <el-input
          style="width:300px; margin:20px"
          placeholder="请输入密码"
          v-model="input_new"
          show-password
        ></el-input>
      </label>
      <br />
      <label>
        <span>确认密码</span>
        <el-input
          style="width:300px; margin:20px"
          placeholder="请输入密码"
          v-model="input_sure"
          show-password
        ></el-input>
      </label>
      <br />

      <br />

      <!-- 按钮 -->
      <div class="btn">
        <el-button @click="clickBtn" type="primary">确定</el-button>
        <el-button plain>重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkOldPwd, editPwd } from "@/api/apis";
export default {
  data() {
    return {
      input_old: "",
      input_new: "",
      input_sure: "",
    };
  },
  methods: {
    clickBtn() {
      checkOldPwd(this.input_old, Number(localStorage.id)).then((res) => {
        if (!res.data.code == 0) {
          //旧密码错误，弹框提示
          // 弹出提示信息
          this.$message.error("旧密码不正确");
          return;
        } else {
          //如果旧密码正确，那么执行改密码。
          editPwd(this.input_new, Number(localStorage.id)).then((res) => {
            // 弹出提示信息
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            }
          });
        }
      });
    },
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
  font-size: 18px;
  margin: 20px;
  padding: 20px;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid #ccc;
}
.contant span {
  display: inline-block;
  width: 120px;
  text-align: right;
}
// 按钮
.btn {
  margin: 50px;
}
</style>