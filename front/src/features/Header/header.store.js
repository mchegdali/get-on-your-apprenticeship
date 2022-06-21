import { atom } from "recoil";

export const isMenuOpenState = atom({
  key: "menu/open",
  default: false,
});
