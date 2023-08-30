<template>
    <thead>
      <tr>
        <th scope="col">Delete</th>
        <!-- Sort by Name -->
        <th scope="col" @click="sortByName">
          Name
          <span v-if="sortType === 'name' && sortDirection === 'asc'">↑</span>
          <span v-if="sortType === 'name' && sortDirection === 'desc'">↓</span>
        </th>
        <th scope="col">Add</th>
        <th scope="col">Subtract</th>
        <!-- Sort by Points -->
        <th scope="col" @click="sortByPoints">
          Points
          <span v-if="sortType === 'points' && sortDirection === 'asc'">↑</span>
          <span v-if="sortType === 'points' && sortDirection === 'desc'">↓</span>
        </th>
      </tr>
    </thead>
  </template>
  
  <script>
  export default {
    props: {
      sortType: String,
      sortDirection: String
    },
    methods: {
      sortByName() {
        this.$emit('sortByName');
      },
      sortByPoints() {
        this.$emit('sortByPoints');
      }
    }
  }
  </script>
  