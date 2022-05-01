import * as yup from "yup";

import {
  ArticleStatusEnum,
  ArticleDef,
  ArticleParams,
  ArticleRequest,
} from "features/article/article";

export const searchSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().max(255),
});

export const searchInitialValues: ArticleParams = {
  id: "",
  title: "",
  status: "",
  categoryId: "",
  page: 1,
  perPage: 5,
};

export const editSchema = yup.object().shape({
  title: yup.string().max(255),
  link: yup.string().max(255),
});

export const editInitialValues: ArticleRequest = {
  title: "",
  categoryId: "",
  description: "",
  content: "",
  author: "",
  source: "",
  thumbnail: "",
  status: ArticleStatusEnum.DISPLAY,
};

export const convertResponseToFormData = (
  article: ArticleDef
): ArticleRequest => {
  return { ...article };
};
