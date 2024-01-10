<script setup>
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateModal from '@/components/UpdateModal.vue'
import CreateModal from '@/components/CreateModal.vue'
import { ref, onMounted } from 'vue'
import { axiosGet, axiosPost } from '@/utils/AxiosApi';
import { URL } from '@/utils/Constant';
import FullWidthSpinner from '@/components/FullWidthSpinner.vue';
import { emptyCheck } from '@/utils/validation';
const deleteModal = ref(false)
const updateModal = ref(false)
const createModal = ref(false)
const name = ref("")
const dob = ref("")
const address = ref("")
const gender = ref("")
const firstReleaseyear = ref("")
const noOfAlbumsReleased = ref(0)
const artistList = ref([])
const selectedArtistId = ref("")
const genderList = ref(['M', 'F', 'O'])
const dataLoader = ref(true)
const submitSpinner = ref(false)
const error = ref(false)
const errorMessages = ref([])

onMounted(() => {
        getAllArtist()
})

const getAllArtist = () => {
        dataLoader.value = true
        axiosGet(URL.getAllArtist, (res) => {
                if (res.data.success) {
                        artistList.value = res.data.data
                        dataLoader.value = false
                }
        }, (err) => {

        })

}


const handleDelete = () => {
        submitSpinner.value = true
        axiosGet(`${URL.deleteArtist}/${selectedArtistId.value}/delete`, (res) => {
                if (res.data.success) {
                        getAllArtist()
                        selectedArtistId.value = ""
                        toggleDeleteModal()
                }
                submitSpinner.value = false
        }, (err) => {
                submitSpinner.value = false
        })
}

const toggleDeleteModal = (artist) => {
        deleteModal.value = !deleteModal.value
        if (deleteModal) selectedArtistId.value = artist.id;
}

const toggleCreateModal = () => {
        createModal.value = !createModal.value
        error.value=false
}

const toggleUpdateModal = (artist) => {
        error.value=false
        updateModal.value = !updateModal.value
        if (!updateModal.value) {
                clearArtistState()
        } else {
                name.value = artist.name
                dob.value = artist.dob
                gender.value = artist.gender
                address.value = artist.address
                firstReleaseyear.value = artist.first_release_year
                noOfAlbumsReleased.value = artist.no_of_albums_released
                selectedArtistId.value = artist.id

        }
}

const artistData = () => {
        return {
                name: name.value,
                dob: dob.value,
                gender: gender.value,
                address: address.value,
                first_release_year: firstReleaseyear.value,
                no_of_albums_released: noOfAlbumsReleased.value,
        }
}
const handleUpdate = () => {
        let data = artistData()
        data.artist_id = selectedArtistId.value


        // handle validations
        error.value=false
        errorMessages.value=[]
        for (var key in data) {
                if (data.hasOwnProperty(key) ) {
                       if(!emptyCheck(data[key])){
                                error.value=true
                                errorMessages.push(`${key} required`)
                       }
                }
        }
        if (error.value) return;
        submitSpinner.value = true
        axiosPost(URL.updateArtist, data, (res) => {
                if (res.data.success) {
                        getAllArtist()
                        clearArtistState()
                        selectedArtistId.value = ""
                        toggleUpdateModal()
                }
                submitSpinner.value = false
        }, (err) => {
                submitSpinner.value = false
        })


}

const handleCreate = () => {
        let data = artistData()
        error.value=false
        errorMessages.value=[]
        for (var key in data) {
                if (data.hasOwnProperty(key) ) {
                       if(!emptyCheck(data[key])){
                                error.value=true
                                errorMessages.value.push(`${key} required`)
                       }
                }
        }
       if (error.value) return;

        submitSpinner.value = true
        axiosPost(URL.createArtist, data, (res) => {
                if (res.data.success) {
                        clearArtistState()
                        getAllArtist()
                        toggleCreateModal()
                        submitSpinner.value = false
                }
        }, (err) => {
                submitSpinner.value = false
        })
}

const clearArtistState = () => {
        name.value = ""
        dob.value = ""
        gender.value = ""
        address.value = ""
        firstReleaseyear.value = ""
        noOfAlbumsReleased.value = ""
        selectedArtistId.value = ""
}
</script>


<template>
        <FullWidthSpinner v-if="submitSpinner" />
        <div class="row">
                <div class="col-lg-12 d-flex justify-content-between">
                        <h1>Artist List</h1>
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
                                                <th>DOB</th>
                                                <th>Address</th>
                                                <th>Gender</th>
                                                <th>First Release Year</th>
                                                <th>No. of Albums</th>
                                                <th>Action</th>

                                        </tr>
                                </thead>
                                <tbody>
                                        <tr v-if="dataLoader">
                                                <td colspan="8" class="text-center">
                                                        Loading...
                                                </td>
                                        </tr>
                                        <tr v-else-if="artistList.length > 0" v-for="(artist, index) in artistList">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ artist.name }}</td>
                                                <td>{{ artist.dob }}</td>
                                                <td>{{ artist.address }}</td>
                                                <td>{{ artist.gender }}</td>
                                                <td>{{ artist.first_release_year }}</td>
                                                <td>{{ artist.no_of_albums_released }}</td>
                                                <td class="d-flex">
                                                        <button class="btn btn-primary"
                                                                @click="toggleUpdateModal(artist)">Edit</button>
                                                        <button class="btn btn-danger"
                                                                @click="toggleDeleteModal(artist)">Delete</button>
                                                </td>

                                        </tr>
                                        <tr v-else>
                                                <td colspan="8" class="text-center">No Data...</td>
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
        <UpdateModal v-if="updateModal" :toggle="updateModal" title="Update Artist" @toggle-update-modal="toggleUpdateModal"
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
                                                <label for="exampleInputEmail1dsf" class="form-label">Date Of Birth</label>
                                                <input :class="(error && dob=='')?'is-invalid':''" v-model.trim="dob" type="date" class="form-control"
                                                        id="exampleInputEmail1dsf" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Address</label>
                                                <input :class="(error && address=='')?'is-invalid':''" v-model.trim="address" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Gender</label>
                                                <select :class="(error && gender=='')?'is-invalid':''" class="form-control" v-model="gender">
                                                        <option v-for="gen in genderList" :value="gen">{{ gen }}</option>


                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1ttrt" class="form-label">First Release
                                                        Year</label>
                                                <input :class="(error && firstReleaseyear=='')?'is-invalid':''" v-model.trim="firstReleaseyear" type="date" class="form-control"
                                                        id="exampleInputPassword1ttrt">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1ttrtsf" class="form-label">No of Albums
                                                        Released</label>
                                                <input :class="(error && noOfAlbumsReleased=='')?'is-invalid':''" v-model.trim="noOfAlbumsReleased" type="number" class="form-control"
                                                        id="exampleInputPassword1ttrtsf">
                                        </div>


                                </form>
                        </div>
                </div>
        </UpdateModal>


        <!-- create modal -->
        <CreateModal v-if="createModal" :toggle="createModal" title="Create Artist" @toggle-create-modal="toggleCreateModal"
                @handle-create="handleCreate">
                <div class="row">
                        <div class="col-lg-12 ">
                                <form>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                                <input :class="(error && name=='')?'is-invalid':''" v-model.trim="name" type="text" class="form-control"
                                                        id="exampleInputEmail1" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputEmail1dsf" class="form-label">Date Of Birth</label>
                                                <input :class="(error && dob=='')?'is-invalid':''" v-model.trim="dob" type="date" class="form-control"
                                                        id="exampleInputEmail1dsf" aria-describedby="emailHelp">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Address</label>
                                                <input :class="(error && address=='')?'is-invalid':''" v-model.trim="address" type="text" class="form-control"
                                                        id="exampleInputPassword1">
                                        </div>
                                        <div class="mb-3">
                                                <label class="form-label">Gender</label>
                                                <select :class="(error && gender=='')?'is-invalid':''" class="form-control" v-model="gender">
                                                        <option value="" selected disabled>Choose...</option>
                                                        <option v-for="gen in genderList" :value="gen">{{ gen }}</option>


                                                </select>
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1ttrt" class="form-label">First Release
                                                        Year</label>
                                                <input :class="(error && firstReleaseyear=='')?'is-invalid':''" v-model.trim="firstReleaseyear" type="date" class="form-control"
                                                        id="exampleInputPassword1ttrt">
                                        </div>
                                        <div class="mb-3">
                                                <label for="exampleInputPassword1ttrtsf" class="form-label">No of Albums
                                                        Released</label>
                                                <input :class="(error && noOfAlbumsReleased=='')?'is-invalid':''" v-model.trim="noOfAlbumsReleased" type="number" class="form-control"
                                                        id="exampleInputPassword1ttrtsf">
                                        </div>


                                </form>
                        </div>
                </div>
        </CreateModal>
</template>