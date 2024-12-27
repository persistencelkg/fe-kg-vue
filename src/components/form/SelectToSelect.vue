<script setup lang="ts">
// 组合式 不能集成选项式


// 能用interface 就用interface 不能就用type 二者可以互相切换、继承
import {computed, ref, watch} from "vue";
import {Form, SelectProps} from "ant-design-vue";
import {DefaultOptionType} from "ant-design-vue/es/vc-cascader";

type selectOptionType = { value: number | string, label: string, key: string}

// 定义父组件传来的属性名
// const props = defineProps<{
//   foo: string
//   bar?: number
// }>()


// 1. select 选中枚举后 ->  2.更新select结果内容

// 定义父组件传来的方法名
const selectChangeEmit = defineEmits<{
  (e: 'selectChange', obj: selectOptionType): void
}>()
// 简写
// const demo = defineEmits<{
//   selectChange: [obj: selectOptionType],
//   update: [id: number]
// }>()
// 简写
const formItemContext = Form.useInjectFormItemContext();
// 子组件所封装方法的逻辑
const selectChangeFun = (val: selectOptionType) => {
  // 1.拿到选中的item的值，并透传给父组件
  selectChangeEmit('selectChange', val)
  // 2.进行根据select 级联关联第二个select的值

  // 属性change 强制告诉表单属性发生变化 ，多用来告诉表单校验器 触发校验
  formItemContext.onFieldChange();
}

// 选项 - option
const options  = ref<SelectProps['options']>([
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

//No index signature with a parameter of type 'string'
// Plan A: 定义类型，避免ts数组访问类型越界 key value
const cascadeData:{[key: string]: DefaultOptionType[]} ={
    f1: [
      {
        key: '1',
        value: 'f1 111',
        label: 'f1 (101)',
      },
      {
        key: '1',
        value: 'f1 222',
        label: 'f1 (102)',
      }
    ],
    f2: [
      {
        key: '1',
        value: 'f2 111',
        label: 'f2 (101)',
      },
      {
        key: '1',
        value: 'f2 222',
        label: 'f2 (102)',
      }
    ]
}



// 默认选项 - model
const value = ref<DefaultOptionType | null>( null)
const value2 = ref<DefaultOptionType | null>( null)
// 第二个select 选项需要动态控制
watch(value, (val: any) => {
  // console.log('watch ', val.key, value.value)
  value2.value = cascadeData[val.key][0]
})

const cascadeOption = computed(() => {
  if (!value || !value.value) {
    return []
  }
  return cascadeData[value.value.key]

})

</script>

<template>
  <a-form-item label="第一个">
    <a-select
        v-model:value="value"
        label-in-value
        style="width: 120px"
        :options="options"
        @change="selectChangeFun"
    ></a-select>
  </a-form-item>

  <a-form-item label="第二个">
    <a-select
        :value="value2"
        style="width: 120px"
        :options="cascadeOption"
    ></a-select>
  </a-form-item>

</template>

<style scoped>

</style>