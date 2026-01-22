import { movieInstance } from "../http/api-movie.instance.js";

export class ApiMovie {

    static async getPopularMovies(page = 1) {
        const { data } = await movieInstance.get(`/movie/popular?page=${page}`, {
            params: { language: 'es-ES' },
        });
        return data;
    }

    static async getPopularSeries(page = 1) {
        const { data } = await movieInstance.get(`discover/tv?page=${page}`, {
            params: { language: 'es-ES' },
        });
        return data;
    }

    static async getDetails(type, id){
        const response = await movieInstance.get(`/${type}/${id}`, {
            params: { language: 'es-ES' }
        });
        return response.data;
    }
    static async getSearch(name, type) {
        const response = await movieInstance.get(`/search/${type}`, {
            params: {
                query: name,
                language: 'es-ES'
            }
        });
        return response.data;
    }
    static async getNowPlaying() {
        const response = await movieInstance.get(`/movie/now_playing`, {
            params: { language: 'es-ES' }
        });
        return response.data;
    }
    static async getVideo(id, type) {
        const response = await movieInstance.get(`/${type}/${id}/videos`, {
            params: {
                language: 'es-ES'
            }
        });
        return response.data;
    }
}
