<template>
  <a-modal v-bind="$attrs" title="修改规则" :open="visible" @ok="handleOk">
    <a-form>
      <a-form-item label="开关名称">
        <a-input v-model="switchName"/>
      </a-form-item>
      <a-form-item label="开关描述">
        <a-input v-model="switchDescription"/>
      </a-form-item>
      <a-form-item label="服务名称">
        <a-select v-model="serviceName">
          <a-select-option value="cycle-order-mix">cycle-order-mix</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 其他表单字段以此类推 -->
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:visible', 'ok']);

const switchName = ref('');
const switchDescription = ref('');
const serviceName = ref('cycle-order-mix');

const handleOk = () => {
  // 处理表单提交逻辑
  console.log('提交的数据：', {
    switchName: switchName.value,
    switchDescription: switchDescription.value,
    serviceName: serviceName.value
  });
  // emit('ok');
  emit('update:visible', false);
};
</script>

<style scoped>

</style>