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
  fetchExample: async (keyword) => {
    return request(`${API_ENDPOINT}/api/search?q=${keyword}`);
  },
};
