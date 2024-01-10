<script setup>
import { ref, onMounted } from 'vue'
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateModal from '@/components/UpdateModal.vue'
import CreateModal from '@/components/CreateModal.vue'
import { axiosGet, axiosPost } from '@/utils/AxiosApi'


import { URL } from '@/utils/Constant';

const deleteModal = ref(false)
const updateModal = ref(false)
const createModal = ref(false)
const albumName = ref("")
const title = ref("")
const genre = ref("")
const artist = ref("")
const musicList = ref([])
const genreList = ref(['rnb','country','classic','rock','jazz'])
const artistList = ref([])
const selectedMusicId = ref({})

onMounted(() => {
    getAllmusic()  
})

const getArtists=()=>{
        axiosGet(URL.getAllArtist,(res)=>{
                if(res.data.success){
                        artistList.value=res.data.data
                }
        },(err)=>{

        })
}


const getAllmusic=()=>{
    axiosGet(URL.getAllMusic,(res)=>{
        if(res.data.success){
            musicList.value=res.data.data
        }
    },(err)=>{

    })
}

const handleDelete = () => {
        debugger;
}

const toggleDeleteModal = () => {
        deleteModal.value = !deleteModal.value
}
const toggleCreateModal = () => {
        createModal.value = !createModal.value
        if(createModal.value){
                getArtists()
        }
}

const toggleUpdateModal = (music) => {
        updateModal.value = !updateModal.value
        if(!updateModal.value){
                title.value="";
                albumName.value=""
                genre.value=""
                artist.value=""
        }else{
                getArtists()
                title.value=music.title;
                albumName.value=music.album_name
                genre.value=music.genre
                artist.value=music.artist_id
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
        
        axiosPost(URL.createMusic,data,(res)=>{
                if(res.data.success){
                        debugger
                       title.value=""
                       albumName.value=""
                       genre.value=""
                       artist.value="" 
                       getAllmusic()
                       toggleCreateModal()
                }
        },(err)=>{

        })
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
                                        <tr >
                                                <th>S.N</th>
                                                <th>Title</th>
                                                <th>Album</th>
                                                <th>Genre</th>
                                                <th>Artist</th>
                                                <th>Action</th>

                                        </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="(music, index) in musicList">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ music.title }}</td>
                                                <td>{{ music.album_name }}</td>
                                                <td>{{ music.genre }}</td>
                                                <td>{{music.artist_id}}</td>
                                                <td class="d-flex">
                                                        <button class="btn btn-primary" @click="toggleUpdateModal(music)">Edit</button>
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
                                                        <option v-for="gen in genreList" :value="gen">{{ gen }}</option>
                                                       

                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Artist</label>
                                                <select class="form-control" v-model="artist">
                                                        <option v-for="art in artistList" :value="art.id">{{ art.name }}</option>
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
                                                        <option value="" selected disabled>Choose...</option>
                                                        <option v-for="gen in genreList" :value="gen">{{ gen }}</option>
                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Artist</label>
                                                <select class="form-control" v-model="artist">
                                                        <option value="" selected disabled>Choose...</option>
                                                        <option v-for="art in artistList" :value="art.id">{{ art.name }}</option>
                                                </select>
                                        </div>

                                </form>
                        </div>
                </div>
        </CreateModal>
</template>