import {useQuery} from "@tanstack/react-query";
import api from "../utils/api.js";

const fetchUpcommingMovies = () => {
    return api.get(`/movie/upcoming`)
}

export const useUpcommingMoviesQuery =() => {
    return useQuery({
        queryKey:["movie-upcomming"],
        queryFn:fetchUpcommingMovies,
        select:(result) => result.data,
    })
}