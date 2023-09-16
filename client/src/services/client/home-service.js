import axios from "axios";

export const payment = async (body) => {
    const {data} = await axios.post("/payment", body);
    return data;
};
