<template
  ><van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="value" :options="option" />
    <van-dropdown-item
      v-model="value2"
      :options="option2"
    /> </van-dropdown-menu
></template>

<script>
export default {
  data() {
    return {
      value: '所有快递',
      value2: '默认排序',
      option: [
        { text: '所有快递', value: '所有快递' },
        { text: '中通快递', value: '中通快递' },
        { text: '顺丰快递', value: '顺丰快递' },
      ],
      option2: [
        { text: '默认排序', value: '默认排序' },
        { text: '时间升序', value: '时间升序' },
        { text: '时间降序', value: '时间降序' },
      ],
    };
  },
};
</script>

<style></style>
