<template>
  <div class="about" v-if="islogin">
    <div class="top">
      <div class="top_one">
        <div class="top_one_left">
          <div class="avator">
            <template v-if="avator == ''">
              <input @click="upload" id="upload" type="file" />
              <div class="avator_border">上传头像</div>
            </template>
            <template v-else>
              <input @click="upload" id="upload" type="file" />
              <div class="avator_border">
                <img v-lazy="baseUrl + '/avator/' + avator + '.png'" alt="" />
              </div>
            </template>
          </div>
        </div>
        <div class="top_one_right">
          <div class="top_one_right_one">您好，{{ username }}！</div>
          <div class="top_one_right_two">
            <van-button
              type="info"
              size="small"
              style="margin-right:5px"
              @click="updatePassword"
              >修改密码</van-button
            >
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
                <div>{{ myfadanNum }}</div>
              </div>
            </template>
          </van-circle>
        </div>
        <div class="top_two_right">
          <van-circle v-model="currentRate" :color="gradientColor">
            <template>
              <div class="circle">
                <div>接单总量</div>
                <div>{{ myjeidanNum }}</div>
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
          <van-tabbar-item
            :icon="waitorder"
            @click="waitOrder"
            :badge="waitOrderNum ? waitOrderNum : ''"
            >待接单</van-tabbar-item
          >
          <van-tabbar-item
            :icon="delivery"
            @click="isDelivery"
            :badge="paisongNum ? paisongNum : ''"
            >派送中</van-tabbar-item
          >
          <van-tabbar-item
            :icon="finish"
            @click="fadanfinished"
            :badge="jiedanFinishedNum ? jiedanFinishedNum : ''"
            >已完成</van-tabbar-item
          >
        </van-tabbar>
      </div>
    </div>
    <div class="foot">
      <div class="foot_one">我的接单</div>
      <div class="foot_two">
        <van-tabbar class="tab">
          <van-tabbar-item
            :icon="receiving"
            @click="haveOrder"
            :badge="ReceivingNum ? ReceivingNum : ''"
            >已接单</van-tabbar-item
          >
          <van-tabbar-item
            :icon="finish"
            @click="jiedanfinished"
            :badge="FinishedNum ? FinishedNum : ''"
            >已完成</van-tabbar-item
          ><van-tabbar-item></van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <myrefreshBtn />
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
import myrefreshBtn from '@/components/refreshButton/myrefreshBtn';
export default {
  components: { myrefreshBtn },
  data() {
    return {
      avator: '',
      baseUrl: 'http://39.108.117.83/images/',
      // baseUrl: 'http://localhost:9000/images/',
      username: sessionStorage.getItem('username'),
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6',
      },
      islogin: true,
      ReceivingNum: 0,
      FinishedNum: 0,
      waitOrderNum: 0,
      paisongNum: 0,
      jiedanFinishedNum: 0,
      token: window.sessionStorage.getItem('token'),
      user_id: {
        user_id: window.sessionStorage.getItem('user_id'),
      },
      postUsername: {
        username: window.sessionStorage.getItem('username'),
      },
      finish: require('../assets/image/finish.png'),
      delivery: require('../assets/image/delivery.png'),
      waitorder: require('../assets/image/waitorder.png'),
      receiving: require('../assets/image/receiving.png'),
    };
  },
  created() {
    this.state();
    this.getWaitOrderNum();
    this.getReceivingNum();
    this.getFinishedNum();
    this.gethavetoTakeNum();
    this.getfadanFinishedNum();

    this.$bus.$on('getNum', () => {
      this.getWaitOrderNum();
      this.getReceivingNum();
      this.getFinishedNum();
      this.gethavetoTakeNum();
      this.getfadanFinishedNum();
      setTimeout(() => {
        this.$toast('刷新成功');
      }, 500);
    });

    this.getAvartorMethod();
  },

  computed: {
    myjeidanNum() {
      return this.ReceivingNum + this.FinishedNum;
    },
    myfadanNum() {
      return this.waitOrderNum + this.paisongNum + this.jiedanFinishedNum;
    },
  },
  methods: {
    async getAvartorMethod() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.getAvator,
          this.postUsername,
        );
        this.avator = res.avator;
        window.sessionStorage.setItem('avator', res.avator);
        // console.log('头像', res);
        // console.log(this.avator);
      }
    },
    upload() {
      var upload = document.querySelector('#upload');
      // console.log(upload);
      var _that = this;
      upload.addEventListener(
        'change',
        function() {
          if (this.files.length != 0) {
            var file = this.files[0],
              reader = new FileReader();
            if (!reader) {
              this.value = '';
              return;
            }
            reader.onload = function(e) {
              this.value = '';
              var image = new Image();
              image.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = 100;
                canvas.height = 100;
                ctx.clearRect(0, 0, 100, 100);
                ctx.drawImage(image, 0, 0, 100, 100);
                var blob = canvas.toDataURL('image/png');
                _that.$axios
                  .Post(_that.$api.uploadAvator, {
                    username: _that.username,
                    avator: blob,
                    // blob: ,
                  })
                  .then((data) => {
                    const { data: res } = data;
                    // console.log('data', res);
                    _that.$toast({
                      icon: 'success',
                      message: res.msg,
                    });
                    window.sessionStorage.removeItem('avator');

                    _that.getAvartorMethod();
                  })
                  .catch((e) => {
                    // _that.$toast({
                    //   icon: 'fail',
                    //   message: e.message,
                    //   success: () => {
                    //     if (e.code == 404)
                    //       _that.$router.push({ path: '/login' });
                    //     localStorage.clear();
                    //   },
                    // });
                  });
              };
              image.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        },
        false,
      );
    },
    state() {
      const token = window.sessionStorage.getItem('token');
      if (!token) {
        this.islogin = false;
      }
    },
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
          this.$toast.success('退出成功');
          setTimeout(() => {
            this.islogin = false;
            window.sessionStorage.clear();
            window.sessionStorage.removeItem('token');
          }, 800);
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

    //我的发单 待接单 num
    async getWaitOrderNum() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.getWaitOrderNum,
          this.user_id,
        );
        this.waitOrderNum = res.total;
      }
    },
    // 我的发单 派送中 num
    async gethavetoTakeNum() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.gethavetoTakeNum,
          this.user_id,
        );
        this.paisongNum = res.total;
      }
    },
    // 我的发单 已完成 num
    async getfadanFinishedNum() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.getfadanFinishedNum,
          this.user_id,
        );
        this.jiedanFinishedNum = res.total;
      }
    },

    // 我的接单 已接单 num
    async getReceivingNum() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.getReceivingNum,
          this.user_id,
        );
        this.ReceivingNum = res.total;
      }
    },
    // 我的接单 已完成 num
    async getFinishedNum() {
      if (this.token) {
        const { data: res } = await this.$axios.Post(
          this.$api.getFinishedNum,
          this.user_id,
        );
        this.FinishedNum = res.total;
      }
    },
    updatePassword() {
      setTimeout(() => {
        this.$router.push('/updatePassword');
      }, 500);
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
      box-shadow: 0.02667rem 0.02667rem 0.13333rem #ebedf0;
      // background: pink;
      flex-grow: 0.2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin: 10px 20px 0px 20px;
      border-radius: 15px;
      background: white;
      .top_one_left {
        flex-grow: 0.5;
        // backgrounrgb(3, 2, 2)ite;
      }
      .top_one_right {
        flex-grow: 1;
        .top_one_right_one {
          // color: white;
          font-size: 16px;

          height: 30px;
          text-align: left;
          // padding-left: 20px;
        }
        .top_one_right_two {
          display: flex;
          justify-content: flex-end;
          margin-right: 10px;
        }
      }
    }
    .top_two {
      background: white;
      margin: 10px 20px 10px 20px;
      border-radius: 15px;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-shadow: 0.02667rem 0.02667rem 0.13333rem #ebedf0;
      .top_two_left {
        flex-grow: 1;
        // background: #ccc;

        .circle {
          height: 100%;
          font-size: 17px;
          margin-top: 30px;
          // color: white;
        }
      }
      .top_two_right {
        flex-grow: 1;
        .circle {
          height: 100%;
          font-size: 17px;
          margin-top: 30px;
          // color: white;
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
.avator {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  // background: rgba(95, 113, 206, 0.7);
  // padding: 1rem 0 0.5rem 0;
  position: relative;

  #upload {
    position: absolute;
    left: 50%;
    top: 0.22rem;
    transform: translateX(-50%);
    width: 1.3rem;
    height: 1.3rem;
    opacity: 0;
    z-index: 999999;
  }

  div.avator_border {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid black;
    border-radius: 50%;
    text-align: center;
    line-height: 1.5rem;
    overflow: hidden;
    font-size: 8px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
