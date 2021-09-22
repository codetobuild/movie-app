import http from "./httpService";
const URL = `http://localhost:5000`;

export async function getBackendMovies() {
  try {
    return http.get(`${URL}/movies`);
  } catch (err) {
    console.error("backedd", err.message);
  }
}

export async function createMovie(data){
  try {
    return http.post(`${URL}/movies/new`, data);
  } catch (err) {
    console.error("backedd", err.message);
  }
}

export async function getBackendMovie(movieId) {
  try {
    return http.get(`${URL}/movies/${movieId}`);
  } catch (err) {
    console.error("backedd", err.message);
  }
}

export async function updateMovie(movieId, data) {
  try {
    return http.put(`${URL}/movies/${movieId}`, data);
  } catch (err) {
    console.error("backedd", err.message);
  }
}

export async function deleteMovie(movieId) {
  try {
    return http.delete(`${URL}/movies/${movieId}`);
  } catch (err) {
    console.error("backedd", err.message);
  }
}
