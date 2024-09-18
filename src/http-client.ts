import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://mate.academy/students-api/todos",
});

const USER_ID = 11557;

export const getTasks = () => {
  return httpClient.get(`?userId=${USER_ID}`).then((response) => response.data);
};

export const createTask = (title) => {
  return httpClient
    .post(``, {
      title,
      completed: false,
      userId: USER_ID,
    })
    .then((response) => response.data);
};

export const deleteTask = (taskId) => {
  return httpClient.delete(`/${taskId}`);
};

export const patchTask = ({ id, title, completed }) => {
  return httpClient.patch(`/${id}`, {
    title,
    completed,
  });
};
