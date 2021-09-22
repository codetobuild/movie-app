import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error("unexpected error occured!");
    console.log(err);
  }

  return Promise.reject(err);
});


export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
}



