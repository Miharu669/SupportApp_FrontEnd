import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useRequestStore } from './../stores/requestStore';


globalThis.fetch = async (url, options) => {
  if (url.includes('all')) {
    return {
      ok: true,
      json: async () => [{ id: 1, title: 'Test Request' }],
    };
  }
  if (url.includes('add')) {
    return {
      ok: true,
      json: async () => ({ id: 2, title: 'New Request' }),
    };
  }
  if (url.includes('update')) {
    return {
      ok: true,
      json: async () => ({ id: 1, title: 'Updated Request' }),
    };
  }
  if (url.includes('delete')) {
    return {
      ok: true,
    };
  }
  return { ok: false };
};

describe('Request Store', () => {
  let requestStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    requestStore = useRequestStore();
  });

  afterEach(() => {
   

  it('fetches all requests', async () => {
    await requestStore.fetchAllRequests();
    expect(requestStore.requests).toEqual([{ id: 1, title: 'Test Request' }]);
  });

  it('adds a new request', async () => {
    const newRequest = { title: 'New Request' };
    await requestStore.addRequest(newRequest);
    expect(requestStore.requests).toContainEqual({ id: 2, title: 'New Request' });
  });

  it('updates an existing request', async () => {
    const updatedRequest = { title: 'Updated Request' };
    await requestStore.updateRequest(1, updatedRequest);
    expect(requestStore.requests).toContainEqual({ id: 1, title: 'Updated Request' });
  });

  it('deletes a request', async () => {
    await requestStore.deleteRequest(1);
    expect(requestStore.requests).not.toContainEqual({ id: 1, title: 'Updated Request' });
  });

  it('gets request by id', () => {
    requestStore.requests = [{ id: 1, title: 'Test Request' }];
    const request = requestStore.getRequestById(1);
    expect(request).toEqual({ id: 1, title: 'Test Request' });
  });
});
})