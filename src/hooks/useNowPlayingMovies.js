import {useQuery} from "@tanstack/react-query";
import api from "../utils/api.js"

const fetchNowPlayingMovies = () => {
    return api.get(`/movie/now_playing`)
}

export const useNowPlayingMoviesQuery = () => {
    return useQuery({
        queryKey:['Now-Playing'],
        queryFn:fetchNowPlayingMovies,
        select : (result) => result.data,
    })
}