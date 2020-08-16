<template>
  <div class="bgc">
    <!-- main内容部分 -->

    <div class="contant">
      <div class="title_div">添加账号</div>
      <label>
        <span>账号</span>
        <el-input style="width:300px; margin:20px" v-model="account" placeholder="请输入内容"></el-input>
      </label>
      <br />
      <label>
        <span>密码</span>
        <el-input
          style="width:300px; margin:20px"
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
      </label>
      <br />
      <label>
        <span>用户组</span>
        <el-select
          style="width:300px; margin:20px"
          v-model="userGroup"
          filterable
          placeholder="请选择用户组"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </label>
      <br />

      <br />

      <!-- 按钮 -->
      <div class="btn">
        <el-button @click="clickBtn" type="primary">确定</el-button>
        <el-button @click="clickReset" plain>重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addAccount } from "@/api/apis";
export default {
  data() {
    return {
      account: "",
      password: "",
      userGroup: "",
      options: [
        {
          value: "普通管理员",
          label: "普通管理员",
        },
        {
          value: "超级管理员",
          label: "超级管理员",
        },
      ],
    };
  },
  methods: {
    clickBtn() {
      addAccount(this.account, this.password, this.userGroup).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "用户添加成功!",
            type: "success",
          });
          this.account = "";
          this.password = "";
          this.userGroup = "";
        } else {
          this.$message({
            message: "用户添加失败!",
          });
        }
      });
    },
    clickReset() {
      this.account = "";
      this.password = "";
      this.userGroup = "";
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