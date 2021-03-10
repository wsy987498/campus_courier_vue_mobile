<template>
  <form class="login_form">
    <div class="login_form_r2">
      <van-form @submit="onSubmit" class="vantform">
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
        <div style="margin: 16px;">
          <login-submit :loginFormData="loginForm" native-type="submit" />
        </div>
      </van-form>
    </div>
  </form>
</template>
<script>
import LoginSubmit from './LoginSubmit';

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    LoginSubmit,
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
};
</script>
<style>
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
</style>
