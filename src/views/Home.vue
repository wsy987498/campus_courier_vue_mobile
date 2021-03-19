<template>
  <div class="home_box">
    <div class="top">
      <!-- 广告通知栏 -->
      <notice-bar :text="text" />
      <selectItem />
    </div>
    <div class="main">
      <!-- 列表 -->
      <list-item @childListData="getchildListData($event)" />
    </div>
    <!-- 发布消息 -->
    <FloatingButton />
    <RefreshButton />
  </div>
</template>

<script>
import noticeBar from '@/components/noticeBar/noticeBar';
import selectItem from '@/components/selectItem/selectItem';
import listItem from '@/components/listItem/listItem';
import FloatingButton from '@/components/floatButton/FloatingButton';
import RefreshButton from '@/components/refreshButton/refreshButton';

export default {
  name: 'Home',
  components: {
    noticeBar,
    listItem,
    selectItem,
    FloatingButton,
    RefreshButton,
  },
  created() {},
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
    refreshBtn() {
      console.log('shuaxin');
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
