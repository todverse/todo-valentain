<script setup>
import { onMounted, ref } from 'vue';

const state = ref(true)

const moveTo = () => {
    no.style.position = 'absolute'
    no.style.left = `${Math.ceil(Math.random() * 90)}%`
    no.style.top = `${Math.ceil(Math.random() * 90)}%`
  }

onMounted(() => {
  const no = document.getElementById('no')
  no.addEventListener('mouseover', moveTo)
})
</script>

<template>
  <div v-if="state" class="block">
    <h2 class="text">Ты будешь моей валентинкой?</h2>
    <img src="/cute-cat.gif" />
    <div style="margin-top: 15px;">
      <button class="btn" @click="() => {state = false}">ДА</button>
      <button class="btn" @click="moveTo" id="no">НЕТ</button>
    </div>
  </div>
  <div v-else class="block">
    <h2 class="text">Урааа, спасибооо!!!!!</h2>
    <img src="/cat.gif" />
  </div>
</template>

<style>
@font-face {
    font-family: hurts;
    src: url('/font.ttf');
}

body {
  font-family: hurts;
}

#app {
  width: 100%;
  height: 100vh;
  display: table;
  background-image: url('/back.jpg');
}
.block {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.text {
  font-size: xx-large;
  width: 500px;
  margin: auto;
  margin-bottom: 20px;
  background-color: rgba(172, 235, 172, 0.616);
  border-radius: 10px;
  padding: 5px;
}
#no {
  transition: .5s;
}
.btn {
  width: 100px;
  background-color: rgba(255, 167, 167, 0.699);
  margin: 0px 5px 0px 5px;
  padding: 5px;
  border: none;
  border-radius: 5px;
}
.btn:hover {
  cursor: pointer;
  background-color: rgba(255, 167, 167, 0.897);
}

@media screen and (max-width: 550px) {
  .text {
    width: 300px;
  }
  img {
    width: 300px;
  }
}
</style>
