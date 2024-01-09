<template>
  <div class="spinner d-flex justify-content-center">
    <p class="loading">Loading...</p>
  </div>  
</template>


<style scoped>

.spinner{
    position: absolute;
    top:0;
    left: 0;
    background-color: gray;
    opacity: 0.89;
    z-index:1;
    width:100%;
    height: 100%;
    align-items: center;
}
.loading{
    font-size: 30px;
    font-weight: 500;
    z-index: 10;
}
</style>