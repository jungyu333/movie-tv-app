import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../fbase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.8)
    ),
    url(https://assets.nflxext.com/ffe/siteui/vlv3/8607d312-c4d0-4ce2-955d-50d728ae845f/f5aa75a9-2c6e-4f3a-a83e-4624365cb04c/KR-ko-20220226-popsignuptwoweeks-perspective_alpha_website_large.jpg);
`;

const Logo = styled(motion.div)`
  background-color: transparent;
  position: fixed;
  top: 1.5vmax;
  left: 1.5vmax;
  height: 3vmax;
  width: 10vmax;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.red};
    min-width: 100%;
    min-height: 100%;
    background-color: transparent;
    path {
      stroke: white;
      stroke-width: 0.5px;
    }
  }
`;

const LogInContainer = styled.div`
  width: 480px;
  height: 620px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 70px;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LogIn = styled.h1`
  font-weight: 600;
  font-size: 32px;
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Input = styled.input`
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px 5px;
  &:focus {
    outline: none;
  }

  &:nth-child(5) {
    cursor: pointer;
    color: ${(props) => props.theme.white.lighter};
    background-color: ${(props) => props.theme.red};
    font-size: 18px;
  }
`;

const NewButton = styled.span`
  background-color: inherit;
  cursor: pointer;
  margin-top: 10px;
`;

const Error = styled.span`
  padding: 5px;
  background-color: transparent;
  font-size: 18px;
`;

const SocialButton = styled.button`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 300px;
  color: white;
  background-color: transparent;
  margin: 20px auto;
  cursor: pointer;
  svg {
    fill: blue;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

interface IForm {
  email: string;
  password: string;
}
function LogInPage() {
  const navigation = useNavigate();
  const { register, handleSubmit, formState } = useForm<IForm>();
  const onClickLogo = () => navigation("/");
  const onClickNewButton = () => navigation("/login/new");
  const onsubmit = (data: IForm) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        navigation("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          alert("???????????? ?????? ?????? ????????????.");
        } else if (errorCode === "auth/wrong-password") {
          alert("????????? ???????????? ?????????.");
        }
      });
  };
  const onClickSocial = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigation("/");
  };

  return (
    <>
      <Wrapper>
        <Logo onClick={onClickLogo}>
          <svg viewBox="0 0 111 30" focusable="false">
            <g>
              <path
                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                id="Fill-14"
              ></path>
            </g>
          </svg>
        </Logo>
        <LogInContainer>
          <LogIn>?????????</LogIn>
          <FormContainer>
            <form onSubmit={handleSubmit(onsubmit)}>
              <Input
                {...register("email", {
                  required: "???????????? ??????????????????.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "naver ????????? ??????????????????.",
                  },
                })}
                type="text"
                placeholder="????????? ??????"
                autoComplete="off"
              />
              <Error>{formState.errors.email?.message}</Error>
              <Input
                {...register("password", {
                  required: "10??? ???????????? ??????????????????.",
                })}
                type="password"
                placeholder="????????????"
                autoComplete="off"
              />
              <Error>{formState.errors.password?.message}</Error>
              <Input type="submit" value="?????????"></Input>
              <NewButton onClick={onClickNewButton}>????????????</NewButton>

              <SocialButton onClick={onClickSocial} name="google">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Sign with Google!
              </SocialButton>
            </form>
          </FormContainer>
        </LogInContainer>
      </Wrapper>
    </>
  );
}

export default LogInPage;
