import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import EditRequestForm from "@/components/EditRequestForm.vue";
import { useRequestStore } from "@/stores/requestStore";

vi.mock("@/stores/requestStore", () => ({
  useRequestStore: vi.fn(),
}));

describe("EditRequestForm", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      getRequestById: vi.fn().mockReturnValue({
        id: 1,
        requestName: "Name 1",
        subject: "Subject 1",
        description: "Description 1",
        date: "2023-12-31",
      }),
      updateRequest: vi.fn(),
      addRequest: vi.fn(),
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(EditRequestForm, {
      props: {
        id: 1,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);

    const heading = wrapper.find("h5");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Edit Request");

    const nameInput = wrapper.find("#name");
    expect(nameInput.exists()).toBe(true);
    const subjectInput = wrapper.find("#subject");
    expect(subjectInput.exists()).toBe(true);
    const descriptionTextarea = wrapper.find("#description");
    expect(descriptionTextarea.exists()).toBe(true);
    const dateInput = wrapper.find("#date");
    expect(dateInput.exists()).toBe(true);

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toBe("Update");
    const cancelButton = wrapper.find('button[type="button"]');
    expect(cancelButton.exists()).toBe(true);
    expect(cancelButton.text()).toBe("Cancel");
  });

  it("sets the initial values correctly", () => {
    const requestNameInput = wrapper.find("#name");
    const subjectInput = wrapper.find("#subject");
    const descriptionInput = wrapper.find("#description");
    const dateInput = wrapper.find("#date");

    expect(requestNameInput.element.value).toBe("Name 1");
    expect(subjectInput.element.value).toBe("Subject 1");
    expect(descriptionInput.element.value).toBe("Description 1");
    expect(dateInput.element.value).toBe("2023-12-31");
  });

  it("emits the cancel event when cancel button is clicked", async () => {
    await wrapper.find("button.bg-zinc-600").trigger("click");
    expect(wrapper.emitted().cancel).toBeTruthy();
  });

  it("calls updateRequest when the form is submitted with an id", async () => {
    await wrapper.find("input#name").setValue("New Name");
    await wrapper.find("input#subject").setValue("New Subject");
    await wrapper.find("textarea#description").setValue("New Description");
    await wrapper.find("input#date").setValue("2023-12-31");

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockStore.updateRequest).toHaveBeenCalledWith(1, {
      id: 1,
      requestName: "New Name",
      subject: "New Subject",
      description: "New Description",
      date: "2023-12-31",
    });
  });

  it("calls addRequest when the form is submitted without an id", async () => {
    await wrapper.setProps({ id: null });
    await wrapper.vm.$nextTick();
    await wrapper.find("#name").setValue("New Name");
    await wrapper.find("#subject").setValue("New Subject");
    await wrapper.find("#description").setValue("New Description");
    await wrapper.find("#date").setValue("2023-12-31");

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockStore.addRequest).toHaveBeenCalledWith({
      requestName: "New Name",
      subject: "New Subject",
      description: "New Description",
      date: "2023-12-31",
    });
  });

  it("resets form after successful submission", async () => {
    await wrapper.find("#name").setValue("To Reset");
    await wrapper.find("#subject").setValue("To Reset");
    await wrapper.find("#description").setValue("To Reset");
    await wrapper.find("#date").setValue("2023-12-31");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.newRequest).toEqual({
      requestName: "",
      subject: "",
      description: "",
      date: "",
    });
  });
});
