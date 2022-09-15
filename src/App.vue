<template>
<div class="container" >
  <div class="flex flex-col items-center mt-24 gap-16">
    <h1 class="text-4xl">نمایش وضعیت آب و هوا</h1>
    <div class="flex w-1/2">
      <input v-model="city" type="text" class="block focus:outline-0 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="اسم شهر را وارد کنید" >
      <button @click="getData()" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-l-lg">ارسال</button>
    </div>
    
      <div class="bg-green-200 text-green-600 text-center w-full p-4" v-if="state.result[0]">
        <div class="flex items-center"><span>شهر: </span><span>{{ state.result[0].name }} </span><span><img :src="`http://openweathermap.org/img/w/${state.result[0].weather[0].icon}.png`" :alt="state.result[0].name"></span></div>
        <div><span>وضعیت: </span><span>{{ state.result[0].weather[0].description }}</span></div>
        <div><span>دما: </span><span>{{ state.result[0].main.temp }}</span></div>
        <div><span>رطوبت: </span><span>{{ state.result[0].main.humidity }}</span></div>
      </div>
    
        <p v-if="errors" class="w-full bg-red-200 text-red-600 text-center p-4">
          {{ errors }}
        </p>

    
  </div>
</div>
</template>

<script>
import axios from './plugins/axios.js'
import { reactive, ref } from '@vue/reactivity'

export default {
  name: 'App',
  setup() {
    const API_KEY = 'ab3d8a663bf1ef42a7f37d1641a6982e'

    const city = ref('')

    const errors = ref(null)

    const state = reactive({
      result : []
    })

    const getData = () => {
      axios.get(`/weather`, {
        params: {
          q: city.value,
          appid: API_KEY,
          units: 'metric',
          lang: 'fa'
        }
      }).then(({ data }) => {
        errors.value = null
        console.log(data);
        state.result.push(data)
        city.value = null
      })
      .catch(({ response }) => {
        if (response.data) {
          state.result = []
          errors.value = response.data.message
        }
      })
    }
    







    return {
      getData,
      city,
      state,
      errors
    }
  }
}
</script>

<style scoped>
</style>
