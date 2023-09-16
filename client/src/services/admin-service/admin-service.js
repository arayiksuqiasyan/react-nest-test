import axios from "axios";

export const authServiceLoginUser = async (body) => {
    const { data } = await axios.post("/auth-admin/login", body);
    return data;
};
