<template>
  <div class="forgetPas">
    <div class="title">修 改 密 码</div>

    <form class="login_form">
      <div class="login_form_r2">
        <!--  @submit="onSubmit" -->
        <van-form class="vantform">
          <van-field
            v-model="loginForm.username"
            name="账号"
            label="账号："
            placeholder="账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="密码"
            label="密码："
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="loginForm.password1"
            type="password"
            name="确认密码"
            label="确认密码："
            placeholder="确认密码"
            :rules="[{ required: true, message: '请确认密码' }]"
          />
          <div style="margin: 16px;">
            <div class="submit" @click="updatePassword">确 认 修 改</div>
          </div>
        </van-form>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        password1: '',
        id: window.sessionStorage.getItem('user_id'),
      },
    };
  },
  created() {
    this.$bus.$emit('changeState');
  },
  computed: {},
  methods: {
    async updatePassword() {
      if (
        this.loginForm.username &&
        this.loginForm.password &&
        this.loginForm.password1
      ) {
        if (this.loginForm.password != this.loginForm.password1) {
          this.$toast('密码不一致!');
        } else {
          // console.log(this.loginForm);
          const { data: res } = await this.$axios.Post(
            this.$api.updatePassword,
            this.loginForm,
          );
          if (res.code == 200) {
            this.$toast.success(res.msg);
            window.sessionStorage.clear();
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
          }
        }
      } else {
        this.$toast('请输入完整!');
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.forgetPas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: white;
  font-size: 14px;
  background-color: #007dff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  .title {
    font-size: 18px;
  }
}
.login_form {
  padding: 20px;
}
.login_form > div {
  padding-bottom: 10px;
  display: flex;
  min-height: 40px;
  justify-content: space-between;
  transition: all 0.6s ease;
}
.login_text {
  display: flex;
  flex: 1;
}
.vantform {
  width: 100%;
}
/* .login_text .login_textfield {
  border-radius: 0;
}
.login_text .login_textfield:first-child {
  border-radius: 2px 0 0 2px;
}
.login_text .login_textfield:last-child {
  border-radius: 0 2px 2px 0;
} */
.login__signup .login_form_r5 {
  opacity: 0;
  transform: translateY(100%);
  transition-duration: 0.4s;
}
.login__signup .login_button label:nth-child(2) {
  transform: translateY(-100%);
  opacity: 0;
}
.login__signin .login_form_r1,
.login__signin .login_form_r4 {
  opacity: 0;
  transform: translateY(30%) scale(0.8);
}
/* .login__signin .login_form_r2,
.login__signin .login_form_r3 {
  transform: translateY(-100%);
} */
.login__signin .login_form_r5 {
  transform: translateY(-200%);
}
.login__signin .login_button label:nth-child(3) {
  transform: translateY(100%);
  opacity: 0;
}
.login_textfield label {
  margin-right: 10px;
  color: #007dff;
}
.login_textfield label i {
  width: 20px;
}
.submit {
  background: #0066d0;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
</style>
