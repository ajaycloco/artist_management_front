<script setup>
import {ref} from 'vue'
import { emptyCheck} from '@/utils/validation';
import { axiosPost } from '@/utils/AxiosApi';
import { URL } from '@/utils/Constant';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref("")
const password = ref("")
const submitSpinner = ref(false)
const error = ref(false)



const handleLogin=()=>{
    event.preventDefault()
    error.value=false
    let data = {
        email:email.value,
        password:password.value
    }
    if(!emptyCheck(data.email) || !emptyCheck(data.password)){
        error.value=true
    }

    if (error.value) return;
    submitSpinner.value=true
    axiosPost(URL.loginUrl,data,(response)=>{
        if(response.data.success){
            let token= response.data.jwt_access_token.bearer_token
            let expiration_date= response.data.jwt_access_token.expiration_date
            localStorage.setItem('token',token)
            localStorage.setItem('expiration_date',expiration_date)
            router.push('/dashboard')
        }
        submitSpinner.value=false
    },(err)=>{
        submitSpinner.value=false

    })
    
}
</script>

<template>
    <div class="row mt-5">
        <div class="col-lg-12 d-flex justify-content-center">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input v-model.trim="email" :class="{ 'is-invalid': error && email == '' }" type="email" class="form-control"
                        id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model.trim="password" :class="{ 'is-invalid': error && password == '' }" type="password"
                        class="form-control" id="exampleInputPassword1">
                </div>
                <button @click="handleLogin()" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>