<template>
  <div class="modal fade" id="userdetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">User Detail</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> {{ selectedUser.name }}</p>
            <p><strong>Age:</strong> {{ selectedUser.age }}</p>
            <p><strong>Points:</strong> {{ selectedUser.points }}</p>
            <p><strong>Address:</strong> {{ selectedUser.address }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selectedUser: {
      type: Object,
      required: true
    }
  },
  
}
</script>

<style scoped>

</style>
