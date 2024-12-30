<script setup lang="ts">
// 组合式 不能集成选项式


// 能用interface 就用interface 不能就用type 二者可以互相切换、继承
import {computed, ref, watch} from "vue";
import {DefaultOptionType} from "ant-design-vue/es/vc-cascader";

// & 继承
export type selectOptionType = { id: number, key: number | string}
export type compose = DefaultOptionType & selectOptionType


// 定义父组件传来的属性名
// 通过定义属性a 由父组件传值，然后当a变化，其余变量跟着变化
const props = defineProps<{
  mainModel?: selectOptionType,
  cascadeModel?: compose | undefined,
  mainOption: DefaultOptionType[] ,
  cascadeFun: (arg: selectOptionType) => compose[]
}>()


// ----------------------- 第一种联动写法

// 定义父组件传来的方法名
defineEmits<{
  (e: 'update:mainModel'): void,
  (e: 'update:cascadeModel'): void
}>()
// 简写
// const formItemContext = Form.useInjectFormItemContext();
// 当select@change事件被触发， 就通过子组件所封装方法的逻辑 透传给父组件


// 默认选项 - model
const main = ref(props.mainModel)
const cascade = ref(props.cascadeModel)


// watch是浅监听，如果嵌套对象 需要deep true，或者指定对象
// watch(main, (newVal) => {
//   console.log('识别-->')
// }, {deep: true})

// 当主select 变化，触发 次select 选项计算
const cascadeOption = computed(() => {
  // console.log('props.mainModel',main.value)
  if (!props || !main) {
    return []
  }
  const optionTypes = props.cascadeFun(main.value);
  cascade.value = optionTypes[0]
  return optionTypes;
})

</script>

<template>
  <a-form-item label="第一个">
    <a-select
        v-model:value="main"
        label-in-value
        style="width: 120px"
        :options="props.mainOption"
        @change="$emit('update:mainModel', $event)"
    ></a-select>
  </a-form-item>

  <a-form-item label="第二个">
    <a-select
        :value="cascade"
        label-in-value
        style="width: 120px"
        :options="cascadeOption"
    ></a-select>
  </a-form-item>

</template>

<style scoped>

</style>