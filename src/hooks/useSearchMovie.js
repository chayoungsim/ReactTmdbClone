import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.js";


const fetchSearchMove = ({keyword,page}) => {
    return keyword 
    ? api.get(`/search/movie?query=${keyword}&page=${page}`) 
    : api.get(`/movie/now_playing?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ["movie-search", {keyword, page}],
        queryFn : () => fetchSearchMove({keyword, page}),
        select: (result) => result.data,
        suspense: true,
    })
}