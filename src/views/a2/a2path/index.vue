<template>
  <div>
    <a-form layout="inline" :model="ruleList">
      <a-form-item label="规则名称">
        <a-input placeholder="规则名称" v-model="ruleName"/>
      </a-form-item>
      <a-form-item label="服务名称">
        <a-input placeholder="服务名称" v-model="serviceName"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="search">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="reset">重置</a-button>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="showModal">新增</a-button>
    <a-table :columns="columns" :data-source="ruleList">
       <!--      bodyCell 只能结构text, record, index, column  -->
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-button style="background-color: lightgreen" type="primary" @click.prevent="editRule(column)">修改</a-button>
          <a-divider type="vertical"/>
          <a-button type="primary" @click.prevent="deleteRule(column)">删除</a-button>
        </template>
      </template>
    </a-table>
    <EditRuleModal v-model:visible="modalVisible" @ok="handleModalOk"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import EditRuleModal from './EditRuleModal.vue';
import {message} from "ant-design-vue";

// 模拟数据
const ruleList = ref([
  {
    id: 1,
    serviceName: 'cycle-order-mix',
    switchName: 'biz-test',
    grayControlStatus: '启用',
    globalSwitchRange: '灰度控制',
    version: 'biz-test-20250224-0037',
    group: '90802706',
    updateTime: '2025-02-24 15:14:17',

  }
]);

const ruleName = ref('');
const serviceName = ref('');
const modalVisible = ref(false);

const columns = [
  {
    title: '服务名称',
    key: 'serviceName',
    dataIndex: 'serviceName'
  },
  {
    title: '开关名称',
    key: 'switchName',
    dataIndex: 'switchName'
  },
  {
    title: '灰度控制状态',
    key: 'grayControlStatus',
    dataIndex: 'grayControlStatus'
  },
  {
    title: '全局开关范围',
    key: 'globalSwitchRange',
    dataIndex: 'globalSwitchRange'
  },
  {
    title: '版本',
    key: 'version',
    dataIndex: 'version'
  },
  {
    title: '所属组',
    key: 'group',
    dataIndex: 'group'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '操作',
    key: 'action',
    // 使用插槽名称 v3已经弃用
    // slots: {customRender: 'action'}
  }
];

const showModal = () => {
  modalVisible.value = true;
};

const search = () => {
  // 模拟搜索逻辑
  console.log('搜索条件：', ruleName.value, serviceName.value);
};

const reset = () => {
  ruleName.value = '';
  serviceName.value = '';
};

const editRule = (record: any) => {
  // 编辑逻辑，可传递record数据到弹窗
  console.log('编辑规则：', record);
  message.info(`编辑 ${record.switchName}`);
};

const deleteRule = (record: any) => {
  // 删除逻辑
  console.log('删除规则：', record);
};

const handleModalOk = () => {
  // 处理弹窗确定按钮点击事件
  // modalVisible.value = false;
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 12px; /* 设置子元素之间的间距 */
}
</style>
<!--</template>-->