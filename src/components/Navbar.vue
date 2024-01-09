<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">Artist Management System</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="nav-active"  to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="musics" active-class="nav-active" class="nav-link" >Musics</RouterLink> 
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="nav-active" to="/artists">Artists</RouterLink>
        </li>
      </ul>
      <form class="d-flex">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link active" active-class="nav-active" to="/login">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="nav-active"  to="sign-up">Sign Up</RouterLink>
        </li>
        
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="nav-active"  to="/dashboard">Dashboad</RouterLink>
        </li>
        
      </ul>
      </form>
    </div>
  </div>
</nav>
</template>


<style scoped>
.nav-active{
  font-weight: bold;
}
</style>