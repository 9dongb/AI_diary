# 📓 AI 일기장: 인공지능 일기장 감정 분석 및 요약 서비스

### 📅 개발기간
- 2024.05.23 ~ 2024.06.13

### ⚙️ 기술스택
- **AI**: Pytorch, KoBert
- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: Flask
- **Database**: AWS RDS
- **Server**: AWS EC2

### 👨‍💼 담당 작업(구동빈)
- 프로젝트 기획
- **Flask** 소스코드 작성 및 Web 연동
- **KoBert**모델을 **파인튜닝**하여 **텍스트 요약** 구현

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
- 사용자가 기록한 **하루의 일상**을 **AI**를 통해 분석하여 **내용을 요악**하고, **감정을 분석**하여 대표 감정을 부여, 주, 월 단위로 요약된 감정 변화와 주요 내용을 제공합니다.
- 이를 통해 사용자는 자신의 **감정 상태**를 객관적으로 **이해**하고, 자기 성찰 및 정신 건강 관리가 가능합니다.

## 2. 화면 구성
**■ 메인 페이지**, **회원가입 페이지**, **로그인 페이지**

<img src="https://github.com/user-attachments/assets/02df7dd6-5475-4dab-92be-4e0c94f7da76" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/user-attachments/assets/18279db8-8628-4e56-bef2-819495f1e608" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/user-attachments/assets/26c080fd-22d3-4eb3-882a-d8104af3b469" width="20%" height="20%"/>

- 로그인에 성공하면 일기 작성 플로팅 버튼이 활성화되는 기능 구현
- 회원 가입 시 유효성 검사 후 데이터베이스에 정보를 등록하는 기능 구현
- 로그인 시 데이터베이스의 정보 조회 후 로그인 기능 구현

**■ 일기 작성 페이지**

<img src="https://github.com/user-attachments/assets/95dec9c9-8792-4d6a-83aa-937f9fee0633" width="20%" height="20%"/>

- 작성된 일기 내용을  **KoBert**를 파인튜닝한 **AI 모델**을 통해 **요약** 기능 구현
- 작성된 일기 내용을  **KoBert**를 파인튜닝한 **AI 모델**을 통해 분석해 하루의 **대표 감정**을 부여 가능 구현



**■ 일기목록 페이지** (생성 요약문 제목, 대표 감정 표시)

<img src="https://github.com/user-attachments/assets/5cab35dd-9395-4f3f-bd8e-2039f658ee1b" width="20%" height="20%"/>

- **KoBert**를 파인튜닝한 **AI 모델**로 **요약**된 일기 내용을 제목으로 표시 기능 구현
- **KoBert**를 파인튜닝한 **AI 모델**로 **분석한 감정**에 맞는 **이모지**를 하단에 표시 기능 구현

**■ 마이 페이지**

<img src="https://github.com/9dongb/AI_diary/assets/106071689/f8c00b30-b52d-46d2-8ba1-fe29351ad596" width="20%" height="20%"/>
&emsp;
<img src="https://github.com/user-attachments/assets/98a46071-ea68-4edb-b27c-ae2c077db9d7" width="20%" height="20%"/>

- 사용자가 가입 시 입력했던 정보 및 가입일 조회 기능 구현
- 한 달간 감정 변화 트렌드 분석 기능 구현


