<template>
  <div class="about">
    <div class="top">11</div>
    <div class="main">
      <div class="foot_one">我的发单</div>
      <div class="foot_two">
        <van-tabbar class="tab">
          <van-tabbar-item icon="search">待接单</van-tabbar-item>
          <van-tabbar-item icon="search" badge="3">派送中</van-tabbar-item>
          <van-tabbar-item icon="search">已完成</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <div class="foot">
      <div class="foot_one">我的接单</div>
      <div class="foot_two">
        <van-tabbar class="tab">
          <van-tabbar-item icon="search" badge="3">已接单</van-tabbar-item>
          <van-tabbar-item icon="search">已完成</van-tabbar-item
          ><van-tabbar-item></van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.about {
  box-sizing: border-box;
  background-image: -webkit-gradient(
    linear,
    0% 100%,
    0% 0%,
    color-stop(0.2, rgb(91, 157, 249)),
    to(rgb(71, 191, 255))
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top {
    background: greenyellow;
    flex: 1;
  }
  .main {
    // overflow: auto;
    height: 150px;
  }
  .foot,
  .main {
    font-size: 20px;
    box-sizing: border-box;
    height: 150px;
    border: 2px solid white;
    margin: 0 20px 20px 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    .foot_one {
      color: white;
      height: 40px;
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      // background: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .foot_two {
      height: 110px;
      display: flex;
      flex-direction: row;
      background: white;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      .tab {
        height: 110px;
        position: static;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      .van-tabbar-item--active {
        color: #646566;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      .block_one {
        border: 1px solid #cccccc;
        flex-grow: 1;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
      .block_two {
        border: 1px solid #cccccc;
        flex-grow: 1;
      }
      .block_three {
        flex-grow: 1;
        border: 1px solid #cccccc;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
      }
    }
  }
}
</style>
