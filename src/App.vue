<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

body,
html,
#app {
  //一层一层往外找，所有的父级盒子都得设置100%。
  height: 100%;
}
</style>
