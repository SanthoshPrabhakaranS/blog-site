import useSWR from "swr";
import { endpoints } from "../../endpoints/endpoints";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

//GET ALL BLOGS
export const useBlogs = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `https://blog-site-prij.onrender.com${endpoints.getBlogs}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

//GET SINGLE BLOG
export const useGetSingleBlog = (id) => {
  const { data, isLoading, error, mutate } = useSWR(
    `https://blog-site-prij.onrender.com${endpoints.getSingleBlog(id)}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

//GET CATEGORY
export const useGetCategory = (category) => {
  const { data, isLoading, error, mutate } = useSWR(
    `https://blog-site-prij.onrender.com${endpoints.getCategory(category)}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
