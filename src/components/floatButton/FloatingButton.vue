<template>
  <transition name="grow">
    <button class="floating-button" @click="toggleEditing"></button>
  </transition>
</template>

<script>
export default {
  computed: {},
  methods: {
    toggleEditing() {
      this.$router.push('/newTask');
    },
  },
};
</script>

<style lang="scss">
.floating-button {
  position: fixed;
  right: 44px;
  bottom: 64px;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  border-radius: 44px;
  width: 44px;
  height: 44px;
  color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  background: -webkit-gradient(
    linear,
    0% 100%,
    100% 0%,
    color-stop(0.3, rgb(255, 98, 98)),
    to(rgb(255, 169, 71))
  );
  transition: all 0.5s ease;
}
.floating-button::before,
.floating-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 20px;
  height: 2px;
  background-color: white;
  transform: translate(-50%, -50%);
}
.floating-button::after {
  transform: translate(-50%, -50%) rotate(90deg);
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
