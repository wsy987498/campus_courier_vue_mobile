<template>
  <!-- 登录注册按钮 -->
  <div>
    <span class="login_button">
      <input type="button" value="" />
      <label @click="login">登 录</label>
      <label @click="register">注 册</label>
    </span>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  props: {
    loginFormData: Object,
  },
  data() {
    return {
      loginForm: this.loginFormData,
    };
  },
  methods: {
    isNull() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$toast('用户名和密码请填写完整！');
        return true;
      } else {
        return false;
      }
    },
    async login() {
      // console.log('login', this.loginForm);
      const isnull = this.isNull();
      if (isnull) return;

      const { data: res } = await this.$axios.Post(
        this.$api.login,
        this.loginForm,
      );
      // console.log(res);

      if (res.code == 202) {
        this.$toast({
          message: res.msg,
          icon: 'cross',
        });
        this.loginForm.username = '';
        this.loginForm.password = '';
      } else if (res.code == 200) {
        this.$toast.success(res.msg);
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('username', res.username);
        window.sessionStorage.setItem('user_id', res.id);
        this.$router.push('/about');
      }
    },
    async register() {
      // console.log('register', this.loginForm);
      const isnull = this.isNull();
      if (isnull) return;
      const { data: res } = await this.$axios.Post(
        this.$api.register,
        this.loginForm,
      );

      if (res.code == 200) {
        this.$toast.success(res.msg);
        this.reload();
      } else {
        this.$toast({
          message: res.msg,
          icon: 'cross',
        });
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    },
  },
};
</script>

<style>
.forget {
  text-align: right;
  margin-top: 10px;
}
.login_button {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}
.login_button input {
  display: block;
  flex: 1;
  width: 0;
  height: 40px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: #0066d0;
}
.login_button label {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 0.6s ease;
}
</style>
