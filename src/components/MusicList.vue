<script setup>
import { axiosGet } from '@/utils/AxiosApi';
import { URL } from '@/utils/Constant';
import {ref, onMounted} from 'vue'

const musicList = ref([])

onMounted(() => {
    getAllmusic()  
})


const getAllmusic=()=>{
    axiosGet(URL.getAllMusic,(res)=>{
        if(res.data.success){
            musicList.value=res.data.data
        }
    },(err)=>{

    })
}


</script>

<template>
    <div class="row">
       <div class="col-lg-3" v-for="music in musicList">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ music.title }}</h5>
                <p class="card-text">Album: {{ music.album_name }}</p>
                <p class="card-text">Genre: {{ music.genre }}</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
       </div>

    </div>
</template>


<style scoped>

</style>