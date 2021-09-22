import http from "./httpService";
const URL = `http://localhost:5000`;

export async function getBackendGenres(){
      try {
        return http.get(`${URL}/genres`);
        // console.log("backend genres", data);
      } catch (err) {
        console.error("backedd", err.message);
      }
}
