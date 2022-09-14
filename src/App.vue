<template>
<div class="container" >
  <div class="flex flex-col justify-center items-center h-screen gap-16">
    <h1 class="text-4xl">نمایش وضعیت آب و هوا</h1>
    <div class="flex w-1/2">
      <input v-model="city" type="text" class="block focus:outline-0 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="اسم شهر را وارد کنید" >
      <button @click="getData()" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-l-lg">ارسال</button>
    </div>
    <div>

      <ul>
        <li class="flex items-center"><span>شهر: </span> <span>{{ result.name }}</span><span><img :src="`http://openweathermap.org/img/w/${result.weather[0].icon}.png`" :alt="result.name"></span></li>
        <li><span>وضعیت: </span><span>{{ result.weather[0].description }}</span></li>
        <li><span>دما: </span><span>{{ result.main.temp }}</span></li>
        <li><span>رطوبت: </span><span>{{ result.main.humidity }}</span></li>
      </ul>

      <!-- <img :src="`http://openweathermap.org/img/w/${result.weather[0].icon}.png`" alt=""> -->
      <!-- <p><span>وضعیت: </span> {{ result.weather[0].description }}</p> -->


    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { reactive, ref } from '@vue/reactivity'

export default {
  name: 'App',
  setup() {
    const API_KEY = 'ab3d8a663bf1ef42a7f37d1641a6982e'

    const city = ref('')

    const result = ref('')

    const getData = () => {
      // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&lang=fa`)
      // .then((res) => result.value = res)
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city.value,
          appid: API_KEY,
          units: 'metric',
          lang: 'fa'
        }
      }).then(({ data }) => {
        result.value = data
      })
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
