<div align="center">

  # 원티드 백엔드 프리온보딩 7차 과제 - 카닥

  <img height="400" width="700" src="https://user-images.githubusercontent.com/59385491/139865333-05dabf0a-e283-4e51-94d9-8a42e6acbb7b.jpeg">


  <h2> 👨‍💻 원티드 프리온보딩 참가자 김성연의 개인 과제입니다. </h2>
</div>


<div align=center>


</div>

</br>
</br>
</br>

## 🎤 소개

이 레포지토리는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 7차 과제를 위해 만들어졌습니다. 

-   일정 : 2021년 11월 22일(월) 오후 6시 ~ 11월 29일(월) 오후 2시

<br>
<br>

## 📕 과제 내용

### [필수 포함 사항]

- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - 완료된 시스템이 배포된 서버의 주소
    - Swagger나 Postman을 통한 API 테스트할때 필요한 상세 방법
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</br>


### [개발 요구사항]

**✔️ API 목록**
- 유저 회원가입, 로그인 API
- 타이어 정보 저장 API
- 타이어 정보 조회 API


<details><summary>[고려 사항 및 상세설명]</summary>

 - **상세 내용은 저작권을 고려해 제외했습니다**


</div>
</details>
</br>
</br>

## 📕 모델링

</br>

![카닥ERD](https://user-images.githubusercontent.com/48472537/141442936-320c7f6b-199f-4baf-bae4-9447c28bbc52.png)

</br>
</br>

## 📕 작업 효율 개선 방안

- Node.js, express, Sequelize, sqlLite을 이용해 구현했습니다.
- 인증, 인가를 위해 JWT와 Authorization헤더를 활용했습니다.
- 코드 컨벤션, 커밋 컨벤션, Git Flow를 지켜가며 작업했습니다.
- Github Issue를 활용해서 이슈 관리를 진행했습니다.
- MVP패턴을 의식한 계층 분리를 통해 유지보수성 및 의존성을 개선했습니다.

</br>
</br>

## 💡 구현 기능

### [ 회원가입, 로그인 ]

- 인증방식은 JWT를 Authorization 헤더에 저장하는 방식으로 구현 하였습니다.

<br>

### [ 타이어 정보 저장 API ]

- 토큰을 통해 인가받은 유저만 사용할 수 있도록 하였습니다.
- front타이어와 rear타이어의 정보가 다를 상황을 대비하여 두가지 정보를 각각 DB에 저장하도록 했습니다.
- 해당 유저의 타이어 정보가 이미 있을 경우, 새로 받아온 정보로 업데이트 하도록 했습니다.

<br>


### [ 타이어 정보 조회 API ]

- 토큰을 통해 인가받은 유저만 사용할 수 있도록 하였습니다.
- 토큰의 유저 ID를 이용하여 해당 유저의 타이어 정보를 조회합니다.

<br>


### [ 카닥의 차량 정보 조회 API ]
- 타이어 정보를 얻기위한 카닥 API 요청 및 정보를 Parsing하는 부분은 /src/lib/cardocApi.js 모듈로 분리하였습니다.

<br>

### [ 계층분리 ]
- MVP 패턴을 적용하여 계층을 services(=Model), routes(=View, 혹은 View는 미존재), controllers(=Presenter)의 세 부분으로 나누었습니다.
- 에러 처리를 위해 /src/utils/errors 폴더 내에 커스텀 에러를 생성해서 관리했습니다.
- 프로젝트에 필요한 상수, 공통적으로 쓰이는 유틸리티 등을 모듈화 하여 재사용성을 높였습니다.
- 
<br>
<br>

## 🛠 실행 방법

- 레포지토리를 clone 받거나, 압축을 해제한 후 npm install을 통해 환경 셋팅을 진행합니다.
- npm start를 통해 서버를 구동합니다.
  - 단, pm2를 설치하지 않은 경우 npm run before를 통해 설치합니다.
  - npm run debug를 이용해 nodemon + 디버그모드로 실행할 수도 있습니다.
- src 폴더에 .env 파일을 설정해서, 환경변수를 설정합니다.
- [.env설정 노션 링크](https://wealthy-sea-b90.notion.site/7af5bc7a49914d86a59b3a5281b98462)
  - <details><summary><b>링크 접속불가 시 .env 파일 설정 방법</b></summary>

    ```
    RDS_DATABASE=(mysql사용 시) db 스키마명
    RDS_USERNAME=(mysql사용 시) db 유저명
    RDS_PASSWORD=(mysql사용 시) db 비밀번호
    RDS_HOSTNAME=(mysql사용 시) db 주소
    RDS_PORT=(mysql사용 시) db 포트
    PORT=서버의 포트
    JWT_SECERT="JWT 시크릿 키"
    JWT_ALGO=JWT에 사용할 알고리즘 ex."HS256"
    IS_SQLITE= SQLITE 사용유무(false는 mysql사용) ex.false
    SQLITE_PATH="(SQLITE사용 시) db파일 경로" ex."../database.db"
    ```


</details>


</br>
</br>


## 🗂 과제 확인 및 평가 API 명세서

- Postman을 활용하여 API 작동 테스트를 진행했습니다. 
- __배포된 서버 주소__ 및 자세한 API 명세는 아래에서 확인 가능합니다.
- [🗂 API Description Link](https://documenter.getpostman.com/view/18068137/UVC8C5cm)
- [![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/18068137/UVC8C5cm) 을 클릭하여 웹브라우저 혹은 Postman 클라이언트에 콜렉션이 로드되면
   1. Variables 탭에서 서버 Host와 Port를 지정합니다. (기본값이 지정되어 있습니다.
   2. Variables 탭에서 테스트하는 동안 사용할 userId와 password를 지정합니다. (기본값이 지정되어 있습니다.)
   3. 그후 우측 상단의 Run 버튼을 눌러 RUN ORDER 화면에 진입한 뒤 Run을 클릭하면, 이상적인 상황에서의 테스트가 진행됩니다.
   4. 좌측의 Workspace 화면의 Request들에는 여러 이상적이지 않은 상황에 대한 예시가 있습니다.</br>

        **유의사항**
        *일부 요청의 경우 JWT를 필요로합니다. JWT는 Test스크립트를 통해 로그인 과정에서 클라이언트가 스스로 관리하게끔 전달됩니다.
 
 
</br>
</br>


## 🛠 Dependencies

</br>

<div align=center>
<img src="https://user-images.githubusercontent.com/59385491/141483778-1fa0cdce-0cfd-4d67-8fba-434d8ee5e124.png" height=850>
</div>


</br>
</br>


## 🌲 File Tree

</br>


```

📦src
 ┣ 📂bin
 ┃ ┗ 📜www.js
 ┣ 📂configs
 ┃ ┣ 📜db.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜jwt.js
 ┣ 📂controllers
 ┃ ┣ 📜tireController.js
 ┃ ┗ 📜userController.js
 ┣ 📂globals
 ┃ ┣ 📜index.js
 ┃ ┣ 📜responseMessage.js
 ┃ ┣ 📜routes.js
 ┃ ┗ 📜statusCode.js
 ┣ 📂libs
 ┃ ┣ 📜cardocApi.js
 ┃ ┣ 📜encryption.js
 ┃ ┗ 📜jwt.js
 ┣ 📂middlewares
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜index.js
 ┃ ┣ 📜tire.js
 ┃ ┗ 📜user.js
 ┣ 📂routes
 ┃ ┣ 📜globalRouter.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜tireRouter.js
 ┃ ┣ 📜tokenRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜tireService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜commonError.js
 ┃ ┃ ┣ 📜errors.js
 ┃ ┃ ┣ 📜tokenError.js
 ┃ ┃ ┗ 📜userError.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜logger.js
 ┃ ┗ 📜resFormatter.js
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json

```
