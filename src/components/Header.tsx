import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vh;
  position: fixed;
`;

const headerVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: inherit;
`;

const Logo = styled(motion.div)`
  margin-right: 2vw;
  background-color: inherit;
  svg {
    min-width: 5vw;
    min-height: 3vh;
  }
  path {
    fill: ${(props) => props.theme.red};
    stroke: white;
    stroke-width: 1px;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [1, 0, 1],
    transition: {
      duration: 1,
    },
  },
};

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: inherit;
`;

const Menu = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1.1vmax;
  margin: 0 1.5vw;
  text-align: center;
  background-color: inherit;
  a {
    background-color: inherit;
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.white.darker};
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  top: 130%;
  left: 40%;
  right: 60%;
  width: 0.3vmax;
  height: 0.3vmax;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  background-color: inherit;
  form {
    background-color: inherit;
  }
  svg {
    height: 2vh;
    margin-right: 3vw;
    &:hover {
      fill: ${(props) => props.theme.white.darker};
    }
  }
`;

const Input = styled(motion.input)`
  color: ${(props) => props.theme.white.lighter};
  background-color: inherit;
  padding: 10px;
  padding-left: 40px;
  border-radius: 10px;
  border: 1px solid white;
  transform-origin: center right;
  &::placeholder {
    color: ${(props) => props.theme.white.darker};
  }
`;

interface IForm {
  value: string;
}

function Header() {
  const { scrollY } = useViewportScroll();
  const navigation = useNavigate();
  const headerAnimation = useAnimation();
  const isMovieMatch = useMatch("/movie");
  const isTvMatch = useMatch("/tv");
  const { register, handleSubmit } = useForm<IForm>();
  const onClickLogo = () => navigation("/");
  const onsubmit = (data: IForm) => {
    navigation(`/search/${data.value}`);
  };
  const [searchOpen, setSearchOpen] = useState(false);
  const onClickSearch = () => {
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    });
  }, [scrollY, headerAnimation]);
  return (
    <Wrapper
      variants={headerVariants}
      animate={headerAnimation}
      initial={"top"}
    >
      <LogoContainer>
        <Logo
          onClick={onClickLogo}
          variants={logoVariants}
          initial="normal"
          whileHover="hover"
        >
          <motion.svg viewBox="0 0 111 30" focusable="false">
            <g>
              <path
                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                id="Fill-14"
              ></path>
            </g>
          </motion.svg>
        </Logo>
        <MenuContainer>
          <Menu>
            <Link to={"/movie"}>영화</Link>
            {isMovieMatch ? <Circle layoutId="circle" /> : null}
          </Menu>
          <Menu>
            <Link to={"/tv"}>Tv</Link>
            {isTvMatch ? <Circle layoutId="circle" /> : null}
          </Menu>
        </MenuContainer>
      </LogoContainer>
      <SearchContainer>
        <form onSubmit={handleSubmit(onsubmit)}>
          <Input
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
            {...register("value")}
            type="text"
            placeholder="검색"
            autoComplete="off"
          />
        </form>
        <motion.svg
          animate={{ x: searchOpen ? -210 : 0 }}
          transition={{ type: "linear" }}
          onClick={onClickSearch}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </motion.svg>
      </SearchContainer>
    </Wrapper>
  );
}

export default Header;
