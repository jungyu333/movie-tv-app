import styled from "styled-components";
import { IgetMoviesResults } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import Detail from "./Detail";

interface slidersProps {
  data: {
    dates: {
      maximum: string;
      minimum: string;
    };
    results: IgetMoviesResults[];
  };
  title: string;
  sliderNum: string;
  ClickSliderNum: number;
}

const Slider = styled.div`
  position: relative;
  height: 30vh;
`;

const SliderTitle = styled.h1`
  position: absolute;
  top: -4.5vh;
  font-size: 1.5vmax;
  background-color: transparent;
  padding-left: 2vw;
`;

const LeftButton = styled.div`
  height: 100%;
  width: 2vmax;
  position: absolute;
  z-index: 98;
  background-color: ${(props) => props.theme.black.darker};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    background-color: ${(props) => props.theme.black.lighter};
  }
  svg {
    width: 1.5vmax;
    height: 5vmax;
    fill: ${(props) => props.theme.white.darker};
    &:hover {
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const RightButton = styled.div`
  height: 100%;
  width: 2vmax;
  right: 0;
  position: absolute;
  z-index: 98;
  background-color: ${(props) => props.theme.black.darker};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    background-color: ${(props) => props.theme.black.lighter};
  }
  svg {
    width: 1.5vmax;
    height: 5vmax;
    fill: ${(props) => props.theme.white.darker};
    &:hover {
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  padding: 0 1vmax;
  margin-bottom: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  background-color: black;
`;

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth : -window.innerWidth,
  }),
};

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 30vh;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column-reverse;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
    zIndex: 100,
    transition: {
      delay: 0.3,
      type: "linear",
    },
  },
};

const BoxTitle = styled(motion.div)`
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
`;

const boxTitleVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  opacity: 1;
`;

const BigMovieContainer = styled(motion.div)`
  width: 40vw;
  height: 90vh;
  position: absolute;
  z-index: 100;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;
  z-index: 100;
  position: relative;
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

const ExitButton = styled(motion.div)`
  background-color: transparent;
  position: absolute;
  z-index: 100;
  right: 2vmax;
  top: 2vmax;
  svg {
    height: 2vmax;
    fill: ${(props) => props.theme.white.darker};
    &:hover {
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const exitButtonVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
};

const offset = 6;
function Sliders({ data, title, sliderNum, ClickSliderNum }: slidersProps) {
  const navigation = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const detailMovieMatch = useMatch("/movie/:movieId");
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovie = data.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovie = data.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onClickkBox = (movieId: number) => {
    navigation(`/movie/${movieId}`);
  };
  const onClickExit = () => navigation("/movie");
  const clickedMovie =
    detailMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === detailMovieMatch.params.movieId
    );

  return (
    <>
      <Slider>
        <SliderTitle>{title}</SliderTitle>
        <LeftButton onClick={increaseIndex}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
          </svg>
        </LeftButton>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={back}
            key={index}
            transition={{ type: "tween", duration: 1 }}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + "" + String(sliderNum)}
                  onClick={() => onClickkBox(movie.id)}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  key={movie.id + sliderNum}
                  transition={{ type: "linear" }}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <BoxTitle variants={boxTitleVariants}>{movie.title}</BoxTitle>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <RightButton onClick={decreaseIndex}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
          </svg>
        </RightButton>
      </Slider>
      <AnimatePresence>
        {detailMovieMatch && ClickSliderNum === Number(sliderNum) ? (
          <>
            <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BigMovieContainer
                style={{ top: "8vh" }}
                layoutId={detailMovieMatch.params.movieId + String(sliderNum)}
              >
                {clickedMovie && (
                  <>
                    <BigCover>
                      <ExitButton
                        variants={exitButtonVariants}
                        initial="normal"
                        whileHover="hover"
                        onClick={onClickExit}
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" />
                        </motion.svg>
                      </ExitButton>
                      <Detail />
                    </BigCover>
                  </>
                )}
              </BigMovieContainer>
            </Overlay>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sliders;
