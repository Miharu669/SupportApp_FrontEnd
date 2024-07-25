import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import EditRequestList from "@/components/EditRequestList.vue"; // Adjust the import path as needed
import { useRequestStore } from "../stores/requestStore"; // Adjust the import path as needed

// Mock the requestStore
vi.mock("../stores/requestStore", () => ({
  useRequestStore: vi.fn() 
}));

describe("EditRequestList", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      requests: [
        {
          id: 1,
          requestName: "Test Request",
          subject: "Test Subject",
          description: "Test Description",
          requestDate: "2023-07-25",
        },
      ],

      fetchAllRequests: vi.fn(),
      deleteRequest: vi.fn(),
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(EditRequestList);
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct number of requests", () => {
    const requestCards = wrapper.findAll(".shadow-2xl");
    expect(requestCards).toHaveLength(1);
  });

  it("displays the correct request information", () => {
    const requestName = wrapper.find("h4");
    expect(requestName.text()).toBe("Test Request");

    const subject = wrapper.find("p:nth-child(1)");
    expect(subject.text()).toContain("Test Subject");

    const description = wrapper.find("p:nth-child(2)");
    expect(description.text()).toContain("Test Description");

    const date = wrapper.find("p:nth-child(3)");
    expect(date.text()).toContain("25/7/2023");
  });

  it("calls handleEdit when edit button is clicked", async () => {
    const editButton = wrapper.find("button:nth-child(1)");
    await editButton.trigger("click");

    // Check if the 'edit' event was emitted with the correct ID
    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit")[0]).toEqual([1]);
  });

  it("calls handleDelete when delete button is clicked", async () => {
    const deleteButton = wrapper.find("button:nth-child(2)");
    await deleteButton.trigger("click");

    // Check if deleteRequest was called with the correct ID
    expect(useRequestStore().deleteRequest).toHaveBeenCalledWith(1);
  });

  it("calls fetchAllRequests on mount", () => {
    expect(useRequestStore().fetchAllRequests).toHaveBeenCalled();
  });
});
