<template>
<div class="card" >
  <img class="card-img-top" width="600" src="./assets/city.jpg" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">City</h5>
    <div class="input-group mb-3">
      <input v-model="city" type="text" class="form-control" placeholder="Enter city name" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button @click="getData()" class="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>

      <p>{{ result }}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'

export default {
  name: 'App',
  setup() {
    const API_KEY = 'ab3d8a663bf1ef42a7f37d1641a6982e'

    const city = ref('')

    const result = ref([])

    const getData = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&lang=fa`)
      .then((res) => result.value = res)
    }

    return {
      getData,
      result,
      city
    }
  }
}
</script>

<style scoped>
</style>
