import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, getTvSearch, IgetMovies, IgetTvSimilar } from "../api";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import Loading from "../components/Loading";

const BackButton = styled(motion.div)`
  width: 8vmax;
  height: 5vamx;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5vmax;
  position: absolute;
  right: 2vmax;
  cursor: pointer;
  svg {
    height: 2vmax;
    width: 2vmax;
    fill: ${(props) => props.theme.white.darker};
  }
`;

const backButtonVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
};

const SearchMovieWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.5vmax 2vmax;
  position: relative;
`;

const SearchTitle = styled.h1`
  font-size: 2.5vmax;
  min-width: 10%;
`;

const SearchContainer = styled.div`
  margin-top: 2vmax;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  width: 100%;
  height: 10vmax;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column-reverse;
`;

const BoxTitle = styled(motion.div)`
  width: 100%;
  height: 1vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    transition: {
      type: "linear",
      delay: 0.3,
    },
    scale: 1.2,
  },
};

const boxTitleVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};
const SearchTvWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.5vmax 2vmax;
`;

function Search() {
  const navigation = useNavigate();
  const { keyword } = useParams();
  const { data: movieSearchData, isLoading } = useQuery<IgetMovies>(
    ["Movies", "Search"],
    () => getMovieSearch(String(keyword))
  );

  const { data: tvSearchData } = useQuery<IgetTvSimilar>(["Tv", "Search"], () =>
    getTvSearch(String(keyword))
  );

  const onClickBack = () => {
    navigation(-1);
  };

  const onClickMovieBox = (movieId: string) => {
    navigation(`/movie/${movieId}/detail`);
  };

  const onClickTvBox = (tvId: string) => {
    navigation(`/tv/${tvId}/detail`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchMovieWrapper>
            <BackButton
              onClick={onClickBack}
              variants={backButtonVariants}
              initial="normal"
              whileHover="hover"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
              </motion.svg>
            </BackButton>
            <SearchTitle>관련 영화!</SearchTitle>
            <SearchContainer>
              {movieSearchData?.results.length !== 0
                ? movieSearchData?.results.map((movie, index) => (
                    <Box
                      onClick={() => onClickMovieBox(String(movie.id))}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      bgphoto={
                        movie.backdrop_path !== null
                          ? makeImagePath(movie.backdrop_path, "w500")
                          : makeImagePath(movie.poster_path, "w500")
                      }
                      key={index}
                    >
                      <BoxTitle variants={boxTitleVariants}>
                        {movie.title}
                      </BoxTitle>
                    </Box>
                  ))
                : null}
            </SearchContainer>
          </SearchMovieWrapper>
          <SearchTvWrapper>
            <SearchTitle>관련 Tv Show!</SearchTitle>
            <SearchContainer>
              {tvSearchData?.results.length !== 0
                ? tvSearchData?.results.map((tv, index) => (
                    <Box
                      onClick={() => onClickTvBox(String(tv.id))}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      bgphoto={
                        tv.backdrop_path !== null
                          ? makeImagePath(tv.backdrop_path, "w500")
                          : makeImagePath(tv.poster_path, "w500")
                      }
                      key={index}
                    >
                      <BoxTitle variants={boxTitleVariants}>{tv.name}</BoxTitle>
                    </Box>
                  ))
                : null}
            </SearchContainer>
          </SearchTvWrapper>
        </>
      )}
    </>
  );
}

export default Search;
