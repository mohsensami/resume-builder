<template>
<div class="container" >
  <div class="flex flex-col items-center mt-24 gap-16">
    <h1 class="text-4xl text-white">نمایش وضعیت آب و هوا</h1>
    <div class="flex sm:w-1/2 w-3/4" >
      <input v-on:keyup.enter="getData()" v-model="city" type="text" class="flex-1 block focus:outline-0 p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="اسم شهر را وارد کنید" >
      <button v-on:click="getData()"  :class="{'cursor-not-allowed' : loading}" class=" bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-l-lg flex items-center">
        {{ !loading ? 'ارسال' : 'درحال دریافت اطلاعات' }}
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </div>
    
      <!-- <div class="bg-green-200 text-green-600 text-center w-full p-4" v-if="state.result[0]">
        <div class="flex items-center"><span>شهر: </span><span>{{ state.result[0].name }} </span><span><img :src="`http://openweathermap.org/img/w/${state.result[0].weather[0].icon}.png`" :alt="state.result[0].name"></span></div>
        <div><span>وضعیت: </span><span>{{ state.result[0].weather[0].description }}</span></div>
        <div><span>دما: </span><span>{{ state.result[0].main.temp }}</span></div>
        <div><span>رطوبت: </span><span>{{ state.result[0].main.humidity }}</span></div>
      </div> -->










      <div v-if="state.result[0]" class="p-4 w-full max-w-sm bg-white bg-opacity-30 rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="flex items-center mb-3 text-base text-gray-900 md:text-xl dark:text-white">
          <span><img class="ml-2" width="20" :src="`http://openweathermap.org/images/flags/${state.result[0].sys.country.toLowerCase()}.png`" :alt="state.result[0].name"></span><span>{{ state.result[0].name }} </span><span><img :src="`http://openweathermap.org/img/w/${state.result[0].weather[0].icon}.png`" :alt="state.result[0].name"></span>
        </h5>
        <ul class="my-4 space-y-3">
            <li>
                <a href="#" class="flex items-center p-3 text-base text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap"><span>وضعیت: </span><span>{{ state.result[0].weather[0].description }}</span></span>
                    <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-3 text-base text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap"><span>دما: </span><span>{{ state.result[0].main.temp }}</span></span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-3 text-base text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap"><span>رطوبت: </span><span>{{ state.result[0].main.humidity }}</span></span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-3 text-base text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap"><span>طلوع آفتاب: </span><span>{{ timeConvert(state.result[0].sys.sunrise) }}</span></span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center p-3 text-base text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap"><span>غروب آفتاب: </span><span>{{ timeConvert(state.result[0].sys.sunset) }}</span></span>
                </a>
            </li>
        </ul>
        <div>
        </div>
    </div>












    
        <p v-if="errors" class="w-full bg-red-200 text-red-600 bg-opacity-70 text-center p-4">
          {{ errors }}
        </p>

    
  </div>
</div>
</template>

<script>
import axios from './plugins/axios.js'
import { reactive, ref } from '@vue/reactivity'
import timeConvert from './utils/unixTimeConvert.js';

export default {
  name: 'App',
  setup() {
    const API_KEY = 'ab3d8a663bf1ef42a7f37d1641a6982e'
    const loading = ref(false);
    const city = ref('');
    const errors = ref(null);
    const state = reactive({
      result : []
    })
    const getData = () => {
      if (city.value == '') {
        errors.value = 'please enter a valid city';
        return false;
      }
      loading.value = true;
      axios.get(`/weather`, {
        params: {
          q: city.value,
          appid: API_KEY,
          units: 'metric',
          lang: 'fa'
        }
      }).then(({ data }) => {
        loading.value = false;
        errors.value = null;
        state.result = [];
        state.result.push(data);
        city.value = null;
      })
      .catch(({ response }) => {
        loading.value = false;
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
      errors,
      loading,
      timeConvert
    }
  }
}
</script>

<style scoped>
</style>
