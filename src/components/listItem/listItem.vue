<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
                <van-tag round size="large" type="primary"
                  >赏金：{{ item.express_money }} 元</van-tag
                >
              </span>
            </div>
            <div class="head_right">
              <span>
                <!-- 10分钟前 -->
                {{ item.create_time | timeFormat }}
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
              <van-button type="info" size="small" @click="getOrder(item)"
                >立即接单</van-button
              >
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
      initPageData: {
        page: 1,
        pageSize: 5,
        expressName: 'all',
        sort: 'default',
      },
      total: 0,
      filterData: {},

      option: [
        { text: '所有快递', value: 'all' },
        { text: '中通快递', value: '中通快递' },
        { text: '顺丰快递', value: '顺丰快递' },
      ],
      option2: [
        { text: '默认排序', value: 'default' },
        { text: '时间升序', value: 'asc' },
        { text: '时间降序', value: 'desc' },
      ],
    };
  },
  created() {
    this.initData();

    this.$bus.$on('getParam', (param) => {
      // console.log(param);
      this.initPageData.expressName = param.expressName;
      this.initPageData.sort = param.sort;
      this.list = [];
      this.finished = false;
      this.initPageData.page = 1;
      this.initData();
      this.$toast.clear();
    });
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
        this.$api.express_list,
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
        this.$emit('childListData', this.list);
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
    getOrder(data) {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        this.$dialog
          .confirm({
            title: '确认接单吗?',
          })
          .then(async () => {
            // on confirm
            // console.log(data);
            const { data: res } = await this.$axios.Post(
              this.$api.addtoReceiving,
              data,
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
      } else {
        this.$toast('请先登录！');
        setTimeout(() => {
          this.$router.push('/login');
        }, 800);
      }
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
