<template>
  <div class="about" v-if="islogin">
    <div class="top">
      <div class="top_one">
        <!-- <div class="top_one_left">
          <van-image
            round
            width="80px"
            height="80px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div> -->
        <div class="top_one_right">
          <div class="top_one_right_one">您好，1123213123！</div>
          <div class="top_one_right_two">
            <van-button type="info" size="small" @click="logout"
              >退出登录</van-button
            >
          </div>
        </div>
      </div>
      <div class="top_two">
        <div class="top_two_left">
          <van-circle v-model="currentRate" :color="gradientColor">
            <template>
              <div class="circle">
                <div>发单总量</div>
                <div>10</div>
              </div>
            </template>
          </van-circle>
        </div>
        <div class="top_two_right">
          <van-circle v-model="currentRate" :color="gradientColor">
            <template>
              <div class="circle">
                <div>接单总量</div>
                <div>10</div>
              </div>
            </template>
          </van-circle>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="foot_one">我的发单</div>
      <div class="foot_two">
        <van-tabbar class="tab">
          <van-tabbar-item icon="wap-nav" @click="waitOrder" badge=""
            >待接单</van-tabbar-item
          >
          <van-tabbar-item icon="wap-nav" @click="isDelivery" badge="3"
            >派送中</van-tabbar-item
          >
          <van-tabbar-item icon="wap-nav" @click="fadanfinished" badge="3"
            >已完成</van-tabbar-item
          >
        </van-tabbar>
      </div>
    </div>
    <div class="foot">
      <div class="foot_one">我的接单</div>
      <div class="foot_two">
        <van-tabbar class="tab">
          <van-tabbar-item icon="wap-nav" @click="haveOrder" badge="3"
            >已接单</van-tabbar-item
          >
          <van-tabbar-item icon="wap-nav" @click="jiedanfinished" badge="3"
            >已完成</van-tabbar-item
          ><van-tabbar-item></van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>

  <div v-else>
    <van-empty description="您还没有登录！">
      <van-button round type="info" class="bottom-button" @click="gotologin"
        >登录 or 注册</van-button
      >
    </van-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6',
      },
      islogin: true,
    };
  },
  methods: {
    gotologin() {
      this.$router.push('/login');
    },
    logout() {
      this.$dialog
        .confirm({
          title: '确认退出吗?',
        })
        .then(() => {
          // on confirm
          this.islogin = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    // fa 待接单
    waitOrder() {
      this.$router.push('/mywaitorder');
    },
    // 派送中
    isDelivery() {
      this.$router.push('/mydelivery');
    },
    // 发单已完成
    fadanfinished() {
      this.$router.push('/fayiwancheng');
    },
    // 我的接单 已接单
    haveOrder() {
      this.$router.push('/jieyijiedan');
    },
    //接单已完成
    jiedanfinished() {
      this.$router.push('/jieyiwancheng');
    },
  },
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
    flex: 0.8;
    display: flex;
    flex-direction: column;
    // background: powderblue;
    .top_one {
      // background: pink;
      flex-grow: 0.2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      .top_one_left {
        flex-grow: 0.5;
        background: white;
      }
      .top_one_right {
        flex-grow: 1;
        .top_one_right_one {
          color: white;
          font-size: 16px;
          // background: wheat;
          height: 30px;
          text-align: left;
          padding-left: 20px;
        }
        .top_one_right_two {
          display: flex;
          justify-content: flex-end;
          margin-right: 10px;
        }
      }
    }
    .top_two {
      // background: greenyellow;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .top_two_left {
        flex-grow: 1;
        // background: #ccc;

        .circle {
          height: 100%;
          font-size: 17px;
          margin-top: 30px;
          color: white;
        }
      }
      .top_two_right {
        flex-grow: 1;
        .circle {
          height: 100%;
          font-size: 17px;
          margin-top: 30px;
          color: white;
        }
      }
    }
  }
  .main {
    // overflow: auto;
    height: 130px;
  }
  .foot,
  .main {
    font-size: 15px;
    box-sizing: border-box;
    height: 130px;
    border: 2px solid white;
    margin: 0 20px 20px 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    .foot_one {
      color: white;
      height: 30px;
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      // background: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .foot_two {
      height: 100px;
      display: flex;
      flex-direction: row;
      background: white;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      .tab {
        height: 100px;
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
