import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieNowPlaying, IgetMovieNowPlaying } from "../api";
import Header from "../components/Header";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

const Loader = styled.div``;

const Banner = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  padding-left: 3vw;
  background-position: center center;
`;

const BannerTitle = styled.h1`
  background-color: transparent;
  font-size: 4.5vmax;
  font-weight: 600;
  margin-bottom: 4vh;
`;

const BannerOverView = styled.div`
  width: 50%;
  background-color: transparent;
  font-size: 1.6vmax;
`;

const InfoBax = styled(motion.div)`
  margin-top: 2vh;
  width: min-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background-color: transparent;
  padding: 1vw;
  cursor: pointer;
  svg {
    height: 1.3vmax;
    margin-right: 0.5vw;
    fill: ${(props) => props.theme.white.lighter};
  }
  span {
    font-size: 1.2vmax;
    background-color: transparent;
    width: 5vmax;
  }
`;

function Movie() {
  const onClickBannerInfo = () =>
    navigation(`/movie/${nowPlayingData?.results[0].id}`);
  const navigation = useNavigate();
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IgetMovieNowPlaying>(["Movies", "NowPlaying"], getMovieNowPlaying);
  return (
    <>
      <Header />
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner
          bgphoto={makeImagePath(
            String(nowPlayingData?.results[0].backdrop_path),
            "w500"
          )}
        >
          <BannerTitle>{nowPlayingData?.results[0].title}</BannerTitle>
          <BannerOverView>{nowPlayingData?.results[0].overview}</BannerOverView>
          <InfoBax
            whileHover={{ scale: 1.1 }}
            transition={{ type: "linear" }}
            onClick={onClickBannerInfo}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
            </svg>
            <span>상세보기</span>
          </InfoBax>
        </Banner>
      )}
    </>
  );
}

export default Movie;
