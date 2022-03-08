const API_ENDPOINT = 'example';

export const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  fetchCats: async (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatInfo: async (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/${keyword}`);
  },
};
