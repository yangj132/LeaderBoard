<template>
    <input type="text" placeholder="Search by name..." v-model="internalSearchTerm" class="my-4 p-2 border rounded w-full" />
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String
    },
    computed: {
      internalSearchTerm: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        }
      }
    }
  }
  </script>
  