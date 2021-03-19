<template>
  <div class="myWaitOrder">
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
        <div class="card_box" v-for="item in list" :key="item.express_id">
          <!-- head -->
          <div class="head">
            <div class="head_left">
              <span>
                <!-- 中通快递 -->
                {{ item.express_name }}
              </span>
              <span class="tag">
                <van-tag round size="large" type="success"
                  >取件码：{{ item.pick_code }}</van-tag
                >
              </span>
            </div>
            <div class="head_right">
              <span>
                <!-- 10分钟前 -->
                收件人：{{ item.express_recipients }}
              </span>
            </div>
          </div>
          <!-- main -->
          <div class="main">
            <div class="one">
              配送地址：
              <!-- 北海校区东区2#E320 -->
              {{ item.delivery_address }}
            </div>
            <div class="two">
              期望送达时间：
              <!-- 2021-2-28 15:00 -->
              {{ item.forward_delivery_time | DateFilter }}
            </div>
          </div>
          <!-- foot -->
          <div class="foot">
            <div class="foot_left">
              <span>
                快递类型：
                <!-- 大包裹 -->
                {{ item.express_type }}
              </span>
            </div>
            <div class="foot_right">
              <van-button type="danger" size="small" @click="delTask(item)"
                >删除</van-button
              >
            </div>
          </div>
        </div>
      </van-list>
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
        this.$api.getWaitOrder_list,
        this.initPageData,
      );

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
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
    delTask(data) {
      const express_id = { express_id: data.express_id };
      this.$dialog
        .confirm({
          title: '是否删除?',
        })
        .then(async () => {
          // console.log(data);
          const { data: res } = await this.$axios.Post(
            this.$api.delmytask,
            express_id,
          );
          // console.log(res);
          if (res.code == 200) {
            this.$toast.success(res.msg);
            setTimeout(() => {
              this.initPageData.page = 1;
              this.list = [];
              this.initData();
            }, 1000);
          }
        })
        .catch(() => {
          // on cancel
        });
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
</style>
