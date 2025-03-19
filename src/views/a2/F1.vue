<template>
  <a-table :columns="columns" :data-source="dataSource">
    <!-- 自定义操作列 -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button type="primary" @click="handleEdit(column)">编辑</a-button>
        <a-button type="danger" @click="handleDelete(column)">删除</a-button>
      </template>
      <template v-else-if="column.key === 'name'">
        <span style="color: blue">{{ record.name }}</span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {message} from "ant-design-vue";

// 模拟数据
const dataSource = ref([
  {
    key: '1',
    name: '张三',
    age: 20,
    address: '北京市朝阳区'
  },
  {
    key: '2',
    name: '李四',
    age: 25,
    address: '上海市浦东新区'
  }
]);

// 表格列配置
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    key: 'action'
  }
];

// 编辑操作
const handleEdit = (record: any) => {
  message.info(`编辑 ${record.name}`);
};

// 删除操作
const handleDelete = (record: any) => {
  message.warn(`删除 ${record.name}`);
};
</script>