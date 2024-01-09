<script setup>
import {ref, defineProps,defineEmits} from 'vue'
  const props= defineProps(['toggle'])
  debugger;

  const emit = defineEmits()
  
 

</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="props.toggle"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Delete
        </v-card-title>

        <v-card-text>
          Are You Sure ?

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="emit('toggle-delete-modal')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="danger"
            text
            @click="emit('handle-delete')"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>