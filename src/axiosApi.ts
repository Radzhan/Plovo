import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://radjan-js-17-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;