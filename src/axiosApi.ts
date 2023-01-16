import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://almaz-js17-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;