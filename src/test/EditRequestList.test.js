import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import EditRequestList from "@/components/EditRequestList.vue";
import { useRequestStore } from "../stores/requestStore";
import { nextTick } from "vue";

vi.mock("../stores/requestStore", () => ({
  useRequestStore: vi.fn(),
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
    console.log(wrapper.html());
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

  it("renders the requests", async () => {
    await nextTick();
    expect(wrapper.find("h4").text()).toBe("Test Request");
    expect(wrapper.find("p:nth-child(1)").text()).toContain("Test Subject");
    expect(wrapper.find("p:nth-child(2)").text()).toContain("Test Description");
  });

  it("calls handleEdit when edit button is clicked", async () => {
    await nextTick();
    const editButton = wrapper.find('[data-test="edit-button"]');
    await editButton.trigger("click");

    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit")[0]).toEqual([1]);
  });

  it("calls handleDelete when delete button is clicked", async () => {
    const deleteButton = wrapper.find('[data-test="delete-button"]');
    await deleteButton.trigger("click");

    expect(useRequestStore().deleteRequest).toHaveBeenCalledWith(1);
  });

  it("calls fetchAllRequests on mount", () => {
    expect(useRequestStore().fetchAllRequests).toHaveBeenCalled();
  });
});
