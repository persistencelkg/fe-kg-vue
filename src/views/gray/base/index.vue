<script setup lang="ts">

import {reactive} from "vue";

const formState = reactive({
  price: {
    number: 0,
    currency: 'rmb',
  },
});
const onFinish = (values: any) => {
  console.log('Received values from form: ', values);
};
const checkPrice = (a: any, value: { number: number }) => {
  console.log(a,'---', value)
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Price must be greater than zero!'));
};
</script>

<template>

  <a-card style="width: 100%; background-color: #ececec;">
<!--       gutter[水平间距， 垂直间距]-->
    <a-row :gutter="[16, 48]">
      <a-col :span="20" class="gutter-row">
        <a-form name="customized_form_controls" layout="inline" :model="formState" @finish="onFinish">
          <a-form-item name="price" label="Price" :rules="[{ validator: checkPrice }]">
            <a-input type="text" style="width: 100px" />

            <!--          <price-input v-model:value="formState.price" />-->
          </a-form-item>
          <a-form-item>
            <a-select
                style="width: 80px; margin: 0 8px"
                :options="[
        { value: 'rmb', label: 'RMB' },
        { value: 'dollar', label: 'Dollar' },
      ]"

            ></a-select>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button type="primary" html-type="submit">重置</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="4" class="gutter-row">
        <a-button type="primary" html-type="submit">新增服务</a-button>
      </a-col>
      <a-col class="gutter-row" :span="24">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped>

</style>