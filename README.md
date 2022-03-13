# :movie_camera: Netflix Clone
### Demo https://jungyu333.github.io/movie-tv-app
<br/><br/>

## :hammer: Used Stack
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<br/>
<img src="https://img.shields.io/badge/Html5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/Css3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/StyldComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Reactrouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<br/><br/>

## :notebook: What is this project?
React를 이용하여 넷플릭스와 비슷한 영화나 Tv 프로그램의 정보를 볼 수 있는 웹사이트를 만들어 보았습니다.<br/>구현에 필요한 영화,Tv 데이터 들은 TMDB의 API를 이용하였습니다
<br/><br/><br/>
### <li>LogIn Page
 ![login](https://user-images.githubusercontent.com/96876293/158061995-72681d38-cc68-45d6-a6fd-b8c03158715a.png)<br/>
 로그인 페이지의 경우 firebase의 Authentication을 활용하여 간단한 로그인 & 로그아웃을 구현 하였고 google 소셜 로그인도 활용 해 보았습니다. **useForm Hook**을 활용하여 Validation을 하였습니다.  <br/>로그인이 안되어있는 상태로 메인 홈페이지에 들어가려고 할 시 로그인 페이지로 리다이렉트 될 수 있도록 했습니다
 <br/>
### <li>Movie & Tv</li>
<img src="https://user-images.githubusercontent.com/96876293/158062693-678f8558-705f-48b6-b8bc-1e5dc1f67da2.png"  width="60%" height="60%"/><br/>
메인 페이지의 경우 API 데이터들을 **React Query**를 활용하여 가져 왔습니다.<br/>
각 페이지의 영화 목록들 같은 경우 **framer motion**을 활용하여 슬라이더를 구현 하였고<br/> 각 영화들의 hover 애니메이션과 클릭시 영화의 detail이 나올 수 있도록 **AnimatePresence**를 활용하였습니다<br/>또한 slider 부분을 따로 컴포넌트화 하여 재사용성을 높여보았습니다.<br/>
### <li>Detail</li>
### <li>Search</li>
![search](https://user-images.githubusercontent.com/96876293/158064441-0ba70e38-b073-497e-914a-0e2f3ae4e5a1.png)

<img src="https://user-images.githubusercontent.com/96876293/158064379-c04b3f70-9bc8-4f6f-a6eb-b60f9e301f82.png"  width="60%" height="60%"/><br/>
search 아이콘을 누를 시 state 변화를 주어서 search 창을 오픈할 수 있도록 구현을 해보았고<br/>검색창에 입력한 keyword 값을 쿼리 값으로 활용하여 관련 영화나 tv 쇼를 보여 줄 수 있도록 구현해 보았습니다 <br/> **useForm**훅을 활용하여 input 값을 전달 해 주었습니다.

## :file_folder: Directory
```bash
📦src
 ┣ 📂components
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜HomeHeader.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┣ 📜Similar.tsx
 ┃ ┣ 📜Sliders.tsx
 ┃ ┣ 📜TvDetail.tsx
 ┃ ┣ 📜TvSimilar.tsx
 ┃ ┗ 📜TvSliders.tsx
 ┣ 📂fonts
 ┃ ┗ 📜CookieRun Regular.ttf
 ┣ 📂Routes
 ┃ ┣ 📜DetailPage.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜LogInPage.tsx
 ┃ ┣ 📜Movie.tsx
 ┃ ┣ 📜NewLogInPage.tsx
 ┃ ┣ 📜Search.tsx
 ┃ ┣ 📜Tv.tsx
 ┃ ┗ 📜TvDetailPage.tsx
 ┣ 📜api.ts
 ┣ 📜App.tsx
 ┣ 📜fbase.js
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜Router.tsx
 ┣ 📜styled.d.ts
 ┣ 📜theme.ts
 ┗ 📜utils.ts
 

