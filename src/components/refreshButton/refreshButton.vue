<template>
  <transition name="grow">
    <van-icon class="btn" name="replay" @click="refreshBtn" />
  </transition>
</template>

<script>
export default {
  data() {
    return { token: window.sessionStorage.getItem('token') };
  },
  computed: {},
  methods: {
    refreshBtn() {
      this.$bus.$emit('refreshData');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  z-index: 9999;
  position: fixed;
  right: 8px;
  top: 82px;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  // border-radius: 35px;
  // width: 35px;
  // height: 35px;
  // line-height: 34px;
  // color: white;

  // background-image: -webkit-gradient(
  //   linear,
  //   0% 100%,
  //   0% 0%,
  //   color-stop(0.5, rgb(91, 157, 249)),
  //   to(rgb(71, 191, 255))
  // );
  transition: all 0.5s ease;
}

.floating-button__editing {
  right: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0;
}
.grow-leave-to,
.grow-enter {
  transform: scale(0);
}
.grow-enter-to,
.grow-leave {
  transform: scale(1);
}
.grow-enter-active {
  transition: all 0.2s 0.3s ease;
}
.grow-leave-active {
  transition: all 0.3s ease;
}
</style>
