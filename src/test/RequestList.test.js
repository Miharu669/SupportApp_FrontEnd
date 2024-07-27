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
  it("displays requests correctly", () => {
    const cards = wrapper.findAll("#card");
    expect(cards.length).toBe(mockStore.requests.length);

    mockStore.requests.forEach((request, index) => {
      const card = cards.at(index);
      expect(card.find("#cardName").text()).toBe(request.requestName);
      expect(card.find("#cardSubject").text()).toContain(request.subject);
      expect(card.find("#cardDescription").text()).toContain(
        request.description
      );
      expect(card.find("#cardDate").text()).toContain(
        wrapper.vm.formatDate(request.requestDate)
      );
    });
  });
  it("handles no requests correctly", () => {
    mockStore.requests = [];
    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    expect(wrapper.findAll("#card").length).toBe(0);
  });
  it("handles invalid dates gracefully", () => {
    mockStore.requests = [
      {
        id: 1,
        requestName: "Test Request 1",
        subject: "Test Subject 1",
        description: "Test Description 1",
        requestDate: "invalid-date",
      },
    ];
    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    const card = wrapper.find("#card");
    expect(card.find("#cardName").text()).toBe("Test Request 1");
    expect(card.find("#cardSubject").text()).toContain("Test Subject 1");
    expect(card.find("#cardDescription").text()).toContain(
      "Test Description 1"
    );
    expect(card.find("#cardDate").text()).toContain("Invalid Date");
  });

  it("handles long request names, subjects, and descriptions", () => {
    mockStore.requests = [
      {
        id: 1,
        requestName: "A".repeat(100),
        subject: "B".repeat(100),
        description: "C".repeat(500),
        requestDate: "2024-07-27T14:30:00Z",
      },
    ];
    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    const card = wrapper.find("#card");
    expect(card.find("#cardName").text()).toBe("A".repeat(100));
    expect(card.find("#cardSubject").text()).toContain("B".repeat(100));
    expect(card.find("#cardDescription").text()).toContain("C".repeat(500));
    expect(card.find("#cardDate").text()).toContain(
      wrapper.vm.formatDate("2024-07-27T14:30:00Z")
    );
  });
  it("handles requests with empty fields correctly", () => {
    mockStore.requests = [
      {
        id: 1,
        requestName: "",
        subject: "",
        description: "",
        requestDate: "2024-07-27T14:30:00Z",
      },
    ];
    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    const card = wrapper.find("#card");
    expect(card.find("#cardName").text()).toBe("");
    expect(card.find("#cardSubject").text()).toContain("");
    expect(card.find("#cardDescription").text()).toContain("");
    expect(card.find("#cardDate").text()).toContain(
      wrapper.vm.formatDate("2024-07-27T14:30:00Z")
    );
  });
  it("handles special characters in request fields correctly", () => {
    mockStore.requests = [
      {
        id: 1,
        requestName: '<script>alert("XSS")</script>',
        subject: "@#$%^&*()_+",
        description: "Test with 🚀 emoji and unicode characters: 你好",
        requestDate: "2024-07-27T14:30:00Z",
      },
    ];
    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    const card = wrapper.find("#card");
    expect(card.find("#cardName").text()).toBe('<script>alert("XSS")</script>');
    expect(card.find("#cardSubject").text()).toContain("@#$%^&*()_+");
    expect(card.find("#cardDescription").text()).toContain(
      "Test with 🚀 emoji and unicode characters: 你好"
    );
    expect(card.find("#cardDate").text()).toContain(
      wrapper.vm.formatDate("2024-07-27T14:30:00Z")
    );
  });
  it("performs well with a large number of requests", () => {
    mockStore.requests = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      requestName: `Request ${index + 1}`,
      subject: `Subject ${index + 1}`,
      description: `Description ${index + 1}`,
      requestDate: `2024-07-${(index % 31) + 1}T14:30:00Z`,
    }));

    wrapper = mount(RequestsList, {
      global: {
        stubs: ["router-link"],
      },
    });

    expect(wrapper.findAll("#card").length).toBe(1000);
  });

  it("calls fetchAllRequests on mount", () => {
    expect(mockStore.fetchAllRequests).toHaveBeenCalled();
  });
});
