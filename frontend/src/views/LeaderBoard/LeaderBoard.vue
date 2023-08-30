<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card w-75">
        <div class="card-body">
          <h1 class="card-title mb-4">Leaderboard</h1>
          <div class="mb-3">
              <UsersSearchBar v-model="searchTerm" />
          </div>
              <table class="table">
                <UsersTableHeader :sortType="sortType" :sortDirection="sortDirection" @sortByName="sortByName" @sortByPoints="sortByPoints" />
                <UsersTableBody :users="filteredAndSortedUsers" @showUserDetails="showUserDetails"/>
              </table>
      <UserDetailModal :selectedUser="selectedUser" />
      <AddUserButton />
      <AddUserModal />
        </div>
      </div>
    </div>
  </template>

<script>
import leaderBoard from './leaderBoard';

import UserDetailModal from '@/components/UserDetailModal.vue';
import AddUserModal from '@/components/AddUserModal.vue';
import UsersSearchBar from "@/components/UsersSearchBar.vue";
import UsersTableHeader from '@/components/UsersTableHeader.vue';
import UsersTableBody from '@/components/UsersTableBody.vue';
import AddUserButton from '@/components/AddUserButton.vue';

export default {
  components: {
    UserDetailModal,
    AddUserModal,
    UsersSearchBar,
    UsersTableHeader,
    UsersTableBody,
    AddUserButton
  },
  name: "LeaderBoard",
  setup() {
    return leaderBoard();
  }
}
</script>
