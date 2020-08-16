<template>
  <div class="content">
    <p class="title_login">彩虹岛后台系统登录</p>
    <el-input placeholder="请输入内容" v-model="acc" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="pwd" show-password @keyup.enter.native="clickLogin"></el-input>
    <!-- 登陆失败提示 -->
    <p class="error-p">{{ errormsg }}</p>
    <el-button type="primary" @click="clickLogin">登录</el-button>
    <p class="page_foot">© CopyRight 2002-2020,彩虹岛Inc.All Rights Reserved.</p>
  </div>
</template>

<script>
// 用@自动找到apis的根目录
import { login } from "@/api/apis";

export default {
  data() {
    //date只能return一次。
    return {
      acc: "", //账号
      pwd: "", //密码
      errormsg: "", //错误提示
    };
  },
  methods: {
    clickLogin() {
      // console.log(this.acc, this.pwd);
      // 调用apis里面暴露出来的login登录函数，发送请求。
      login(this.acc, this.pwd).then((res) => {
        // 如果res响应数据是0
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //在本地存储token
          localStorage.role = res.data.role; //在本地存储权限（用户组）
          localStorage.acc = this.acc; //在本地存储用户名
          localStorage.id = res.data.id; //在本地存储用户名

          this.$router.push("/main/index"); //利用push自动追加一个地址到前缀上去。
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
          // 把响应回来的错误信息存到errormsg变量里，再{{}}显示。
        } else this.errormsg = res.data.msg;
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

.content {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  /* background-image: url("../assets/imgs/350.jpg");
  background-repeat: no-repeat;
  background-size: 100%; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

p {
  margin: 30px;
  width: 300px;
  color: #fff;
  text-align: center;
}
.el-input {
  margin: 20px;
  width: 300px;
}
button {
  width: 300px;
}
.el-container {
  height: 100%;
}
.error-p {
  color: brown;
  font-size: 12px;
}
.title_login {
  color: #000;
  font-size: 30px;
}
.page_foot {
  position: relative;
  bottom: -120px;
}
</style>