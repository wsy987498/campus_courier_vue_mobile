<template>
  <div id="app">
    <div class="container">
      <div
        class="head"
        v-if="
          this.$route.fullPath == '/home' || this.$route.fullPath == '/about'
        "
      >
        <div class="top">校园快递</div>
      </div>
      <van-nav-bar
        :title="navTitle()"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        v-if="
          this.$route.fullPath != '/home' &&
            this.$route.fullPath != '/about' &&
            this.$route.fullPath != '/login'
        "
      />
      <div class="main">
        <!-- <keep-alive> -->
        <transition mode="out-in">
          <router-view v-if="isRouterAlive" />
        </transition>
        <!-- </keep-alive> -->
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
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return { active: 0, isRouterAlive: true };
  },
  created() {
    this.$bus.$on('changeState', () => {
      let key = this.$route.fullPath;
      // console.log(key);
      if (key == '/login') {
        this.active = 1;
      }
    });
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    indexClick() {
      if (this.$route.fullPath === '/home') return;
      this.$router.push('/');
    },
    myClick() {
      if (this.$route.fullPath === '/about') return;
      this.$router.push('/about');
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    navTitle() {
      let key = this.$route.fullPath;
      if (key == '/newTask') {
        return '新建';
      } else if (key == '/mywaitorder') {
        return '我的发单-待接单';
      } else if (key == '/mydelivery') {
        return '我的发单-派送中';
      } else if (key == '/fayiwancheng') {
        return '我的发单-已完成';
      } else if (key == '/jieyiwancheng') {
        return '我的接单-已完成';
      } else if (key == '/jieyijiedan') {
        return '我的接单-已接单';
      }
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
    // overflow: hidden;
    overflow: auto;
  }
  .foot {
    height: 50px;
    background: pink;
  }
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: 0.3s;
}
.v-enter-to {
  opacity: 0.6;
}
.v-leave {
  opacity: 0.6;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.3s;
}
</style>
