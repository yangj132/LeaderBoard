import { createStore } from 'vuex';
import API from "@/api";

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await API.get("/users");
      commit('SET_USERS', response.data);
    },
    async addUser({ commit, state }, user) {
      const response = await API.post('/users', user)
      commit('SET_USERS', [...state.users, response.data]);
    },
    async updateUser({ commit, state }, user) {
      const response = await API.put(`/users/${user.id}`, user);
      const updatedUsers = state.users.map(u => (u.id === user.id ? response.data : u));
      
      commit('SET_USERS', updatedUsers);
      state.users.sort((a, b) => b.points - a.points);
    },
    async deleteUser({ commit, state }, userId) {
      await API.delete(`/users/${userId}`);
      const updatedUsers = state.users.filter(u => u.id !== userId);
      commit('SET_USERS', updatedUsers);
    },
  },
});
