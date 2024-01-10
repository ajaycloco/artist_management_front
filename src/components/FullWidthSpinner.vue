<script setup>
import spinner from '../assets/loading-gif.gif'
</script>

<template>
  <div class="spinner d-flex justify-content-center">
    <img :src="spinner" />
  </div>  
</template>

<style scoped>

.spinner{
    position: absolute;
    top:0;
    left: 0;
    background-color: gray;
    opacity: 0.89;
    z-index:10000;
    width:100%;
    height: 100%;
    align-items: center;
}
.loading{
    font-size: 30px;
    font-weight: 500;
}
</style>