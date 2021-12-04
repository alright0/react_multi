import * as axios from "axios";

const BASE_URL = "http://localhost:20000/";

const instanse = axios.create({
  //withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    //"API-KEY": API_KEY,
  },
});

export const bookApi = {
  getBooks() {
    return instanse.get(`api/book`).then((response) => {
      return response.data;
    });
  },
  addBook(data) {
    return instanse.post("api/book/", data).then((response) => {
      return response.data;
    });
  },
  deleteBook(id) {
    let data = { id };
    return instanse.delete("api/book/", { data }).then((response) => {
      return response.data;
    });
  },
};
