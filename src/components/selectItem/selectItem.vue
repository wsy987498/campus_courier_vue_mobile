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
        { text: '天天快递', value: '天天快递' },
        { text: '申通快递', value: '申通快递' },
        { text: '圆通快递', value: '圆通快递' },
        { text: 'EMS邮政', value: 'EMS邮政' },
        { text: '百世快递', value: '百世快递' },
        { text: '韵达快递', value: '韵达快递' },
      ],
      option2: [
        { text: '默认排序', value: 'default' },
        { text: '时间升序', value: 'asc' },
        { text: '时间降序', value: 'desc' },
      ],
    };
  },
  created() {},
  methods: {
    getExpressName(value) {
      // console.log(value);
      this.selectData.expressName = value;
      this.$bus.$emit('getParam', this.selectData);
    },
    getSort(value) {
      // console.log(value);
      this.selectData.sort = value;
      this.$bus.$emit('getParam', this.selectData);
    },
  },
};
</script>

<style></style>
