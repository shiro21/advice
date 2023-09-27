# 개인 프로젝트 - Advice

## Intro
- Solo Project
- 프로젝트 기간 23일 ( 2022.10.25 ~ 2022.11.16 ) [ 프로젝트 만진 기간 약 15일 ]
- ID juhny******@gmail.com

## Tool
- Front-End : React ( JSX )
- Back-End : NodeJS ( Javascript ), Firebase, MongoDB, mongoose
- Google-Drive : 페이지 정리용

### Join ( 회원가입 )
- 아이디 ( 아이디 중복 검사 O )
- 비밀번호
- 이메일 ( 이메일 검사 X )
- 닉네임 ( 닉네임 중복 검사 X )

### Login
- 아이디 로그인

### Main
* Header
- 검색어 : 제목 검색
- 프로필 이동
- 알림 : 팔로우의 새로운 글이 올라왔을 떄, 내 글에 답변이 달렸을 때, 내 글에 새로운 댓글이 달렸을 때
- 메뉴 : 프로필 이동, 글쓰기 이동, 북마크 이동, 내 글 이동, 로그아웃

* Contents
- 태그 : 많이 사용한 태그 순위 5
- 텍스트 : 3가지 색을 5초마다 변경
- 조언 / 답변 리스트 변경
- 필터 : 닉네임 검색, 태그 검색
- 작품 : 최신순 정렬

### Profile
- 닉네임 변경

### Bookmark
- 내가 북마크한 작품 모음

### MyWrite
- 내가 작성한 작품들 모음
- 질문 / 답변 리스트 변경

### Enroll
- 질문 : 글쓰기로 들어오면 질문 / 작품에서 답변하기로 들어오면 답변
- 질문과 답변 ( 고정 )
- 제목
- 태그 ( 최대 5개, 중복불가 )
- 이미지 선택 ( 여러장 가능 )
- 내용 입력
- 등록
- Update 가능

### Article
- 제목
- 내용
- 프로필 ( 닉네임, 이메일, 팔로워 수, 북마크 )
- Article의 주인일 경우 : 수정 / 삭제
- Article의 방문자일 경우 : 팔로우 ( On / Off )
- 이미지 : 클릭시 확대 ( 좌우로 넘기기 )
- 댓글 ( 나의 댓글일 때 삭제가능 )
- 답변하기 ( 답변 Enroll 페이지 이동 )
- 답변받은 글 목록
- 답변받은 글 클릭 시 인라인으로 오픈

* 답변
- 태그
- 제목
- 내용
- 이미지 ( 좌우 스크롤 가능, prev, next로 좌우로 250px씩 밀기 가능 )
- 새로운 답변 클릭시 위치 이동

### Test2
- socket io로 아주 기본적인 채팅 가능 ( 이름과 내용을 입력 )


### 첫 React Project
* 리액트로 만들어본 첫 프로젝트 ( CSS를 생각하지 않고 만든 프로젝트 )
useState()와 useEffect()만 익히고 만든 프로젝트입니다.
