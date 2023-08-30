<template>
        <div class="modal fade" id="AddUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New User Info</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="newUserName" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="newUserName" v-model="newUser.name">
              </div>
              <div class="mb-3">
                <label for="newUserAge" class="col-form-label">Age:</label>
                <input type="text" class="form-control" id="newUserAge" v-model.number="newUser.age">
              </div>
              <div class="mb-3">
                <label for="newUserAddress" class="col-form-label">Address:</label>
                <input type="text" class="form-control" id="newUserAddress" v-model="newUser.address">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addUser()" data-bs-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from "vue";
export default {
  name: 'AddUserModal',
  props: ['users'],
  setup() {
    const store = useStore();
    const newUser = ref({
      name: "",
      age: null,
      points: 0,
      id: null,
      address: ""
    });

    const addUser = async () => {
      try {
        await store.dispatch('addUser', newUser.value);
        newUser.value = {
          name: "",
          age: null,
          points: 0,
          id: null,
          address: ""
        };
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    return { newUser, addUser };
  }
}
</script>