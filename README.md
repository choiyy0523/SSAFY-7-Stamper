![20220916164021](https://user-images.githubusercontent.com/97646070/194148131-c477cea5-8f98-4bee-a53b-8608924fe918.png)

## :scroll: 목차

- [프로젝트 동기](#프로젝트-동기)
- [프로젝트 개요](#프로젝트-개요)
- [구현 기능](#구현-기능)
- [와이어 프레임](#와이어-프레임)
- [ERD](#ERD)
- [REST API](#REST-API)
- [Jira Epic](#Jira-Epic)
- [팀원 소개](#팀원-소개)
- [시연 시나리오](#시연-시나리오)
- [기술 스택](#기술-스택)
- [Build](#Build)
- [프로젝트 회고](#프로젝트-회고)

## 프로젝트 소개
### :one: 프로젝트 동기
  1. 여행을 단순히 사진 찍는 것 이외의 방식으로 기념하고 싶다.
  2. 늘어나는 여행 수요에 맞춰서 사용자들이 재밌게 이용할 수 있는 서비스가 필요하다.



### :two: 프로젝트 개요
1. 사용자는 AI 분석 사진 인증 방식이나 위치 기반 인증 방식을 통해 사진을 등록할 수 있다.
2. 서울 지역 안에 있는 랜드마크들을 등록할 수 있다.
3. 서울 지역 안에 있는 랜드마크들을 <strong>12가지의 테마별, 25개의 구별</strong>로 나누어 볼 수 있다.
4. **랜드마크들을 수집**하여 일정 조건을 충족하면 해당 업적의 보상이 제공된다.
5. 개별 랜드마크 페이지에서 댓글 작성을 할 수 있고, 다른 사용자들이 쓴 댓글을 확인할 수 있다.

### :three: 구현 기능

- 회원 관리
- 랜드마크 등록 인증
- 랜드마크 수집 상태 시각화

### :four: 와이어 프레임

>![img](../image/Stamper_Figma.jpg)
>![img](../image/Stamper_Figma2.jpg)
>https://www.figma.com/file/EjtOXFoLP0MPAYqCi1mlTT/A206-First-Draft?node-id=0%3A1

### :five: ERD

>![img](../image/Stamper_ERD.jpg)
>https://www.erdcloud.com/d/a7Ye2y8XRDfRJGB3K

### :six: REST API

>![img](../image/Stamper_RESTAPI.jpg)
>https://www.notion.so/a206/REST-API-1a3ff188ff374da79e22fec4c60c037b


### :seven: Jira Epic
>| 이름 			| 내용			|
>|----------------|------------------------|
>| 공통개발       | 기획서, 명세서, 요구사항 정리, 문서 작성             |
>| AI 모델개발    | CNN 모델 관련 기능 개발                            |
>| 데이터셋       | AI 학습 데이터셋 전처리                             |
>| FE, BE        | 백엔드, 프론트엔드 REQ&RES, DB스키마, 데이터 처리 등  |
>| CSS           | 와이어 프레임, 프로토타입, 화면 구성, 레이아웃 배치    |
>| 배포 및 CI/CD | 배포, action, jenkins, CI/CD 등                      |
>| 최종발표      | PPT 제작, 발표 연습, 시연 영상 찍기 등의 발표 준비     |
>| UCC           | UCC 스토리보드  제작, UCC 제작 회의 및 촬영           |


### :eight: 팀원 소개

> | 소개  | 이름   | 역할                            |
> | ----- | ------ | -------------------------------|
> | 🐻팀장 | 오현규 | 프로젝트 총괄, Frontend, UCC, 발표자 |
> | 🐨팀원 | 임재현 | Frontend, Figma, 디자인, 상태관리     |
> | 🐯팀원 | 최윤영 | Frontend, 디자인, 세부 기능 설계  |
> | 🐱팀원 | 이경준 | Backend, API, CRUD, DB, ERD   |
> | 🐰팀원 | 정찬희 | Backend, API, 서버, 배포          |
> | 👩팀원 | 홍인호 | Backend, API, AI 모델링, KaKao Map     |
  

## :nine: 시연 시나리오


>### I. 로그인 페이지

![로그인 페이지](https://user-images.githubusercontent.com/97646070/194447329-66b232c4-f4f2-4a53-a10f-a7aa62115222.gif)

>#### 	II. 회원가입

![회원가입](https://user-images.githubusercontent.com/97646070/194447408-a1a426b5-870b-417a-94db-b16f4fcfb0ad.gif)

>#### 	III. 로그인

![로그인](https://user-images.githubusercontent.com/97646070/194447363-9eeab214-2d33-48bf-b7ff-778ccb2b2a37.gif)

>#### 	IV. 구별 랜드마크 등록 및 업적 획득

![메인페이지 구별 랜드마크 등록](https://user-images.githubusercontent.com/97646070/194447385-e38014c9-476f-4e6a-b9ff-bdba94002c30.gif)

>####    V. 구별 랜드마크 등록 표시

![랜드마크 등록 표시](https://user-images.githubusercontent.com/97646070/194447344-9cf8a2ee-75b2-496c-b23b-42139d370395.gif)

>####    VI. 테마별 랜드마크 등록 및 업적 획득

![메인페이지 테마별 랜드마크 등록](https://user-images.githubusercontent.com/97646070/194447393-68ad6c3b-d6e0-4adc-8457-a9a69369e037.gif)

>####    VII. 마이페이지와 프로필 닉네임 수정

![마이페이지 프로필 수정](https://user-images.githubusercontent.com/97646070/194447371-60d1019a-8366-48c8-882f-9eab20f13726.gif)

>####    VIII. NavBar 기능 및 로그아웃

![메인페이지 NavBar 기능 및 로그아웃](https://user-images.githubusercontent.com/97646070/194447377-1ba71de4-92c2-4476-9bfc-26f18989fb3c.gif)

>####    IX. 이스터에그 (아리수나라)

![이스터에그](https://user-images.githubusercontent.com/97646070/194447404-655f49e1-b0f0-4e67-a3de-2b05a6a95606.gif)


### :ten: 기술 스택

>### ![기술스택](https://user-images.githubusercontent.com/97646070/194155652-ddad4bf5-f965-4e73-a721-34faf445fa81.png)

## :star: 협업툴

>- GitLab
>- Figma
>- Notion
>- Jira
>- Mattermost
>- Webex
>
>#### FrontEnd
>
>>| React  | Redux | @material-ui/core | @mui/material | axios  |
>>| :----: | :---: | :---------------: | :-----------: | :----: |
>>| 18.2.0 | 4.2.0 |      4.12.4       |    5.10.6     | 0.27.2 |
>>
>>| @teachablemachine/image | React-kakao-maps-sdk | chart.js | vite  | Visual Studio Code |
>>| :---------------------: | :------------------: | :------: | :---: | :----------------: |
>>|          0.8.5          |        1.1.4         |  3.9.1   | 3.1.0 |       1.71.2       |
>
>#### BackEnd (22.10.06 수정 필요)
>
>>|  Java  | SpringBoot | MySQL  |
>>| :----: | :--------: | :----: |
>>| Java 8 |   5.3.19   | 8.0.30 |
>>
>>| Ubuntu(EC2) |  Docker  | Jenkins |        IntelliJ IDEA        |
>>| :---------: | :------: | :-----: | :-------------------------: |
>>|   20.04.4   | 20.10.18 | 2.361.1 | 2022.2.2 (Ultimate Edition) |

## :star: Build

>- SpringBoot
>
>1. Dockerfile
>``` bash
>FROM openjdk:8\-jdk\-alpine
>ARG JAR\_FILE\=\*.jar
>COPY ${JAR\_FILE} app.jar
>ENTRYPOINT \["java","-jar","/app.jar"\]
>```
>
>- java 8 사용
>- 현 경로에서의 jar 파일을 파라미터로 하여 app.jar로 전달
>- java -jar app.jar 명령어를 수행하는 이미지 생성
>- docker build -t [컨테이너명] [Dockerfile 경로]
>
><br>
>
>2. 수동 Build
>``` bash
>mvn clean build
>```
><br>
>
>- React
>1. npm 설치
>
>``` bash
>npm i npm
>npm i -g @vue/cli-service
>npm i -g @vue/cli-plugin-babel
>npm i -g @vue/cli-plugin-eslint
>```
>
>2. React Build
>``` bash
>npm i --legacy-peer-deps
>````
>~~dependancy에 등록된 패키지 전부 설치~~
>
>``` bash
>npm run build
>```
>dist 폴더 생성
>
>3. React 실행
>
>```bash
>npm run dev
>```
><br>
>- MySQL
>
>1. 컨테이너 생성
>``` bash
>docker run --name [컨테이너명] -e MYSQL_ROOT_PASSWORD='[패스워드]' -d -p [외부포트]:[내부포트] [이미지명]
>````
>
>2. MySQL 접속
>``` bash
>docker exec -it [컨테이너명] bash
>mysql -u root -p
>```
><br>
><br>

## :star2: 프로젝트 회고

1. keep(만족한 것)
- 프로젝트 및 Git Commit 네이밍컨벤션 정의
- API 명세서를 정의한 것
- 프로젝트 진행의 흐름을 경험할 수 있었던 것
- 보완할 점/부족한 점을 알 수 있게된 것



2. problem(불편했던 것)
- 자신이 맡지 않은 포지션(Back/Front)에서 어떤 작업을 하고 있는지 이해와 소통이 부족했던 것
- 일정 관리가 원활하지 않아 제품의 완성도를 챙기지 못한 것



3. try(개선 방법)
- EC2뿐만 아니라 AWS 여러 자원, 특히 S3 사용하기
- Spring Security를 같이 사용하여 보안 설정하기
- Jenkins에서 Shell script와 pipeline을 이용하여 Build 구성하기
- 주 단위나 격주 단위로 프로젝트 현재 상황 브리핑 시간을 가지고 대처하기
- 각 기능을 구현하는 데 걸리는 시간을 최대한 보수적으로 계산하고 기획하여 최종 산출물 완성도 높이기
