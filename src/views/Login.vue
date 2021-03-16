<template>
  <div
    class="login"
    :class="{ login__signin: isSignIn, login__signup: isSignUp }"
  >
    <div class="disblock"></div>
    <login-tabs @click.native="switchState" />
    <login-form />
  </div>
</template>
<script>
import LoginTabs from '@/components/loginfrom/LoginTabs';
import LoginForm from '@/components/loginfrom/LoginForm';

export default {
  components: {
    LoginTabs,
    LoginForm,
  },
  data() {
    return {
      state: 1,
    };
  },
  created() {
    this.$bus.$emit('changeState');
  },
  computed: {
    isSignIn() {
      return this.state === 1;
    },
    isSignUp() {
      return this.state === 2;
    },
  },
  methods: {
    switchState() {
      this.state = this.state === 1 ? 2 : 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.disblock {
  height: 20%;
}
.login {
  height: 100%;
  color: white;
  font-size: 14px;
  background-color: #007dff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
