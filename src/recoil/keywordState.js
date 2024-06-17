import { atom } from "recoil";

export const keywordState = atom({
  key: "keywordState",
  default: [],
});

const defaultImageState = {
  keyword: "Keyword",
  imageUrl: "ImageUrl",
  bgOpacity: "numBgOpacity",
};

export const imageState = atom({
  key: "imageState",
  default: [],
});
