<script setup>
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateModal from '@/components/UpdateModal.vue'
import CreateModal from '@/components/CreateModal.vue'
import FullWidthSpinner from '@/components/FullWidthSpinner.vue'
import { ref, onMounted } from 'vue'
import { axiosGet, axiosPost } from '@/utils/AxiosApi';
import { URL } from '@/utils/Constant';
import { emptyCheck } from '@/utils/validation';

const deleteModal = ref(false)
const updateModal = ref(false)
const createModal = ref(false)
const name = ref("")
const email = ref("")
const status = ref(true)
const password = ref("")
const submitSpinner = ref(false)
const userList = ref([])
const selectedUserId = ref("")
const dataLoader = ref(true)
const error = ref(false)
const errorMessages = ref([])


onMounted(() => {
        getAllUsers()
})


const getAllUsers = () => {
        dataLoader.value = true
        axiosGet(URL.getAllUsers, (response) => {
                if (response.data.success) {
                        userList.value = response.data.data
                        dataLoader.value = false
                }
        },
        (err) => {

        })
}



const handleDelete = () => {
        submitSpinner.value = true
        axiosGet(`${URL.deleteUser}/${selectedUserId.value}/delete`, (res) => {
                if (res.data.success) {
                        getAllUsers()
                        selectedUserId.value = ""
                        toggleDeleteModal()
                }
                submitSpinner.value = false
        }, (err) => {
                submitSpinner.value = false
        })
}

const toggleDeleteModal = () => {
        deleteModal.value = !deleteModal.value
}
const toggleCreateModal = () => {
        createModal.value = !createModal.value
        error.value=false
}

const toggleUpdateModal = (user) => {
        updateModal.value = !updateModal.value
        if (!updateModal.value) {
                clearUserState()
                selectedUserId.value = ""

        } else {
                name.value = user.full_name
                email.value = user.email
                status.value = user.status
                selectedUserId.value = user.id
        }
}


const handleUpdate = () => {
        let data = userData()
        data.user_id = selectedUserId
        error.value = false
        for (var key in data) {
                if (data.hasOwnProperty(key)) {
                        if (!emptyCheck(data[key])) {
                                error.value = true
                                errorMessages.value.push(`${key} required`)
                        }
                }
        }
        if (error.value) return;

        submitSpinner.value = true
        axiosPost(URL.updateUser,data,(res)=>{
                if(res.data.success){
                        getAllUsers()
                        clearUserState()
                        toggleUpdateModal()
                }
                submitSpinner.value=false
        },(err)=>{
                submitSpinner.value=false
        })

}

const handleCreate = () => {
        let data = userData()
        error.value = false;
        data.password = password.value

        for (var key in data) {
                if (data.hasOwnProperty(key)) {
                        if (!emptyCheck(data[key])) {
                                error.value = true
                                errorMessages.value.push(`${key} required`)
                        }
                }
        }

        if (error.value) return;
        submitSpinner.value = true
        axiosPost(URL.signup, data, (res) => {
                if (res.data.success) {
                        getAllUsers()
                        clearUserState()
                        toggleCreateModal()
                }
                submitSpinner.value = false
        },
        (err) => {
                submitSpinner.value = false
        })
}

const clearUserState = () => {
        email.value = ""
        name.value = ""
        password.value = ""
        status.value=1
        selectedUserId.value=""
}

const userData = () => {
        return {
                full_name: name.value,
                email: email.value,
                status: status.value
        }
}
</script>


<template>
        <FullWidthSpinner v-if="submitSpinner" />
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
                                        <tr v-if="dataLoader">
                                                <td colspan="5" class="text-center">Loading...</td>
                                        </tr>
                                        <tr v-else-if="userList.length > 0" v-for="(user, index) in userList">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ user.full_name }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>{{ user.status ? 'Enabled' : 'Disabled' }}</td>
                                                <td class="d-flex">
                                                        <button class="btn btn-primary"
                                                                @click="toggleUpdateModal(user)">Edit</button>
                                                        <button class="btn btn-danger"
                                                                @click="toggleDeleteModal">Delete</button>
                                                </td>

                                        </tr>
                                        <tr v-else>
                                                <td colspan="5" class="text-center">No Data...</td>
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
                                                <input :class="(error && name=='')?'is-invalid':''" v-model.trim="name" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                                <input :class="(error && email=='')?'is-invalid':''" v-model.trim="email" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Status</label>
                                                <select class="form-control" :class="(error && status=='')?'is-invalid':''" v-model="status">
                                                        <option :value="true">Enable</option>
                                                        <option :value="false">Disable</option>

                                                </select>
                                        </div>
                                        <!-- <div class="mb-3">
                                                <label for="exampleInputPassword1d" class="form-label">Password</label>
                                                <input :class="(error && password=='')?'is-invalid':''" v-model.trim="password" type="text" class="form-control"
                                                        id="exampleInputPassword1d">
                                        </div> -->


                                </form>
                        </div>
                </div>
        </UpdateModal>


        <!-- create modal -->
        <CreateModal v-if="createModal" :spinner="submitSpinner" :toggle="createModal" title="Create User"
                @toggle-create-modal="toggleCreateModal" @handle-create="handleCreate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                                <input :class="(error && name=='')?'is-invalid':''" v-model.trim="name" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                                <input :class="(error && email=='')?'is-invalid':''" v-model.trim="email" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Status</label>
                                                <select class="form-control" :class="(error && status=='')?'is-invalid':''" v-model="status">
                                                        <option value="" selected disabled>Choose...</option>
                                                        <option :value="true">Enable</option>
                                                        <option :value="false">Disable</option>

                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1d" class="form-label">Password</label>
                                                <input :class="(error && password=='')?'is-invalid':''" v-model.trim="password" type="text" class="form-control"
                                                        id="exampleInputPassword1d">
                                        </div>

                                </form>
                        </div>
                </div>
        </CreateModal>
</template>