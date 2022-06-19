import { constSelector, selector, selectorFamily } from "recoil";
import { searchAllQuery } from "../search/search.store";

export const housesNamesState = constSelector([
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
  "None",
]);

export const studentsAliveCountState = selector({
  key: "students/alive/count",
  get: ({ get }) => {
    const data = get(searchAllQuery);
    const alive = data.filter((v) => v.alive === true).length;
    return [alive, data.length - alive];
  },
});

export const housesStudentsCountState = selectorFamily({
  key: "stats/houses/:house/students/count",
  get:
    (houseName) =>
    ({ get }) => {
      const data = get(searchAllQuery);
      return data.filter((v) => v.house === houseName).length;
    },
});
