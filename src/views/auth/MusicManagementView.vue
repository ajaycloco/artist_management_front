<script setup>
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateModal from '@/components/UpdateModal.vue'
import CreateModal from '@/components/CreateModal.vue'


import { ref } from 'vue'

const deleteModal = ref(false)
const updateModal = ref(false)
const createModal = ref(false)
const albumName = ref("")
const title = ref("")
const genre = ref("")
const artist = ref("")


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
                title.value="";
                albumName.value=""
                genre.value=""
                artist.value=""
        }
}


const handleUpdate = () => {
       let data ={
                title:title.value,
                album_name:albumName.value,
                genre:genre.value,
                artist_id:artist.value
        }
}

const handleCreate = () => {
        let data ={
                title:title.value,
                album_name:albumName.value,
                genre:genre.value,
                artist_id:artist.value
        }
}





</script>


<template>
        <div class="row">
                <div class="col-lg-12 d-flex justify-content-between">
                        <h1>Music List</h1>
                        <button @click="toggleCreateModal" class="btn btn-success">Add New</button>
                </div>
        </div>
        <div class="row mt-3">
                <div class="col-lg-12 table-responsive">
                        <table class="table table-responsive">
                                <thead>
                                        <tr>
                                                <th>S.N</th>
                                                <th>Title</th>
                                                <th>Album</th>
                                                <th>Genre</th>
                                                <th>Artist</th>
                                                <th>Action</th>

                                        </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                                <td>1</td>
                                                <td>john</td>
                                                <td>Doe</td>
                                                <td>Country</td>
                                                <td>shghs</td>
                                                <td class="d-flex">
                                                        <button class="btn btn-primary" @click="toggleUpdateModal">Edit</button>
                                                        <button class="btn btn-danger"
                                                                @click="toggleDeleteModal">Delete</button>
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
        <UpdateModal v-if="updateModal" :toggle="updateModal" title="Update Music" @toggle-update-modal="toggleUpdateModal"
                @handle-update="handleUpdate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Title</label>
                                                <input v-model.trim="title" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Album Name</label>
                                                <input v-model.trim="albumName" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Genre</label>
                                                <select class="form-control" v-model="genre">
                                                        <option value="Country">Country</option>
                                                        <option value="Classic">Classic</option>

                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Artist</label>
                                                <select class="form-control" v-model="artist">
                                                        <option value="Artist 1">Artist 1</option>
                                                        <option value="Artist 2">Artist 2</option>
                                                </select>
                                        </div>

                                </form>
                        </div>
                </div>
        </UpdateModal>


        <!-- create modal -->
        <CreateModal v-if="createModal" :toggle="createModal" title="Create Music" @toggle-create-modal="toggleCreateModal"
                @handle-create="handleCreate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Title</label>
                                                <input v-model.trim="title" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Album Name</label>
                                                <input v-model.trim="albumName" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Genre</label>
                                                <select class="form-control" v-model="genre">
                                                        <option value="Country">Country</option>
                                                        <option value="Classic">Classic</option>

                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Artist</label>
                                                <select class="form-control" v-model="artist">
                                                        <option value="Artist 1">Artist 1</option>
                                                        <option value="Artist 2">Artist 2</option>
                                                </select>
                                        </div>

                                </form>
                        </div>
                </div>
        </CreateModal>
</template>