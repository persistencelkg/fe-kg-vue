<script setup lang="ts">

import {reactive, ref} from "vue";
import SelectToSelect, {compose, selectOptionType} from "../../../components/form/SelectToSelect.vue";

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
  console.log(a, '---', value)
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Price must be greater than zero!'));
};

// 选项 - option
const options = ref<compose[]>([
  {
    id: 1,
    key: 'f1',
    value: 'jack',
    label: 'Jack (100)',
  },
  {
    id: 2,
    key: 'f2',
    value: 'lucy',
    label: 'Lucy (101)',
  },
]);

const cascadeData: { [key: string]: compose[] } = {
  f1: [
    {
      id: 2,
      key: '1',
      value: 'f1 111',
      label: 'f1 (101)',
    },
    {
      id: 3,
      key: '1',
      value: 'f1 222',
      label: 'f1 (102)',
    }
  ],
  f2: [
    {
      id: 33,
      key: '1',
      value: 'f2 111',
      label: 'f2 (101)',
    },
    {
      id: 44,
      key: '1',
      value: 'f2 222',
      label: 'f2 (102)',
    }
  ]
}

const main = ref<compose>(options.value[0])
const defaultCascade = ref<compose | undefined>(undefined);
const getA2Options = (a1Value: selectOptionType) => {
  if (!a1Value) {
    return []
  }
  // todo 后续需要替换的后端数据
  return cascadeData[a1Value.key]
};


</script>


<template>

  <a-card style="width: 100%; background-color: #ececec;">
    <!--       gutter[水平间距， 垂直间距]-->
    <a-row :gutter="[16, 48]">
      <a-col :span="20" class="gutter-row">
        <a-form name="customized_form_controls" layout="inline" :model="formState" @finish="onFinish">
          <a-form-item name="price" label="Price" :rules="[{ validator: checkPrice }]">
            <a-input type="text" style="width: 100px"/>
          </a-form-item>

          <SelectToSelect :main-model="main"
                          :cascade-model="defaultCascade"
                          :main-option="options"
                          :cascade-fun="getA2Options"/>
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