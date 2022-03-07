import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getTvDetail, getTvVideo, IgetTvDetail, IgetVideo } from "../api";
import { makeImagePath, makeVideoPath } from "../utils";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const Wrapper = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PosterContainer = styled(motion.div)<{ poster: string }>`
  width: 30vmax;
  height: 45vmax;
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
`;

const posterContainerVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      delay: 0.3,
      type: "linear",
    },
  },
};

const Container = styled.div`
  width: 55vmax;
  height: 45vmax;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  position: relative;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 25vmax;
  overflow-y: auto;
  background-color: transparent;
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

const Title = styled.h1`
  width: 60%;
  font-size: 3vmax;
  background-color: transparent;
`;

const BackButton = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0.5vmax;
  right: 3vmax;
  width: 10vmax;
  height: 2.5vmax;
  padding: 0.5vmax;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.white.darker};
  svg {
    height: 100%;
    width: 100%;
    fill: ${(props) => props.theme.white.darker};
  }
`;

const backButtonVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "linear",
      delay: 0.2,
    },
  },
};

const SubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2vmax;
  background-color: transparent;
`;

const TagLine = styled.div`
  width: 60%;
  font-size: 1.2vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const SubInfoBox = styled.div`
  width: 15vmax;
  margin-right: 2vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const RunTime = styled.span`
  min-width: 40%;
  font-size: 1vmax;
  padding: 0.5vmax 1vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.white.darker};
  margin-right: 1vmax;
  background-color: transparent;
`;

const Vote = styled.span`
  min-width: 40%;
  font-size: 1vmax;
  padding: 0.5vmax 1vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.white.darker};
  background-color: transparent;
  svg {
    height: 0.8vmax;
    margin-right: 0.5vmax;
    fill: yellow;
  }
`;

const GenresContainer = styled.div`
  margin-top: 1.5vmax;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const Genres = styled.span`
  margin-right: 1vmax;
  font-size: 1vmax;
  background-color: transparent;
`;

const Overview = styled.div`
  width: 100%;
  margin-top: 2vmax;
  font-size: 1.2vmax;
  height: 20vh;
  overflow-y: auto;
  background-color: transparent;
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

const VideoContainer = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
`;

function TvDetailPage() {
  const navigation = useNavigate();
  const { tvId } = useParams();
  const { data: videoData } = useQuery<IgetVideo>(["Tv", "Videos"], () =>
    getTvVideo(String(tvId))
  );
  const { data, isLoading } = useQuery<IgetTvDetail>(["Tv", "Detail"], () =>
    getTvDetail(String(tvId))
  );
  const onClickBack = () => navigation(-1);
  return (
    <>
      {isLoading ? (
        <div>Loding...</div>
      ) : (
        <Wrapper bgphoto={makeImagePath(String(data?.backdrop_path))}>
          <PosterContainer
            variants={posterContainerVariants}
            initial="normal"
            whileHover="hover"
            poster={makeImagePath(String(data?.poster_path), "w500")}
          ></PosterContainer>
          <Container>
            <InfoContainer>
              <Title>{data?.name}</Title>
              <BackButton
                variants={backButtonVariants}
                initial="normal"
                whileHover="hover"
                onClick={onClickBack}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                </motion.svg>
              </BackButton>
              <SubInfo>
                <TagLine>{data?.tagline}</TagLine>
                <SubInfoBox>
                  <RunTime>{data?.episode_run_time} min</RunTime>
                  <Vote>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                    </svg>
                    {data?.vote_average}
                  </Vote>
                </SubInfoBox>
              </SubInfo>
              <GenresContainer>
                {data?.genres.map((gen, index) => (
                  <Genres key={index}>#{gen.name}</Genres>
                ))}
              </GenresContainer>
              <Overview>{data?.overview}</Overview>
            </InfoContainer>
            <VideoContainer>
              {videoData?.results.length !== 0 ? (
                <ReactPlayer
                  url={makeVideoPath(String(videoData?.results[0].key))}
                  width="100%"
                  height="20vmax"
                  loop={true}
                  muted={true}
                  playing={true}
                  controls={false}
                  light={false}
                />
              ) : null}
            </VideoContainer>
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default TvDetailPage;
