<template>
  <a-table :columns="columns" :data-source="dataSource">
    <!-- 自定义操作列 -->
    <template #action="{ record }">
      <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
      <a-button type="danger" @click="handleDelete(record)">删除</a-button>
    </template>
    <!-- 自定义姓名列，添加额外的样式 -->
    <template #name="{ record }">
      <span style="color: blue">{{ record.name }}</span>
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
    key: 'name',
    // 使用插槽名称
    slots: {customRender: 'name'}
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
    key: 'action',
    // 使用插槽名称
    slots: {customRender: 'action'}
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