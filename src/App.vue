<template>
  <div id="app">
    <div class="container">
      <div class="head">
        <div class="top">校园快递</div>
      </div>
      <div class="main">
        <router-view />
      </div>
      <div class="foot">
        <van-tabbar v-model="active">
          <van-tabbar-item icon="wap-home" @click="indexClick"
            >首页</van-tabbar-item
          >
          <van-tabbar-item icon="friends" @click="myClick"
            >我的</van-tabbar-item
          >
        </van-tabbar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { active: 0 };
  },
  methods: {
    indexClick() {
      if (this.$route.fullPath === '/') return;
      this.$router.push('/');
    },
    myClick() {
      if (this.$route.fullPath === '/about') return;
      this.$router.push('/about');
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .head {
    color: white;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    background: #1989fa;
  }
  .main {
    flex: 1;
    overflow: hidden;
  }
  .foot {
    height: 50px;
    background: pink;
  }
}
</style>
