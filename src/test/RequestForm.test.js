import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RequestForm from '@/components/RequestForm.vue';
import { useRequestStore } from '@/stores/requestStore';
import { useRouter } from 'vue-router';

vi.mock('/src/stores/requestStore.js', () => ({
  useRequestStore: vi.fn()
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('RequestForm', () => {
  let wrapper;
  let mockStore;
  let mockRouter;

  beforeEach(() => {
    mockStore = {
      addRequest: vi.fn(),
    };
    mockRouter = {
      push: vi.fn()
    };

    useRequestStore.mockReturnValue(mockStore);
    useRouter.mockReturnValue(mockRouter);

    wrapper = mount(RequestForm, {
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot></slot></a>'
          },
          'router-view': true
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);

    const h5 = wrapper.find('h5');
    expect(h5.exists()).toBe(true);
    expect(h5.text()).toBe('Request Form');

    const form = wrapper.find('form');
    expect(form.exists()).toBe(true);
  });

  it('binds input fields correctly with v-model', async () => {
    const requestNameInput = wrapper.find('input#name');
    const subjectInput = wrapper.find('input#subject');
    const descriptionTextarea = wrapper.find('textarea#description');
    const dateInput = wrapper.find('input#date');

    await requestNameInput.setValue('Test Requester');
    await subjectInput.setValue('Test Topic');
    await descriptionTextarea.setValue('Test Description');
    await dateInput.setValue('2023-01-01');

    expect(requestNameInput.element.value).toBe('Test Requester');
    expect(subjectInput.element.value).toBe('Test Topic');
    expect(descriptionTextarea.element.value).toBe('Test Description');
    expect(dateInput.element.value).toBe('2023-01-01');
  });

  // it('submits the form correctly', async () => {
  //   const requestNameInput = wrapper.find('input#name');
  //   const subjectInput = wrapper.find('input#subject');
  //   const descriptionTextarea = wrapper.find('textarea#description');
  //   const dateInput = wrapper.find('input#date');
  
  //   await requestNameInput.setValue('Test Requester');
  //   await subjectInput.setValue('Test Subject');
  //   await descriptionTextarea.setValue('Test Description');
  //   await dateInput.setValue('2023-01-01T00:00');
  

  
  //   await wrapper.find('form').trigger('submit.prevent');
  
  
  //   expect(mockStore.addRequest).toHaveBeenCalled();
  //   expect(mockStore.addRequest).toHaveBeenCalledWith({
  //     requestName: 'Test Requester',
  //     subject: 'Test Subject',
  //     description: 'Test Description',
  //     date: '2023-01-01T00:00',
  //   });
  // });

  // it('resets the form correctly when reset button is clicked', async () => {
  //   const requestNameInput = wrapper.find('input#name');
  //   const subjectInput = wrapper.find('input#subject');
  //   const descriptionTextarea = wrapper.find('textarea#description');
  //   const dateInput = wrapper.find('input#date');

  //   await requestNameInput.setValue('Test Requester');
  //   await subjectInput.setValue('Test Subject');
  //   await descriptionTextarea.setValue('Test Description');
  //   await dateInput.setValue('2023-01-01T00:00');

  //   await wrapper.find('button[type="reset"]').trigger('click'); // Trigger resetForm
  //   await wrapper.vm.$nextTick();

  //   expect(requestNameInput.element.value).toBe('');
  //   expect(subjectInput.element.value).toBe('');
  //   expect(descriptionTextarea.element.value).toBe('');
  //   expect(dateInput.element.value).toBe('');
  // });
});
