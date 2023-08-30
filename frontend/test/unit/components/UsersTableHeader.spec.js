import { mount } from '@vue/test-utils';
import UsersTableHeader from '@/components/UsersTableHeader.vue';

describe('UsersTableHeader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UsersTableHeader);
  });

  it('renders all the table headers', () => {
    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(5);
    expect(headers[0].text()).toBe('Delete');
    expect(headers[1].text()).toContain('Name');
    expect(headers[2].text()).toBe('Add');
    expect(headers[3].text()).toBe('Subtract');
    expect(headers[4].text()).toContain('Points');
  });

  it('displays the correct sorting arrow for Name', async () => {
    await wrapper.setProps({ sortType: 'name', sortDirection: 'asc' });
    expect(wrapper.find('th:nth-child(2) span').text()).toBe('↑');

    await wrapper.setProps({ sortType: 'name', sortDirection: 'desc' });
    expect(wrapper.find('th:nth-child(2) span').text()).toBe('↓');
  });

  it('displays the correct sorting arrow for Points', async () => {
    await wrapper.setProps({ sortType: 'points', sortDirection: 'asc' });
    expect(wrapper.find('th:nth-child(5) span').text()).toBe('↑');

    await wrapper.setProps({ sortType: 'points', sortDirection: 'desc' });
    expect(wrapper.find('th:nth-child(5) span').text()).toBe('↓');
  });

  it('emits the correct event when sorting by Name', async () => {
    await wrapper.find('th:nth-child(2)').trigger('click');
    expect(wrapper.emitted().sortByName).toBeTruthy();
  });

  it('emits the correct event when sorting by Points', async () => {
    await wrapper.find('th:nth-child(5)').trigger('click');
    expect(wrapper.emitted().sortByPoints).toBeTruthy();
  });
});
