<script setup>
    import { axiosGet } from '@/utils/AxiosApi';
import { URL } from '@/utils/Constant';
import {ref, onMounted} from 'vue'

const artistList = ref([])
    onMounted(() => {
      getAllArtists()  
    })


    const getAllArtists =()=>{
        axiosGet(URL.getAllArtist,(res)=>{
            if(res.data.success){
                artistList.value=res.data.data
            }
        },(err)=>{

        })
    }

</script>

<template>
    
        <div class="row">
            <div class="col-lg-3 mt-3" v-for="artist in artistList">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ artist.name }}</h5>
                <p class="card-text">DOB: {{ artist.dob }}</p>
                <p class="card-text">Address: {{ artist.address }}</p>
                <p class="card-text">Gender: {{ artist.gender }}</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
       </div>
        </div>
    
</template>

