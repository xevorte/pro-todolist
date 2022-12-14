import axios from "axios";

export const API = "https://todo.api.devcode.gethired.id";

const callApi = (method, url, data) => (
    axios({
        method,
        url: `${API + url}`,
        data
    })
);

const envApi = "irhammshidiq@gmail.com";

export const listActivityGroups = async () => {
    const res = await callApi("get", `/activity-groups?email=${envApi}`);

    return res;
};
export const detailActivityGroup = async (id) => {
    const res = await callApi("get", `/activity-groups/${id}`);

    return res;
};
export const createActivityGroup = async (data) => {
    const res = await callApi("post", "/activity-groups", {
        ...data,
        email: envApi
    });

    return res;
};
export const updateActivityGroup = async (id, data) => {
    const res = await callApi("patch", `/activity-groups/${id}`, data);

    return res;
};
export const removeActivityGroup = async (id) => {
    const res = await callApi("delete", `/activity-groups/${id}`);

    return res;
};

export const listTodoItems = async (id) => {
    const res = await callApi("get", `/todo-items?activity_group_id=${id}`);

    return res;
};
export const detailTodoItem = async (id) => {
    const res = await callApi("get", `/todo-items/${id}`);

    return res;
};
export const createTodoItem = async (data) => {
    const res = await callApi("post", "/todo-items", data);

    return res;
};
export const updateTodoItem = async (id, data) => {
    const res = await callApi("patch", `/todo-items/${id}`, data);

    return res;
};
export const removeTodoItem = async (id) => {
    const res = await callApi("delete", `/todo-items/${id}`);

    return res;
};