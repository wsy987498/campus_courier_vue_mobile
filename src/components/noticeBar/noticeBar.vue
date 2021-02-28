<template>
  <van-notice-bar left-icon="volume-o" :text="text" />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
