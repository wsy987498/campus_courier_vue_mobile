<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item
      v-model="selectData.expressName"
      :options="option"
      @change="getExpressName"
    />
    <van-dropdown-item
      v-model="selectData.sort"
      :options="option2"
      @change="getSort"
    />
  </van-dropdown-menu>
</template>

<script>
export default {
  data() {
    return {
      selectData: {
        expressName: 'all',
        sort: 'default',
      },
      option: [
        { text: '所有快递', value: 'all' },
        { text: '中通快递', value: '中通快递' },
        { text: '顺丰快递', value: '顺丰快递' },
      ],
      option2: [
        { text: '默认排序', value: 'default' },
        { text: '时间升序', value: 'asc' },
        { text: '时间降序', value: 'desc' },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style></style>
