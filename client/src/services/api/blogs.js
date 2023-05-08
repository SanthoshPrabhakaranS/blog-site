import { endpoints } from "../../endpoints/endpoints";
import { ApiInstance } from "./auth";

export default class BlogsService {
  async createBlog(blog) {
    const response = await ApiInstance.post(endpoints.createPost, blog);
    return response.data;
  }

  async updateBlog(blog) {
    const response = await ApiInstance.put(endpoints.updateBlog, blog);
    return response.data;
  }

  async deleteBlog(blogId) {
    const response = await ApiInstance.delete(endpoints.deleteBlog(blogId));
    return response.data;
  }
}
