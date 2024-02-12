<script setup>
  import { ref } from 'vue'

  import Task from '@/components/Task.vue'
  import Panel from '@/components/Panel.vue'


  const createFlag = ref(false)
  const openCreateModal = () => {
    createFlag.value = !createFlag.value
  }

</script>

<template>
  <a-card class="main">
    <a-typography-text>To-Do List</a-typography-text>
    <a-button class="addBtn" @click="openCreateModal">+</a-button>
    <Panel v-if="createFlag" :open="createFlag" :openCreateModal="openCreateModal" />
    <a-flex wrap="wrap" gap="small" class="mainFlex">
      <Task />
    </a-flex>
  </a-card>
</template>

<style scoped>
.main {
  width: 80%;
  margin: auto;
  margin-top: 45px;
}
.mainFlex {
  margin-top: 25px;
  text-align: start;
}
.addBtn {
  margin-left: 40px;
}
</style>
