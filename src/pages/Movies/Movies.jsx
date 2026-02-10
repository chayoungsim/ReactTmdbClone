import { Suspense, useState, useTransition } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie.js";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre.js";
import MovieCard from "../../common/MovieCard2";
import ReactPaginate from "react-paginate";
import "./Movies.scss";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ErrorBoundary } from "react-error-boundary";

//페이지네이션 설치
//page state만들기
//페이지네이션 클릭할때마다 page바꿔주기
//page값이 바뀔때마다 useNowPlayingMoviesQuery()에 page 넣어서 fetch

const Movies = () => {
    return (
        <ErrorBoundary fallbackRender={() => <h1>에러가 발생했습니다.</h1>}>
            <Suspense fallback={<ClipLoader color="#e50914" size={150} />}>
                <MovieGrid />
            </Suspense>
        </ErrorBoundary>
    );
};

const MovieGrid = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isPending, startTransition] = useTransition();
    const keyword = query.get("q");

    const { data } = useSearchMovieQuery({ keyword, page });
    const { data: genreData } = useMovieGenreQuery();

    const filteredMovies = selectedGenre
        ? data?.results.filter((movie) => movie.genre_ids.includes(selectedGenre))
        : data?.results;

    const sortedMovies =
        filteredMovies &&
        [...filteredMovies].sort((a, b) => {
            if (sortBy === "popularity.desc") {
                return b.popularity - a.popularity;
            }
            if (sortBy === "vote_average.desc") {
                return b.vote_average - a.vote_average;
            }
            return 0;
        });

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value ? parseInt(event.target.value) : null);
    };

    const handlePageClick = ({ selected }) => {
        startTransition(() => {
            setPage(selected + 1);
        });
    };

    return (
        <div className="MovieCard-lists">
            {isPending && (
                <div className="spinner-container">
                    <ClipLoader color="#e50914" size={80} />
                </div>
            )}
            <div className="filter">
                <div className="filter-item">
                    <label>장르</label>
                    <select onChange={handleGenreChange} value={selectedGenre || ""}>
                        <option value="">전체</option>
                        {genreData?.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <label>정렬</label>
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="popularity.desc">인기순</option>
                        <option value="vote_average.desc">평점순</option>
                    </select>
                </div>
            </div>
            <div className="lists">
                {sortedMovies && sortedMovies.length > 0 ? (
                    sortedMovies.map((movie, index) => <MovieCard movie={movie} key={index} />)
                ) : (
                    <div className="no-results">조건에 맞는 영화가 없습니다.</div>
                )}
            </div>
            <div className="pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={data?.total_pages} //전체페이지가 몇개인지
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </div>
        </div>
    );
};

export default Movies;
