<template>
  <div class="myHaveOrderFinished">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      v-if="this.list.length != 0"
    >
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="card_box" v-for="item in list" :key="item.isfi_express_id">
          <!-- head -->
          <div class="head">
            <div class="head_left">
              <span>
                <!-- 中通快递 -->
                {{ item.isfi_express_name }}
              </span>
              <span class="tag">
                <van-tag round size="large" type="success">{{
                  item.isfi_istakeit ? '已收件' : ''
                }}</van-tag>
              </span>
            </div>
            <div class="head_right">
              <span>
                <!-- 10分钟前 -->
              </span>
            </div>
          </div>
          <!-- main -->
          <div class="main">
            <div class="one">
              收件地址：
              {{ item.isfi_delivery_address }}
            </div>
            <div class="two">
              联系方式：
              {{ item.isfi_phone }}
            </div>
          </div>
          <!-- foot -->
          <div class="foot">
            <div class="foot_left">
              <span> 快递类型：{{ item.isfi_express_type }} </span>
            </div>
            <div class="foot_right">
              <van-button type="info" size="small" @click="detail(item)"
                >查看详情</van-button
              >
            </div>
          </div>
        </div>
      </van-list>
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '28%' }"
      >
        <van-steps direction="vertical" :active="1">
          <div class="step_express_name">{{ step_express_name }}</div>
          <van-step>
            <h3>【快递】派送中</h3>
            <p>{{ step_delivery_time | stepDateFilter }}</p>
          </van-step>
          <van-step>
            <h3>【快递】已完成</h3>
            <p>{{ step_finish_time | stepDateFilter }}</p>
          </van-step>
        </van-steps>
      </van-popup>
    </van-pull-refresh>
    <van-empty v-else description="暂无数据" />
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
      initPageData: {
        page: 1,
        pageSize: 5,
        user_id: window.sessionStorage.getItem('user_id'),
      },
      total: 0,
      step_express_name: '',
      step_finish_time: '',
      step_delivery_time: '',
      show: false,
    };
  },
  created() {
    this.initData();
    this.$bus.$emit('changeState');
  },
  filters: {
    DateFilter(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour;
      return `${year}-${month}-${day}__${hour}点前`;
    },
    stepDateFilter(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour;
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${year}-${month}-${day}  ${hour}:${minutes}`;
    },
    timeFormat(time) {
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var month = day * 30;

      var dateTimeStamp = new Date(time);
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;

      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;

      if (monthC >= 1) {
        return parseInt(monthC) + '个月前';
      } else if (weekC >= 1) {
        return parseInt(weekC) + '周前';
      } else if (dayC >= 1) {
        return parseInt(dayC) + '天前';
      } else if (hourC >= 1) {
        return parseInt(hourC) + '个小时前';
      } else if (minC >= 1) {
        return parseInt(minC) + '分钟前';
      } else return '刚刚';
    },
  },
  methods: {
    async initData() {
      const { data: res } = await this.$axios.Post(
        this.$api.isFinished_list,
        this.initPageData,
      );

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 800,
      });
      // console.log(res.data);
      setTimeout(() => {
        let rows = res.data;
        this.loading = false;
        this.total = res.data.total;
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        this.list = this.list.concat(rows);
        if (this.list.length >= this.total) {
          this.finished = true;
        }
        // this.$bus.$emit('getReceivingListLen', this.list);
        this.$toast.clear();
      }, 1000);
    },
    async onLoad() {
      this.initPageData.page++;
      this.initData();
    },
    onRefresh() {
      this.initPageData.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async detail(data) {
      // console.log('detail', data);
      try {
        const { data: res } = await this.$axios.Post(
          this.$api.getdeliverytime,
          data,
        );
        if (res.code == 200) {
          this.step_delivery_time = res.data[0].outof_create_time;
        } else {
          this.step_delivery_time = '';
        }
      } catch (error) {
        if (error) return this.$toast.fail('Network Error');
      }
      this.step_express_name = data.isfi_express_name;
      this.step_finish_time = data.isfi_create_time;
      this.show = true;
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
      // flex: 1;
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
.step_express_name {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-top: 10px;
}
/deep/.van-step--vertical {
  text-align: left;
  padding: 0;
}
/deep/.van-step__circle {
  width: 10px;
  height: 10px;
}
/deep/.van-step__line {
  width: 2px;
  left: -16px;
  top: 24px;
}
/deep/.van-step__circle-container {
  font-size: 18px;
}
</style>
