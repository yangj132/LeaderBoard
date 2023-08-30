import { mount } from '@vue/test-utils';
import LeaderBoard from '@/views/LeaderBoard/LeaderBoard.vue';
import { createStore } from 'vuex';


const actions = {
  fetchUsers: jest.fn()
};
const state = {
  users: []
};

const store = createStore({
  actions,
  state
});

describe('LeaderBoard.vue', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = mount(LeaderBoard, {
      global: {
        plugins: [store]
      }
    });
  });

  it('renders all child components', () => {
    expect(wrapper.findComponent({ name: 'UserDetailModal' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'AddUserModal' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UsersSearchBar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UsersTableHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UsersTableBody' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'AddUserButton' }).exists()).toBe(true);
  });

  it('fetches users on mount', () => {
    expect(actions.fetchUsers).toHaveBeenCalled();
  });

});

