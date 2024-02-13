<script setup>
  import { ref } from 'vue'
  import {useCounterStore} from '@/stores/tasks'

  import Task from '@/components/Task.vue'
  import Panel from '@/components/Panel.vue'


  const createFlag = ref(false)
  const openCreateModal = () => {
    createFlag.value = !createFlag.value
  }

</script>

<template>
  <div class="main">
    <a-card class="header">
      <a-typography-text>To-Do List</a-typography-text>
      <a-button class="addBtn" @click="openCreateModal">+</a-button>
      <Panel v-if="createFlag" :open="createFlag" :openCreateModal="openCreateModal" />
    </a-card>
    <a-card v-if="useCounterStore().tasks.length">
      <a-flex wrap="wrap" gap="small" class="mainFlex">
        <Task />
      </a-flex>
    </a-card>
  </div>
</template>

<style scoped>
.main {
  width: 80%;
  margin: auto;
}
.header {
  margin-bottom: 10px;
}
.mainFlex {
  margin-top: 25px;
  text-align: start;
}
.addBtn {
  margin-left: 40px;
}

@media screen and (max-width: 600px) {
    .main {
        width: 95%;
    }
}
</style>
