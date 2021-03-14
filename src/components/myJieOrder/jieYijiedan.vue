<template>
  <div class="myHaveOrder">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="card_box" v-for="item in list" :key="item">
          <!-- head -->
          <div class="head">
            <div class="head_left">
              <span>中通快递</span>
              <span class="tag">
                <van-tag round size="large" type="primary">赏金：2元</van-tag>
              </span>
            </div>
            <div class="head_right"><span>10分钟前</span></div>
          </div>
          <!-- main -->
          <div class="main">
            <div class="one">配送地址：北海校区东区2#E320</div>
            <div class="two">期望送达时间：2021-2-28 15:00</div>
          </div>
          <!-- foot -->
          <div class="foot">
            <div class="foot_left">
              <span>快递类型：大包裹</span>
            </div>
            <div class="foot_right">
              <van-button type="info" size="small">立即接单</van-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {},

  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 3; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 20) {
          this.finished = true;
        }
        this.$emit('childListData', this.list);
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.card_box {
  border-radius: 10px;
  box-shadow: 1px 1px 5px #ebedf0;
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: rgba($color: #f7eed6, $alpha: 0.4);
  .head {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .head_left {
      font-weight: 700;
      font-size: 16px;
      text-align: left;
      flex: 1;
      .tag {
        margin-left: 8px;
      }
    }
    .head_right {
      color: #ccc;
      font-size: 12px;
      text-align: right;
      flex: 1;
    }
  }
  .main {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .one {
      margin-bottom: 3px;
    }
    .two {
      margin-bottom: 3px;
    }
    .three {
    }
  }
  .foot {
    display: flex;
    flex-direction: row;
    align-items: center;
    .foot_left {
      flex: 1;
      font-size: 13px;
      text-align: left;
    }
    .foot_right {
      text-align: right;
      flex: 1;
    }
  }
}
</style>
