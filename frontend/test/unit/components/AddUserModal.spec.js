import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AddUserModal from '@/components/AddUserModal.vue';

describe('AddUserModal.vue', () => {
  let wrapper;
  let store;
  let mockAddUser;

  beforeEach(() => {
    mockAddUser = jest.fn();

    store = createStore({
      actions: {
        addUser: mockAddUser
      }
    });

    wrapper = mount(AddUserModal, {
      global: {
        plugins: [store]
      }
    });
  });

  it('renders the modal', () => {
    expect(wrapper.find('.modal').exists()).toBe(true);
  });

  it('binds input fields correctly', async () => {
    const nameInput = wrapper.find('#newUserName');
    const ageInput = wrapper.find('#newUserAge');
    const addressInput = wrapper.find('#newUserAddress');

    await nameInput.setValue('John');
    await ageInput.setValue('30');
    await addressInput.setValue('123 Main St');

    expect(wrapper.vm.newUser.name).toBe('John');
    expect(wrapper.vm.newUser.age).toBe(30);
    expect(wrapper.vm.newUser.address).toBe('123 Main St');
  });

  it('calls addUser method on submit button click', async () => {
    await wrapper.find('.btn-primary').trigger('click');
    expect(mockAddUser).toHaveBeenCalled();
  });

  it('resets newUser after successful addUser call', async () => {
    await wrapper.find('.btn-primary').trigger('click');
    expect(wrapper.vm.newUser.name).toBe('');
    expect(wrapper.vm.newUser.age).toBe(null);
    expect(wrapper.vm.newUser.address).toBe('');
  });
});
