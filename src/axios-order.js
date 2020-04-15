import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-fcc76.firebaseio.com/"
});

export default instance;