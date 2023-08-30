import { mount } from '@vue/test-utils';
import UsersSearchBar from '@/components/UsersSearchBar.vue'

describe('UsersSearchBar.vue', () => {
  it('renders the given modelValue as the input value', () => {
    const wrapper = mount(UsersSearchBar, {
      props: { modelValue: 'John' }
    });
    expect(wrapper.find('input').element.value).toBe('John');
  });

  it('emits the update:modelValue event when input value changes', async () => {
    const wrapper = mount(UsersSearchBar);
    await wrapper.find('input').setValue('Doe');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Doe']);
  });

  it('updates the input value when modelValue changes', async () => {
    const wrapper = mount(UsersSearchBar, {
      props: { modelValue: 'John' }
    });
    await wrapper.setProps({ modelValue: 'Doe' });
    expect(wrapper.find('input').element.value).toBe('Doe');
  });
});
