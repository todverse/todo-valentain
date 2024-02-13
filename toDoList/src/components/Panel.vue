<script setup>
import { ref, onMounted } from 'vue'
import {useCounterStore} from '@/stores/tasks'
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const props = defineProps(['open', 'openCreateModal'])

onMounted(() => {
    // let i = 0
    let input = document.getElementById('nameInput')
    // let date = document.getElementById('dateInput')
    input.focus()
    // console.log(date)
    // window.addEventListener('keypress', (e) => {
    //     if(i == 0) {
    //         if(e.key == 'Enter') {
    //             console.log(e.key, i)

    //             i++
    //         }
    //     } else if(i == 1) {
    //         if(e.key == 'Enter') {
    //             console.log(e.key, i)

    //             i++
    //         }
    //     }
    // })
})

const name = ref('')
const dateDo = ref(0)
const createTaskk = () => {
    useCounterStore().createTask({
        name: name,
        date: Number(new Date()),
        dateDo: dateDo,
        completed: false
    })
    props.openCreateModal()
}
</script>

<template>
    <a-modal v-model:open="props.open" :closable="false" @ok="createTaskk" @cancel="openCreateModal" okText="Создать" cancelText="Отменить">
        <a-typography-title :level="2">Создать задачу</a-typography-title>
        <a-form>
            <a-form-item label="Что нужно сделать?">
                <a-input id="nameInput" v-model:value="name" type="text" placeholder="Позвони маме" />
            </a-form-item>
            <a-form-item label="До какого числа?">
                <a-config-provider :locale="locale">
                    <a-date-picker id="dateInput" v-model:value="dateDo" :locale="locale" />
                </a-config-provider>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped>

</style>