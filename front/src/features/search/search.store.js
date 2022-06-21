import { atom, constSelector, selector, selectorFamily } from "recoil";
import qs from "qs";

const baseUrl = constSelector("http://localhost:5000/api/students");

export const searchFilterState = atom({
  key: "search/filter",
  default: "name",
});

export const searchValueState = atom({
  key: "search/value",
  default: "",
});

export const searchAllQuery = selector({
  key: "search/all",
  /**
   *
   * @returns {Array}
   */
  get: async ({ get }) => {
    try {
      const response = await fetch(get(baseUrl));

      if (!response.ok) return [];

      const data = await response.json();

      return data;
    } catch (error) {
      return [];
    }
  },
});

export const searchByHouseQuery = selectorFamily({
  key: "search/house",
  get:
    (house) =>
    /**
     *
     * @returns {Array}
     */
    async ({ get }) => {
      try {
        const response = await fetch(
          get(baseUrl) + "?" + qs.stringify({ house }, { skipNulls: true })
        );

        if (!response.ok) return [];

        const data = await response.json();

        return data;
      } catch (error) {
        return [];
      }
    },
});

export const searchByNameQuery = selectorFamily({
  key: "search/name",
  get:
    (name) =>
    /**
     *
     * @returns {Array}
     */
    async ({ get }) => {
      try {
        const response = await fetch(
          get(baseUrl) + "?" + qs.stringify({ name }, { skipNulls: true })
        );

        if (!response.ok) return [];

        const data = await response.json();

        return data;
      } catch (error) {
        return [];
      }
    },
});

export const searchQuery = selector({
  key: "search",
  get: ({ get }) => {
    const filter = get(searchFilterState);
    const value = get(searchValueState);

    if (value.length <= 2) {
      return get(searchAllQuery);
    } else if (value.length > 2) {
      switch (filter) {
        case "house":
          return get(searchByHouseQuery(value));
        case "name":
          return get(searchByNameQuery(value));
        default:
          return [];
      }
    }
  },
});
