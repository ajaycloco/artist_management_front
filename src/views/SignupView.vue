<script setup>

import {ref} from 'vue'
import {emptyCheck, emailValidation, passwordValidation} from '../utils/validation.js'
import {axiosPost} from '../utils/AxiosApi'
import {URL} from '../utils/Constant'
import FullWidthSpinner from '../components/FullWidthSpinner.vue'
import axios from 'axios'

const fullName = ref("")
const email = ref("")
const password = ref("")
const error = ref(false)
const errorMessages= ref([])
const submitSpinner=ref(false)

const handleSignup=()=>{
   error.value=false
   errorMessages.value=[]
   let data={
        full_name:fullName.value,
        email:email.value,
        password:password.value,
        status:true
    }
    if(!emptyCheck(data.full_name) || !emptyCheck(data.email) || !emptyCheck(data.password)){
        error.value=true;
    }
    // email validation
    if(!emailValidation(data.email)){
        error.value=true;
        errorMessages.value.push('Invalid Email Fromat')
    }
    // password validation
    if(!passwordValidation(data.password)){
        error.value=true;
        errorMessages.value.push('Minimum 8 character required')
    }

    if (error.value) return;

    submitSpinner.value=true

    axiosPost(URL.signup,data,
    (resopnse)=>{
      if(resopnse.data.success){
        fullName.value=""
        email.value=""
        password.value=""
      }
      submitSpinner.value=false
    },
    (err)=>{
      submitSpinner.value=false
    })
  




}


</script>

<template>
  <FullWidthSpinner v-if="submitSpinner" />
    <div class="row" v-if="error && errorMessages.length>0">
        
        <div class="col-lg-12 d-flex justify-content-center">
            <div>
                <p class="text-danger">Errors: </p>
            <ul>
                <li v-for="er in errorMessages " class="text-danger">{{ er }}</li>
            </ul>
            </div>
    </div>
    </div>
   <div class="row">
   <div class="col-lg-12 d-flex justify-content-center">
    <div>
        <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Full Name</label>
    <input v-model.trim="fullName" type="text" class="form-control" :class="{'is-invalid':error && fullName==''}" id="fullName" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input v-model.trim="email" :class="{'is-invalid':error && email==''}" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input v-model.trim="password" :class="{'is-invalid':error && password==''}" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button @click="handleSignup()" class="btn btn-primary">Submit</button>
</div>
   </div>
   </div>
</template>