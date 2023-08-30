<template>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td scope="col">
          <button @click="deleteUser(index)" type="button" class="btn btn-light">X</button>
        </td>
        <td scope="col">
          <button @click="showUserDetails(user)" type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#userdetailModal">{{ user.name }}</button>
        </td>
        <td scope="col">
          <button type="button" class="btn btn-light" @click="adjustScore(user, 1)">+</button>
        </td>
        <td scope="col">
          <button type="button" class="btn btn-light" @click="adjustScore(user, -1)">-</button>
        </td>
        <td scope="col">{{ user.points }} points</td>
      </tr>
    </tbody>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed} from "vue";
  export default {
    props: ['users'],
    setup(props, { emit }){
      const store = useStore();
      const users = computed(() => store.state.users);
      const adjustScore = async (userObj, adjustment) => {
      try {
        
        const index = users.value.findIndex(user => user.id === userObj.id);
        if (index === -1) throw new Error("User not found");
        const user = { ...users.value[index] };
        user.points += adjustment
        await store.dispatch('updateUser', user);
        } catch (error) {
          console.error("Error adjusting score:", error);
        }
      };

      const deleteUser = async (index) => {
        const userId = users.value[index].id;
        await store.dispatch('deleteUser', userId);
        users.value.splice(index, 1);
      };
      const showUserDetails = (user) => {
        emit('showUserDetails', user);
    };
    
    return { adjustScore, deleteUser, showUserDetails};
    }
  }
  </script>
  