<script setup lang="ts">
import { Api } from './apis';
import { ref } from 'vue';

const pet_info = ref<Api.SwaggerV2.Pet>();

const current_pet_id = ref(1);
const fetchHandle = async () => {
  const res = await Api.SwaggerV2Api.get_pet_petId(current_pet_id.value);
  pet_info.value = res;
};

fetchHandle();

const viewNextPet = () => {
  current_pet_id.value += 1;
  fetchHandle();
};
</script>

<template>
  <div>
    <h2>Pet Info:</h2>
    <div>
      <p>id: {{ pet_info?.id || current_pet_id }}</p>
      <p>name: {{ pet_info?.name }}</p>
      <p>status: {{ pet_info?.status }}</p>
      <p>photoUrls: {{ pet_info?.photoUrls }}</p>
    </div>
    <button @click="viewNextPet">Next Pet</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
