<template>
  <div class="newTaskBox">
    <van-form @submit="onSubmit" class="subForm">
      <!-- 快递公司 -->
      <van-field
        readonly
        clickable
        name="express_name"
        :value="formMsg.express_name"
        label="快递公司："
        placeholder="选择快递公司"
        @click="ExpshowPicker = true"
        :rules="[{ required: true, message: '请选择快递公司' }]"
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
        name="express_type"
        :value="formMsg.express_type"
        label="快递类型："
        placeholder="选择快递类型"
        @click="TypshowPicker = true"
        :rules="[{ required: true, message: '请选择快递类型' }]"
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
        name="forward_delivery_time"
        :value="formMsg.forward_delivery_time"
        label="送货日期"
        placeholder="选择时间"
        @click="SendshowPicker = true"
        :rules="[{ required: true, message: '请选择时间' }]"
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
        v-model="formMsg.express_recipients"
        name="express_recipients"
        label="收件人："
        placeholder="收件人"
        :rules="[{ required: true, message: '请输入收件人' }]"
      />
      <!-- 取件地址 -->
      <van-field
        v-model="formMsg.delivery_address"
        name="delivery_address"
        label="取件地址："
        placeholder="取件地址"
        :rules="[{ required: true, message: '请输入取件地址' }]"
      />
      <!-- 收件号码 -->
      <van-field
        v-model="formMsg.phone"
        name="phone"
        label="收件号码："
        placeholder="收件号码"
        :rules="[{ required: true, message: '请输入收件号码' }]"
      />
      <!-- 取件码 -->
      <van-field
        v-model="formMsg.pick_code"
        name="pick_code"
        label="取件码："
        placeholder="取件码"
        :rules="[{ required: true, message: '请输入取件码' }]"
      />
      <!-- 赏金 -->
      <van-field
        v-model="formMsg.express_money"
        name="express_money"
        label="赏金："
        placeholder="赏金"
        :rules="[{ required: true, message: '请输入赏金' }]"
      />
      <!-- 备注 -->
      <van-field
        name="remarks"
        v-model="formMsg.remarks"
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
      Expcolumns: [
        '中通快递',
        '顺丰快递',
        '天天快递',
        '申通快递',
        '圆通快递',
        'EMS邮政',
        '百世快递',
        '韵达快递',
      ],
      Typcolumns: ['大型包裹', '中型包裹', '小型包裹'],
      ExpshowPicker: false,
      TypshowPicker: false,
      SendshowPicker: false,
      formMsg: {
        express_name: '',
        express_type: '',
        forward_delivery_time: '',
        express_recipients: '',
        delivery_address: '',
        phone: '',
        pick_code: '',
        express_money: '',
        remarks: '',
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
        .then(async () => {
          // on confirm
          // console.log('submit', values);
          const { data: res } = await this.$axios.Post(
            this.$api.add_express,
            values,
          );
          // console.log(res);
          if (res.code == 200) {
            this.$router.push('/home');
            this.$toast.success(res.msg);
          }
        })
        .catch(() => {
          // on cancel
          this.formMsg = {};
        });
    },
    ExponConfirm(value) {
      this.formMsg.express_name = value;
      this.ExpshowPicker = false;
    },
    TyponConfirm(value) {
      this.formMsg.express_type = value;
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

      const filterTime = `${year}-${month}-${day}-${hour}(点)`;
      // const filterTime = `${year}-${month}-${day}`;
      // console.log(filterTime);
      this.formMsg.forward_delivery_time = filterTime;
      this.SendshowPicker = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
