import { mount } from '@vue/test-utils';
import AddUserButton from '@/components/AddUserButton.vue';

describe('AddUserButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddUserButton);
  });

  it('renders the button', () => {
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('has the correct text content', () => {
    const button = wrapper.find('button');
    expect(button.text()).toBe('+ Add User');
  });

  it('has the correct classes', () => {
    const button = wrapper.find('button');
    expect(button.classes()).toContain('btn');
    expect(button.classes()).toContain('btn-primary');
  });

  it('has the correct id', () => {
    const button = wrapper.find('button');
    expect(button.attributes('id')).toBe('add-user-button');
  });
});
