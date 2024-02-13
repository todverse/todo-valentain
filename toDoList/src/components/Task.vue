<script setup>
import {useCounterStore} from '@/stores/tasks'

import {ref} from 'vue'
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';

const open = ref(false)
const openedTask = ref({})

const deleteTaskk = (date) => {
    useCounterStore().deleteTask(date)
}
const completeTaskk = (date) => {
    useCounterStore().complete(date)
}
const openModal = (e, data) => {
    if(e.target.tagName != 'svg' && e.target.tagName != 'path' && e.target.tagName != 'BUTTON') {
        openedTask.value = data
        open.value = !open.value
    }
}
</script>

<template>
    <a-card v-for="item in useCounterStore().tasks" class="taskDiv" :title="item.name" hoverable @click="(e) => {openModal(e, item)}">
        <a-flex>
            <div style="width: 80%;">
                <a-typography-text>Статус: <span :style="item.completed? 'color:green;': 'color:red;'">{{ item.completed? 'Выполнено': 'Не выполнено' }}</span></a-typography-text> <br/>
                <a-typography-text v-if="item.dateDo">{{ new Date(item.dateDo).toLocaleDateString() }}<br/></a-typography-text>
            </div>

            <div style="width: 20%;">
                <a-button class="btn" v-if="!item.completed" :type="item.completed? '': 'primary'" @click="completeTaskk(item.date)"><CheckOutlined /></a-button>
                <a-button class="btn" v-else :type="item.completed? '': 'primary'" @click="completeTaskk(item.date)"><CloseOutlined /></a-button>
                <a-button class="btn" danger @click="deleteTaskk(item.date)"><DeleteOutlined /></a-button>
            </div>
        </a-flex>
        <!-- <a-button @click="() => {useCounterStore().display()}">Показать все в консоли</a-button> -->
    </a-card>
    <a-modal v-model:open="open" @ok="() => {completeTaskk(openedTask.date); open = !open}" :okText="openedTask.completed? 'Не выполнено': 'Выполнить'" cancelText="Отменить">
            <div>
                <a-typography-text style="display: block; width: 80%;">{{ openedTask.name }}</a-typography-text>
                <a-typography-text>Статус: <span :style="openedTask.completed? 'color:green;': 'color:red;'">{{ openedTask.completed? 'Выполнено': 'Не выполнено' }}</span></a-typography-text> <br/>
                <a-typography-text v-if="openedTask.dateDo">{{ new Date(openedTask.dateDo).toLocaleDateString() }}<br/></a-typography-text>
            </div>
    </a-modal>
</template>

<style scoped>
.taskDiv {
    padding: 5px !important;
    width: 32% !important;
}
.btn {
    width: 100%;
}
.btn:last-child {
    margin-top: 10px;
}
@media screen and (max-width: 1600px) {
    .taskDiv {
        width: 49% !important;
    }
}
@media screen and (max-width: 900px) {
    .taskDiv {
        width: 99% !important;
    }
}
</style>