import axios from 'axios';


const axiosInstance = axios.create({
      baseURL: `https://book-galaxy-610c0.web.app` | "http://localhost:5173",
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;