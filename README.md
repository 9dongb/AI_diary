# 📓 AI 일기장: 인공지능 일기장 감정 분석 및 요약 서비스

### 📅 개발기간
- 2024.05.23 ~ 2024.06.13

### ⚙️ 기술스택
- **AI**: Pytorch, KoBert
- **Front-End**: HTML, CSS, JavaScript
- **Back-End**: Flask
- **Database**: AWS RDS
- **Server**: AWS EC2

### 👨‍💼 담당 작업(구동빈)
- 프로젝트 기획
- Flask 소스코드 작성 및 Web 연동
- KoBert 모델을 파인튜닝하여 텍스트 요약 구현

<details>
<summary>🌳 버전</summary>

- Python 3.9.18
- Flask 3.0.2
- torch==2.0.1
- transformers==4.32.1
- tokenizers==0.13.3
- lightning==2.0.8
</details>

<details>
<summary>👨‍💼 팀소개</summary>
  
- 👨‍💼구동빈
  - 기획, Web과 Flask 서버 연동, 일기 내용 생성요약 AI 구현
- 👨‍💼김현종
  - 감정 분류 AI 구현
- 👨‍💼박종관
  - 프론트엔드, Web, Flask 서버 연동 
</details>

## 1. 개요
- 사용자가 기록한 **하루의 일상**을 **AI**를 통해 분석하여 **내용을 요악**하고, **감정을 분석**하여 대표 감정을 부여, 주 단위로 요약된 감정 변화와 주요 내용을 제공
- 이를 통해 사용자는 자신의 **감정 상태**를 객관적으로 **이해**하고, 자기 성찰 및 정신 건강 관리 가능

## 2. 화면 구성
**■ 메인 페이지** &emsp; &emsp; &emsp; &emsp;  **■ 회원가입 페이지**  &emsp; &emsp;  **■ 로그인 페이지**

<img src="https://github.com/9dongb/AI_diary/assets/106071689/04e4b9d3-e239-4637-80b0-15669d5cea0b" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/9dongb/AI_diary/assets/106071689/cd46380d-b13a-478e-b437-422203cf9e71" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/9dongb/AI_diary/assets/106071689/6999c77c-c1cf-4bb5-897b-0c6833c10db3" width="21%" height="21%"/>

**■ 일기 작성 페이지**

<img src="https://github.com/user-attachments/assets/c4475823-e7bb-4a9f-b44c-d18cc644beb4" width="20%" height="20%"/>

- 일기 제목과 내용을 작성 가능
- 작성된 일기 내용을 **AI**를 통해 **요약**
- 작성된 일기 내용을 **AI**가 분석해 하루의 **대표 감정**을 부여

**■ 일기목록 페이지** (생성 요약문 제목, 대표 감정 표시)

<img src="https://github.com/9dongb/AI_diary/assets/106071689/538b57e5-9165-4175-b6bb-0b982b45595e" width="20%" height="20%"/>

- **AI**로 **요약**된 일기 내용을 제목으로 표시
- **AI**로 **분석한 감정**에 맞는 **이모지**를 하단에 표시

**■ 마이 페이지**  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; **■ 마이 페이지** - 감정 트렌드 그래프

<img src="https://github.com/9dongb/AI_diary/assets/106071689/f8c00b30-b52d-46d2-8ba1-fe29351ad596" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/9dongb/AI_diary/assets/106071689/b6f9b02e-dcd4-46e1-a3bf-d9339153ff03" width="20%" height="20%"/>



