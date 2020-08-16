<template>
  <div class="bgc">
    <!-- 顶部 -->
    <div class="top_div" style="margin-bottom:40px">
      <el-row :gutter="20">
        <!-- 第一个 -->
        <el-col :span="6">
          <el-card shadow="always">
            <div class="flex_top">
              <div>
                <i class="el-icon-document"></i>
              </div>
              <div class="right_coner">
                <p class="title">总订单</p>
                <p class="num">{{dataList.totalOrder}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第二个 -->
        <el-col :span="6">
          <el-card shadow="always">
            <div class="flex_top">
              <div>
                <i class="el-icon-coin"></i>
              </div>
              <div class="right_coner">
                <p class="title">总销售额</p>
                <p class="num">{{dataList.totalAmount}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第三个 -->
        <el-col :span="6">
          <el-card shadow="always">
            <div class="flex_top">
              <div>
                <i class="el-icon-s-claim"></i>
              </div>
              <div class="right_coner">
                <p class="title">今日订单数</p>
                <p class="num">{{dataList.todayOrder}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 第四个 -->
        <el-col :span="6">
          <el-card shadow="always">
            <div class="flex_top">
              <div>
                <i class="el-icon-pie-chart"></i>
              </div>
              <div class="right_coner">
                <p class="title">今日销售额</p>
                <p class="num">{{dataList.totayAmount}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 800px;height: 500px"></div>
  </div>
</template>
<script>
// 1.引入echarts
import echarts from "echarts";
import { echarts_totaldata } from "@/api/apis";
export default {
  data() {
    return {
      dataList: {}, //数据源
    };
  },
  created() {},
  mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    echarts_totaldata().then((res) => {
      console.log(res.data);
      this.dataList = res.data;
      console.log(this.dataList);
      // 4. 创建配置对象
      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["彩虹岛金额数据", "彩虹岛订单数据"], //顶部描述数组
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData, //横轴
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "玉团金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "玉团订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };
      // 5. 使用echarts实例对象， 关联数据配置对象， 创建表格
      myChart.setOption(option);
    });
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  },
};
</script>

<style lang="less" scoped>
.bgc {
  background-color: #ffffff;
  padding: 20px;
}
html,
body {
  height: 100%;
}
// 头部样式
.el-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
// 图标一
.el-icon-document {
  font-size: 80px;
  color: #1296db;
}
// 图标二
.el-icon-coin {
  font-size: 80px;
  color: #d4237a;
}
// 图标三
.el-icon-s-claim {
  font-size: 80px;
  color: #1296db;
}
// 图标四
.el-icon-pie-chart {
  font-size: 80px;
  color: #1afa29;
}
.flex_top {
  display: flex;
  justify-content: space-around;
}
.title {
  font-size: 20px;
  color: #cecece;
  text-align: center;
}
.num {
  font-size: 20px;
  color: #333;
  text-align: center;
}
.right_coner {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>