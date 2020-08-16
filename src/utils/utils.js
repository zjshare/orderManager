// 工具js文件

// 获取中国时区时间
// 传入UTC字符串时间 || 传入时间对象
export let getChinatime = (utctime) => {
  // console.log(utctime);
  let date = typeof utctime == "string" ? new Date(utctime) : utctime;
  // if(typeof utctime  == 'string')
  //     date = new Date(utctime)
  // else
  //     date = utctime

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};
