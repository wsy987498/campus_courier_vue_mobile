<template>
  <div class="newTaskBox">
    <van-form @submit="onSubmit" class="subForm">
      <!-- 快递公司 -->
      <van-field
        readonly
        clickable
        name="expressComName"
        :value="formMsg.expressComName"
        label="快递公司："
        placeholder="选择快递公司"
        @click="ExpshowPicker = true"
      />
      <van-popup v-model="ExpshowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="Expcolumns"
          @confirm="ExponConfirm"
          @cancel="ExpshowPicker = false"
        />
      </van-popup>
      <!-- 快递类型 -->
      <van-field
        readonly
        clickable
        name="expressType"
        :value="formMsg.expressType"
        label="快递类型："
        placeholder="选择快递类型"
        @click="TypshowPicker = true"
      />
      <van-popup v-model="TypshowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="Typcolumns"
          @confirm="TyponConfirm"
          @cancel="TypshowPicker = false"
        />
      </van-popup>
      <!-- 送货日期 -->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="formMsg.sendTime"
        label="送货日期"
        placeholder="选择时间"
        @click="SendshowPicker = true"
      />
      <van-popup v-model="SendshowPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datehour"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="TimeonConfirm"
          @cancel="SendshowPicker = false"
        />
      </van-popup>
      <!-- 收件人 -->
      <van-field
        v-model="formMsg.recipients"
        name="recipients"
        label="收件人："
        placeholder="收件人"
      />
      <!-- 取件地址 -->
      <van-field
        v-model="formMsg.address"
        name="address"
        label="取件地址："
        placeholder="取件地址"
      />
      <!-- 收件号码 -->
      <van-field
        v-model="formMsg.phone"
        name="phone"
        label="收件号码："
        placeholder="收件号码"
      />
      <!-- 取件码 -->
      <van-field
        v-model="formMsg.takeCode"
        name="takeCode"
        label="取件码："
        placeholder="取件码"
      />
      <!-- 赏金 -->
      <van-field
        v-model="formMsg.money"
        name="money"
        label="赏金："
        placeholder="赏金"
      />
      <!-- 备注 -->
      <van-field
        v-model="formMsg.message"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      Expcolumns: ['中通快递', '顺丰快递', '天天快递'],
      Typcolumns: ['大型包裹', '中型包裹', '小型包裹'],
      ExpshowPicker: false,
      TypshowPicker: false,
      SendshowPicker: false,
      formMsg: {
        expressComName: '',
        expressType: '',
        sendTime: '',
        recipients: '',
        address: '',
        phone: '',
        takeCode: '',
        money: '',
        message: '',
      },
    };
  },
  methods: {
    // form submit
    onSubmit(values) {
      this.$dialog
        .confirm({
          title: '确认提交吗?',
        })
        .then(() => {
          // on confirm
          console.log('submit', values);
        })
        .catch(() => {
          // on cancel
        });
    },
    ExponConfirm(value) {
      this.formMsg.expressComName = value;
      this.ExpshowPicker = false;
    },
    TyponConfirm(value) {
      this.formMsg.expressType = value;
      this.TypshowPicker = false;
    },
    TimeonConfirm(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour;

      const filterTime = `${year}-${month}-${day}、 ${hour}点前送达`;
      // console.log(filterTime);
      this.formMsg.sendTime = filterTime;
      this.SendshowPicker = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
