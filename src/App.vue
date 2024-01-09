<script setup>
import Navbar from './components/Navbar.vue'
import {RouterView} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import { useRoute } from 'vue-router'

  const route = computed(()=>{
    return useRoute()
  })
  const isDashboard=ref(route.value.fullPath.includes('dashboard'))
  
</script>


<template>
   <Navbar v-if="!isDashboard"/>
  <div class="container mt-5">
   <RouterView />
  </div>
</template>