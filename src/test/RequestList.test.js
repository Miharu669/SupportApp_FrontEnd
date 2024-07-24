import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import RequestsList from "./../components/RequestList.vue";
import { useRequestStore } from "/src/stores/requestStore";

vi.mock("/src/stores/requestStore", () => ({
  useRequestStore: vi.fn(),
}));

describe("RequestsList", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      requests: [
        {
          id: "1",
          requestName: "Name 1",
          subject: "Subject 1",
          description: "Description 1",
          requestDate: "2023-12-30",
        },
        {
          id: "2",
          requestName: "Name 2",
          subject: "Subject 2",
          description: "Description 2",
          requestDate: "2023-12-31",
        },
      ],
      fetchAllRequests: vi.fn(),
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(RequestsList);
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);

    const h4 = wrapper.findAll("h4");
    expect(h4.length).toBe(2);

    const firstCardTitle = h4[0];
    expect(firstCardTitle.text()).toBe("Name 1");

    const secondCardTitle = h4[1];
    expect(secondCardTitle.text()).toBe("Name 2");
  });

  it("formats the date correctly", () => {
    const cards = wrapper.findAll("#card");
    expect(cards.length).toBe(2);

    const firstCardDate = cards[0].find("#cardDate");
    const secondCardDate = cards[1].find("#cardDate");

    expect(firstCardDate.text()).toContain("30 de diciembre de 2023, 01:00");
    expect(secondCardDate.text()).toContain("31 de diciembre de 2023, 01:00");
  });

  it("calls fetchAllRequests on mount", () => {
    expect(mockStore.fetchAllRequests).toHaveBeenCalled();
  });
});
