import { createStore } from 'vuex';


describe('Mutations', () => {
  it('SET_USERS', () => {
    const store = createStore({
      state: {
        users: [],
      },
      mutations: {
        SET_USERS(state, users) {
          state.users = users;
        },
      },
    });

    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

    store.commit('SET_USERS', users);

    expect(store.state.users).toEqual(users);
  });
});






