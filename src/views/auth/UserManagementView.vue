<script setup>
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateModal from '@/components/UpdateModal.vue'
import CreateModal from '@/components/CreateModal.vue'


import { ref } from 'vue'

const deleteModal = ref(false)
const updateModal = ref(false)
const createModal = ref(false)
const name = ref("")
const email = ref("")
const status = ref(1)



const handleDelete = () => {
        debugger;
}

const toggleDeleteModal = () => {
        deleteModal.value = !deleteModal.value
}
const toggleCreateModal = () => {
        createModal.value = !createModal.value
}

const toggleUpdateModal = () => {
        updateModal.value = !updateModal.value
        if(!updateModal.value){
                name.value="";
                email.value=""
                status.value=1
        }
}


const handleUpdate = () => {
       let data ={
                name:name.value,
                email:email.value,
                status:status.value,
        }
}

const handleCreate = () => {
        let data ={
                name:name.value,
                email:email.value,
                status:status.value,
        }
}
</script>


<template>
        <div class="row">
                <div class="col-lg-12 d-flex justify-content-between">
                        <h1>Users List</h1>
                        <button class="btn btn-success" @click="toggleCreateModal">Add New</button>
                </div>
        </div>
        <div class="row mt-3">
                <div class="col-lg-12 table-responsive">
                        <table class="table table-responsive">
                                <thead>
                                        <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                                <th>Action</th>

                                        </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                                <td>1</td>
                                                <td>john</td>
                                                <td>Doe</td>
                                                <td>Enabled</td>
                                                <td class="d-flex">
                                                        <button class="btn btn-primary" @click="toggleUpdateModal">Edit</button>
                                                        <button class="btn btn-danger" @click="toggleDeleteModal">Delete</button>
                                                </td>

                                        </tr>
                                </tbody>
                        </table>
                </div>
        </div>


         <!-- delete modal -->
         <DeleteModal v-if="deleteModal" :toggle="deleteModal" @toggle-delete-modal="toggleDeleteModal"
                @handle-delete="handleDelete">
        </DeleteModal>


        <!-- update modal -->
        <UpdateModal v-if="updateModal" :toggle="updateModal" title="Update User" @toggle-update-modal="toggleUpdateModal"
                @handle-update="handleUpdate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                                <input v-model.trim="name" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                                <input v-model.trim="email" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Status</label>
                                                <select class="form-control" v-model="genre">
                                                        <option value="1">Enable</option>
                                                        <option value="0">Disable</option>

                                                </select>
                                        </div>
                                        

                                </form>
                        </div>
                </div>
        </UpdateModal>


        <!-- create modal -->
        <CreateModal v-if="createModal" :toggle="createModal" title="Create User" @toggle-create-modal="toggleCreateModal"
                @handle-create="handleCreate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                                <input v-model.trim="name" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                                <input v-model.trim="email" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Status</label>
                                                <select class="form-control" v-model="genre">
                                                        <option value="1">Enable</option>
                                                        <option value="0">Disable</option>

                                                </select>
                                        </div>

                                </form>
                        </div>
                </div>
        </CreateModal>
</template>