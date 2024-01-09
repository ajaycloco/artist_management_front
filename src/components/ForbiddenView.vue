
<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
</script>
<template>

   <div class="row">
    <div class="col-lg-12 d-flex justify-content-center">
       <div>
        <h2> User Does Not have access to this Resource</h2>
        <div class="btn btn-primary" @click="router.back()">Back</div>
       </div>
    </div>
   </div>

</template>