import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import RequestForm from "@/components/RequestForm.vue";
import { useRequestStore } from "@/stores/requestStore";

vi.mock("@/stores/requestStore", () => ({
  useRequestStore: vi.fn(),
}));

describe("RequestForm", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      addRequest: vi.fn(),
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(RequestForm, {
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h5").text()).toBe("Request Form");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("#name").exists()).toBe(true);
    expect(wrapper.find("#subject").exists()).toBe(true);
    expect(wrapper.find("#description").exists()).toBe(true);
    expect(wrapper.find("#date").exists()).toBe(true);
  });

  it("binds input fields correctly with v-model", async () => {
    const nameInput = wrapper.find("#name");
    const subjectInput = wrapper.find("#subject");
    const descriptionTextarea = wrapper.find("#description");
    const dateInput = wrapper.find("#date");

    await nameInput.setValue("Test Name");
    await subjectInput.setValue("Test Subject");
    await descriptionTextarea.setValue("Test Description");
    await dateInput.setValue("2023-07-27");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.newRequest.requestName).toBe("Test Name");
    expect(wrapper.vm.newRequest.subject).toBe("Test Subject");
    expect(wrapper.vm.newRequest.description).toBe("Test Description");
    expect(wrapper.vm.newRequest.date).toBe("2023-07-27");
  });

  it("submits the form correctly", async () => {
    const nameInput = wrapper.find("#name");
    const subjectInput = wrapper.find("#subject");
    const descriptionTextarea = wrapper.find("#description");
    const dateInput = wrapper.find("#date");

    await nameInput.setValue("Test Name");
    await subjectInput.setValue("Test Subject");
    await descriptionTextarea.setValue("Test Description");
    await dateInput.setValue("2023-07-27");

    await wrapper.vm.$nextTick();

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(mockStore.addRequest).toHaveBeenCalledWith({
      requestName: "Test Name",
      subject: "Test Subject",
      description: "Test Description",
      date: "2023-07-27",
    });
  });

  it("handles long input values", async () => {
    const longText = "a".repeat(1000);

    await wrapper.find("#name").setValue(longText);
    await wrapper.find("#subject").setValue(longText);
    await wrapper.find("#description").setValue(longText);
    await wrapper.find("#date").setValue("2023-07-27");

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockStore.addRequest).toHaveBeenCalledWith({
      requestName: longText,
      subject: longText,
      description: longText,
      date: "2023-07-27",
    });
  });

  it("handles special characters and HTML injection in input fields", async () => {
    const specialChars = '<script>alert("xss")</script>';

    await wrapper.find("#name").setValue(specialChars);
    await wrapper.find("#subject").setValue(specialChars);
    await wrapper.find("#description").setValue(specialChars);
    await wrapper.find("#date").setValue("2023-07-27");

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockStore.addRequest).toHaveBeenCalledWith({
      requestName: specialChars,
      subject: specialChars,
      description: specialChars,
      date: "2023-07-27",
    });
  });

  it("resets the form correctly after submission failure", async () => {
    mockStore.addRequest.mockRejectedValue(new Error("Request failed"));

    const nameInput = wrapper.find("#name");
    const subjectInput = wrapper.find("#subject");
    const descriptionTextarea = wrapper.find("#description");
    const dateInput = wrapper.find("#date");

    await nameInput.setValue("Test Name");
    await subjectInput.setValue("Test Subject");
    await descriptionTextarea.setValue("Test Description");
    await dateInput.setValue("2023-07-27");

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    await wrapper.find('button[type="reset"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.newRequest.requestName).toBe("");
    expect(wrapper.vm.newRequest.subject).toBe("");
    expect(wrapper.vm.newRequest.description).toBe("");
    expect(wrapper.vm.newRequest.date).toBe("");
  });

  it("resets the form correctly when reset button is clicked", async () => {
    const nameInput = wrapper.find("#name");
    const subjectInput = wrapper.find("#subject");
    const descriptionTextarea = wrapper.find("#description");
    const dateInput = wrapper.find("#date");

    await nameInput.setValue("Test Name");
    await subjectInput.setValue("Test Subject");
    await descriptionTextarea.setValue("Test Description");
    await dateInput.setValue("2023-07-27");

    await wrapper.find('button[type="reset"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.newRequest.requestName).toBe("");
    expect(wrapper.vm.newRequest.subject).toBe("");
    expect(wrapper.vm.newRequest.description).toBe("");
    expect(wrapper.vm.newRequest.date).toBe("");
  });

  it("handles multiple reset button clicks", async () => {
    await wrapper.find("#name").setValue("Test Name");
    await wrapper.find("#subject").setValue("Test Subject");
    await wrapper.find("#description").setValue("Test Description");
    await wrapper.find("#date").setValue("2023-07-27");

    await wrapper.find('button[type="reset"]').trigger("click");
    await wrapper.find('button[type="reset"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.newRequest.requestName).toBe("");
    expect(wrapper.vm.newRequest.subject).toBe("");
    expect(wrapper.vm.newRequest.description).toBe("");
    expect(wrapper.vm.newRequest.date).toBe("");
  });

  it("has a cancel button that links to the request list", () => {
    const cancelLink = wrapper.find("#cancel");
    expect(cancelLink.exists()).toBe(true);
    expect(cancelLink.attributes("to")).toBe("/request-list");
  });

  it("handles cases where useRequestStore returns null", () => {
    useRequestStore.mockReturnValueOnce(null);

    wrapper = mount(RequestForm, {
      global: {
        stubs: ["router-link"],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
