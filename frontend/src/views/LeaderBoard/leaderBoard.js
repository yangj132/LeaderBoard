import { ref, onMounted , computed} from "vue";
import { useStore } from 'vuex';

export default function leaderBoard () {

    const store = useStore();
    const selectedUser = ref({});
    const searchTerm = ref("");
    const sortType = ref(null);
    const sortDirection = ref(null);
    onMounted(async () => {
      try {
        await store.dispatch('fetchUsers');
      } catch (error) {
        console.error("There was an error fetching the users:", error);
      }
    });
    const users = computed(() => store.state.users);
    const filteredAndSortedUsers = computed(() => {
      let filteredUsers = users.value;

      
      if (searchTerm.value) {
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }
      
      if (sortType.value) {
        filteredUsers = filteredUsers.sort((a, b) => {
          if (sortType.value === "name") {
            return sortDirection.value === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortType.value === "points") {
            return sortDirection.value === "asc" ? a.points - b.points : b.points - a.points;
          }
        });
      }
      return filteredUsers;
    });

    const sortByName = () => {
      if (sortType.value !== "name") {
        sortDirection.value = "asc";
      } else {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      }
      sortType.value = "name";
    };

    const sortByPoints = () => {
      if (sortType.value !== "points") {
        sortDirection.value = "asc";
      } else {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      }
      sortType.value = "points";
    };

    const showUserDetails = (user) => {
      selectedUser.value = user;
    };
    return { 
      users, 
      selectedUser, 
      showUserDetails, 
      sortByName,
      sortByPoints,
      filteredAndSortedUsers,
      searchTerm,
      sortType,
      sortDirection
      };
  }
