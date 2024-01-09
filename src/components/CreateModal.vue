<script setup>
import { ref, defineProps, defineEmits } from 'vue';
    const props=defineProps(['toggle','title'])
    const emit = defineEmits()
</script>

<template>
    <div>
      <v-row
        justify="center"
      >
        <v-dialog
          v-model="props.toggle"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card tile>
            <v-toolbar
              flat
              dark
              color="primary"
            >
              <v-btn
                icon
                dark
               @click="emit('toggle-create-modal')"
              >
               X
              </v-btn>
              <v-toolbar-title>{{ props.title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                 @click="emit('handle-create')"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
              <v-menu
                bottom
                right
                offset-y
              >
                
              </v-menu>
            </v-toolbar>
            <v-card-text>
              
                <slot></slot>
              
            </v-card-text>
  
            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>
  
      
      </v-row>
    </div>
  </template>