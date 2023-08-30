import { mount } from '@vue/test-utils';
import UserDetailModal from '@/components/UserDetailModal.vue';

describe('UserDetailModal.vue', () => {
  it('renders the details of the selected user correctly', () => {
    const selectedUser = {
      name: 'John Doe',
      age: 30,
      points: 100,
      address: '123 Main St'
    };

    const wrapper = mount(UserDetailModal, {
      propsData: { selectedUser }
    });

    expect(wrapper.text()).toContain(`Name: ${selectedUser.name}`);
    expect(wrapper.text()).toContain(`Age: ${selectedUser.age}`);
    expect(wrapper.text()).toContain(`Points: ${selectedUser.points}`);
    expect(wrapper.text()).toContain(`Address: ${selectedUser.address}`);
  });


  it('handles missing selectedUser prop gracefully', () => {
    const wrapper = mount(UserDetailModal, {
        propsData: { selectedUser: {} } 
      });
    expect(wrapper.text()).toBe('User DetailName: Age: Points: Address: Close');
  });
});
