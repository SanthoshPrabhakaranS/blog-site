import axios from "axios";
import { endpoints } from "../../endpoints/endpoints";

export const ApiInstance = axios.create({
  baseURL: "https://blog-site-prij.onrender.com",
});

export default class AuthService {
  async register(user) {
    const response = await ApiInstance.post(endpoints.register, user);
    return response.data;
  }

  async login(user) {
    const response = await ApiInstance.post(endpoints.login, user);
    return response.data;
  }
}
