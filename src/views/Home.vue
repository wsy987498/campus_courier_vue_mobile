<template>
  <div class="home_box">
    <div class="top">
      <!-- 广告通知栏 -->
      <notice-bar :text="text" />
    </div>
    <div class="main">
      <!-- 列表 -->
      <list-item @childListData="getchildListData($event)" />
      <van-empty description="暂无数据" v-if="this.childListData == 0" />
    </div>
    <!-- 发布消息 -->
    <FloatingButton />
  </div>
</template>

<script>
import noticeBar from '@/components/noticeBar/noticeBar';

import listItem from '@/components/listItem/listItem';
import FloatingButton from '@/components/floatButton/FloatingButton';
export default {
  name: 'Home',
  components: { noticeBar, listItem, FloatingButton },
  data() {
    return {
      text: '欢迎使用！',
      childListData: [],
    };
  },
  methods: {
    getchildListData(data) {
      this.childListData = data;
      // console.log(this.childListData.length);
    },
  },
};
</script>
<style lang="scss" scoped>
.home_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top {
    // background: greenyellow;
  }
  .main {
    flex: 1;
    overflow: auto;
  }
  .foot {
    // background: greenyellow;
  }
}
</style>
