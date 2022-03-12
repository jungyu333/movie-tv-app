import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieNowPlaying,
  getTopRatedMovie,
  getUpcomingMovie,
  IgetMovies,
} from "../api";
import Header from "../components/Header";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";
import Sliders from "../components/Sliders";
import { useState } from "react";
import Loading from "../components/Loading";
import { isMobile } from "react-device-detect";

const Banner = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  padding-left: 3vw;
  background-position: center center;
  position: relative;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 60vh;
    padding-bottom: 2.5vmax;
    margin: 0 auto;
  }
`;

const BannerTitle = styled.h1`
  background-color: transparent;
  font-size: 4.5vmax;
  font-weight: 600;
  margin-bottom: 4vh;
  @media screen and (max-width: 500px) {
    margin-bottom: 1vmax;
  }
`;

const BannerOverView = styled.div`
  width: 50%;
  height: 30%;
  background-color: transparent;
  font-size: 1.6vmax;
  line-height: 1.2;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
    opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.white.darker};
    border-radius: 30px;
    background-clip: padding-box;
  }
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
  @media screen and (max-width: 500px) {
    margin: 1vmax 0;
    text-align: center;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    height: 1.3vmax;
    margin-right: 0.5vw;
    fill: ${(props) => props.theme.white.lighter};
  }
  span {
    font-size: 1.2vmax;
    background-color: transparent;
    width: 5vmax;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`;

const SliderWrapper = styled.div`
  padding: 3.5vh 0;
  background-color: black;
  @media screen and (max-width: 500px) {
    padding: 4vh 0;
  }
`;

function Movie() {
  const [clickSliderNum, setClickSliderNum] = useState(0);
  const navigation = useNavigate();
  const onClickBannerInfo = () =>
    navigation(`/movie/${nowPlayingData?.results[0].id}/detail`);

  const { data: nowPlayingData, isLoading } = useQuery<IgetMovies>(
    ["Movies", "NowPlaying"],
    getMovieNowPlaying
  );

  const { data: upComingData } = useQuery<IgetMovies>(
    ["Movies", "Upcoming"],
    getUpcomingMovie
  );

  const { data: topRatedData } = useQuery<IgetMovies>(
    ["Movies", "TopRated"],
    getTopRatedMovie
  );

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!isMobile ? (
            <Banner
              bgphoto={makeImagePath(
                String(nowPlayingData?.results[0].backdrop_path),
                "w500"
              )}
            >
              <BannerTitle>{nowPlayingData?.results[0].title}</BannerTitle>
              <BannerOverView>
                {nowPlayingData?.results[0].overview}
              </BannerOverView>
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
          ) : (
            <Banner
              bgphoto={makeImagePath(
                String(nowPlayingData?.results[0].poster_path),
                "w500"
              )}
            >
              <BannerTitle>{nowPlayingData?.results[0].title}</BannerTitle>
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
          <SliderWrapper onClick={() => setClickSliderNum(1)}>
            <Sliders
              data={nowPlayingData as IgetMovies}
              title="극장에서 상영 중!"
              sliderNum="1"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
          <SliderWrapper onClick={() => setClickSliderNum(2)}>
            <Sliders
              data={upComingData as IgetMovies}
              title="곧 만나요 우리!"
              sliderNum="2"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
          <SliderWrapper onClick={() => setClickSliderNum(3)}>
            <Sliders
              data={topRatedData as IgetMovies}
              title="최고 인기작!"
              sliderNum="3"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
        </>
      )}
    </>
  );
}

export default Movie;
