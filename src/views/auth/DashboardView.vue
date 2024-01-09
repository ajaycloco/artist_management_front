<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="row mt-5">
        <div class="col-lg-12 d-flex justify-content-center">
            <h1>Dashboad</h1>
        </div>
    </div>
    <div class="row mt-5 d-flex justify-content-between">
            <RouterLink to="/dashboard/music-management" class="col-lg-4 music-box link">
                <p>Musics</p>
                <small>5 Records</small>
            </RouterLink>
            <RouterLink to="/dashboard/artist-management" class="col-lg-4 artist-box link">
                <p>Artists</p>
                <small>5 Records</small>
            </RouterLink>
            <RouterLink to="/dashboard/user-management" class="col-lg-4 user-box link">
                <p>users</p>
                <small>5 Records</small>
            </RouterLink>
       
    </div>
</template>

<style scoped>
.music-box,
.user-box,
.artist-box {
    width: 30%;
    height: 120px;
    color: white;
    border-radius: 5px;
    font-size: 25px;
    text-decoration: none;
    padding: 10px;
}

.music-box {
    border: 1px solid rgb(128, 73, 0);
    background-color: teal;
}

.artist-box {
    border: 1px solid rgb(231, 201, 37);
    background-color: rgb(231, 201, 37);
}

.user-box {
    border: 1px solid rgb(166, 42, 156);
    background-color: rgb(166, 42, 156);
}


</style>