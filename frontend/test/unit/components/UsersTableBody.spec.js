import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import UsersTableBody from '@/components/UsersTableBody.vue';  

describe('UsersTableBody.vue', () => {
  let wrapper;
  let store;
  let mockDeleteUser;
  let mockUpdateUser;

  beforeEach(() => {
    mockDeleteUser = jest.fn();
    mockUpdateUser = jest.fn();

    store = createStore({
      state: {
        users: [
          { id: 1, name: 'John', points: 10 },
          { id: 2, name: 'Doe', points: 20 }
        ]
      },
      actions: {
        deleteUser: mockDeleteUser,
        updateUser: mockUpdateUser
      }
    });

    wrapper = mount(UsersTableBody, {
      global: {
        plugins: [store]
      },
      props: {
        users: store.state.users
      }
    });
  });

  it('renders the user data correctly', () => {
    const rows = wrapper.findAll('tr');
    expect(rows.length).toBe(2);

    expect(rows[0].text()).toContain('John');
    expect(rows[0].text()).toContain('10 points');

    expect(rows[1].text()).toContain('Doe');
    expect(rows[1].text()).toContain('20 points');
  });

  it('calls deleteUser method on delete button click', async () => {
    const deleteButtons = wrapper.findAll('.btn-light').filter(w => w.text() === 'X');
    await deleteButtons[0].trigger('click');
    expect(mockDeleteUser).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it('calls adjustScore method on score adjustment button click', async () => {
    const plusButtons = wrapper.findAll('.btn-light').filter(w => w.text() === '+');
    const minusButtons = wrapper.findAll('.btn-light').filter(w => w.text() === '-');

    await plusButtons[0].trigger('click');
    expect(mockUpdateUser).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ id: 1, points: 11 }));

    await minusButtons[0].trigger('click');
    expect(mockUpdateUser).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ id: 1, points: 9 }));
  });

  
});
