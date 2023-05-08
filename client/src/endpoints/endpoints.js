export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  createPost: "/blog",
  getBlogs: "/blogs",
  getSingleBlog: (id) => `/${id}`,
  updateBlog: "/update",
  getCategory: (category) => `/category/${category}`,
  deleteBlog: (blogId) => `/delete/${blogId}`
};